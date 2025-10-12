import formatToTitleCase from "./formatToTitleCase";
import { toastWarning } from "./toastWarning";

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number; // 👈 for numeric min
  max?: number; // 👈 for numeric max
  pattern?: RegExp;
  type?: "money" | "number"; // 👈 now supports number & money
  custom?: (value: any) => string | null; // return error message or null
};

export type ValidationSchema = Record<string, ValidationRule>;

export interface ValidationResult {
  validatedData: Record<string, any>;
  isValid: boolean;
}

/**
 * 🧼 Sanitize + Validate input data based on schema.
 * Returns sanitized data, errors, and isValid flag.
 */
export default function validateAndSanitize(
  data: Record<string, any>,
  schema: ValidationSchema
): ValidationResult {
  const errors: Record<string, string | null> = {};
  const validatedData: Record<string, any> = {};

  for (const key in data) {
    let value = data[key];

    // Basic sanitation
    if (typeof value === "string") {
      value = value.trim().replace(/\s+/g, " "); // collapse spaces
      value = value.replace(/[<>]/g, ""); // prevent HTML injection
    }

    const rules = schema[key];
    if (!rules) {
      validatedData[key] = value;
      continue;
    }

    // --- Required check ---
    if (rules.required && (value === "" || value === null || value === undefined)) {
      errors[key] = `${formatToTitleCase(key)} field is required.`;
      continue;
    }

    // --- Money type ---
    if (rules.type === "money") {
      const numValue = parseFloat(String(value).replace(/[₱,]/g, "")); // handle ₱ or commas
      if (isNaN(numValue)) {
        errors[key] = `${formatToTitleCase(key)} is invalid amount.`;
        continue;
      }
      if (numValue <= 0) {
        errors[key] = `${formatToTitleCase(key)} must be greater than zero.`;
        continue;
      }

      validatedData[key] = Math.round(numValue * 100); // PHP → cents
      errors[key] = null;
      continue;
    }

    // --- Number type ---
    if (rules.type === "number") {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors[key] = `${formatToTitleCase(key)} is invalid number.`;
        continue;
      }

      if (rules.min !== undefined && numValue < rules.min) {
        errors[key] = `${formatToTitleCase(key)} must be at least ${rules.min}.`;
        continue;
      }

      if (rules.max !== undefined && numValue > rules.max) {
        errors[key] = `${formatToTitleCase(key)} must not exceed ${rules.max}.`;
        continue;
      }

      validatedData[key] = numValue;
      errors[key] = null;
      continue;
    }

    // --- String validation ---
    if (rules.minLength && typeof value === "string" && value.length < rules.minLength) {
      errors[key] = `Must be at least ${rules.minLength} characters.`;
      continue;
    }

    if (rules.maxLength && typeof value === "string" && value.length > rules.maxLength) {
      errors[key] = `Must not exceed ${rules.maxLength} characters.`;
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors[key] = "Invalid format.";
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

  const errorsArr = Object.values(errors)
  const isValid = errorsArr.every((err) => err === null);
    
  if (!isValid) {
      errorsArr.forEach(err => {
          err && toastWarning(err);
      });
  }

  return { validatedData, isValid };
}
