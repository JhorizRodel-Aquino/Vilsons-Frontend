import formatToTitleCase from "./formatToTitleCase";
import { toastWarning } from "./toastWarning";

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  type?: "money" | "number" | "ratio";
  custom?: (value: any) => string | null;
  children?: ValidationSchema;
  label?: string; // 👈 optional friendly label for toasts
};

export type ValidationSchema = Record<string, ValidationRule>;

export interface ValidationResult {
  validatedData: Record<string, any>;
  isValid: boolean;
}

/**
 * 🧼 Sanitize + Validate input data (supports nested arrays + label names)
 */
export default function validateAndSanitize(
  data: Record<string, any>,
  schema: ValidationSchema
): ValidationResult {
  const errors: Record<string, string | null> = {};
  const validatedData: Record<string, any> = {};

  for (const key in data) {
    let value = data[key];
    const rules = schema[key];
    const label = rules?.label || formatToTitleCase(key);

    // Sanitize strings
    if (typeof value === "string") {
      value = value.trim().replace(/\s+/g, " ").replace(/[<>]/g, "");
    }

    if (!rules) {
      validatedData[key] = value;
      continue;
    }

    // --- Required check ---
    if (rules.required && (value === "" || value === null || value === undefined)) {
      errors[key] = `${label} is required.`;
      continue;
    }

    // --- Array Only / No Nested children ---
    if (Array.isArray(value)) {
      // ✅ New: Check minLength for arrays
      if (rules.minLength !== undefined && value.length < rules.minLength) {
        errors[key] = `There must be at least ${rules.minLength} ${label}`;
        continue;
      }
    }

    // --- Array / Nested children support ---
    if (Array.isArray(value) && rules.children) {
      const validatedArray: any[] = [];
      let hasArrayError = false;
      let arrayErrorMessages: string[] = [];

      for (const [index, item] of value.entries()) {
        const { validatedData: childData, isValid } = validateAndSanitize(item, rules.children);

        if (!isValid) {
          hasArrayError = true;
          arrayErrorMessages.push(`${label} #${index + 1} has invalid data.`);
          // Optionally: push null or the original item to maintain array structure
          validatedArray.push(null); // or item to preserve structure
        } else {
          validatedArray.push(childData);
        }
      }

      validatedData[key] = validatedArray;

      // Only set to null if NO errors were found in the entire array
      if (hasArrayError) {
        // Use the first error message, or join all if you want to show multiple
        errors[key] = arrayErrorMessages[0];
      } else {
        errors[key] = null;
      }
      continue;
    }

    // --- Money type ---
    if (rules.type === "money") {
      const numValue = parseFloat(String(value).replace(/[₱,]/g, ""));
      if (!rules.required && (value === "" || value === null || value === undefined)) continue;
      if (isNaN(numValue)) {
        errors[key] = `${label} is an invalid amount.`;
        continue;
      }

      // ✅ Default min = 0 if not specified
      const minValue = rules.min ?? 0;
      const maxValue = rules.max;

      if (numValue <= minValue) {
        errors[key] = `${label} must be greater than ${minValue}.`;
        continue;
      }

      if (maxValue !== undefined && numValue > maxValue) {
        errors[key] = `${label} must not exceed ${maxValue}.`;
        continue;
      }

      validatedData[key] = Math.round(numValue * 100);
      errors[key] = null;
      continue;
    }

    // --- Number type ---
    if (rules.type === "number") {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[key] = `${label} must be a valid number.`;
        continue;
      }

      // ✅ Default min = 0 if not specified
      const minValue = rules.min ?? 0;
      const maxValue = rules.max;

      if (numValue < minValue) {
        errors[key] = `${label} must be at least ${minValue}.`;
        continue;
      }

      if (maxValue !== undefined && numValue > maxValue) {
        errors[key] = `${label} must not exceed ${maxValue}.`;
        continue;
      }

      validatedData[key] = numValue;
      errors[key] = null;
      continue;
    }

    // --- Ratio type ---
    if (rules.type === "ratio") {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[key] = `${label} must be a valid number.`;
        continue;
      }

      // ✅ Default min = 0 if not specified
      const minValue = rules.min ?? 0;
      const maxValue = rules.max;

      if (numValue < minValue) {
        errors[key] = `${label} must be at least ${minValue}.`;
        continue;
      }

      if (maxValue !== undefined && numValue > maxValue) {
        errors[key] = `${label} must not exceed ${maxValue}.`;
        continue;
      }

      validatedData[key] = Math.round(numValue / 100);
      errors[key] = null;
      continue;
    }

    // --- String validation ---
    if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
      errors[key] = `${label} must be at least ${rules.minLength} characters.`;
      continue;
    }

    if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
      errors[key] = `${label} must not exceed ${rules.maxLength} characters.`;
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[key] = `${label} has an invalid format.`;
      continue;
    }

    // --- Custom validation ---
    if (rules.custom) {
      const customError = rules.custom(value);
      if (customError) {
        errors[key] = customError;
        continue;
      }
    }

    validatedData[key] = value;
    errors[key] = null;
  }

  const errorsArr = Object.values(errors);
  console.log("error", errors)
  const isValid = errorsArr.every((err) => err === null);

  if (!isValid) {
    errorsArr.forEach((err) => {
      if (err) toastWarning(err);
    });
  }

  return { validatedData, isValid };
}
