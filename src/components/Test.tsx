import { useState } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  FloatingFocusManager,
  useInteractions,
} from "@floating-ui/react";

export default function FloatingPopover() {
  const [open, setOpen] = useState(false);

  // Setup floating-ui with positioning middlewares
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset(6), // add spacing between button and popover
      flip(),    // flip to opposite side if not enough space
      shift(),   // shift into view if clipped
    ],
    placement: "bottom-start", // where it should appear by default
  });

  // Handle interactions (click to open/close, dismiss on outside click, etc.)
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <div className="p-10">
      {/* Trigger Button */}
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className="px-3 py-2 bg-blue-600 text-white rounded"
      >
        Pick Year
      </button>

      {/* Floating Popover */}
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="p-4 bg-white border shadow-lg rounded w-40 z-50"
          >
            <ul className="space-y-1">
              <li className="cursor-pointer hover:bg-gray-100 px-2 py-1">2025</li>
              <li className="cursor-pointer hover:bg-gray-100 px-2 py-1">2024</li>
              <li className="cursor-pointer hover:bg-gray-100 px-2 py-1">2023</li>
            </ul>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}
