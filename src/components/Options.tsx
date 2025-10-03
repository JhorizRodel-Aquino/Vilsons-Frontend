import { type ReactNode,type ReactElement, cloneElement, isValidElement, Children } from "react";
import { useState } from "react";
import { useFloating, offset, flip, shift, useClick, useDismiss, useRole, FloatingFocusManager, useInteractions } from "@floating-ui/react";
import Icon from "./Icon";


type OptionsProps = {
  children?: ReactNode;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function Options({ children, className, onEdit, onDelete }: OptionsProps) {
  const [open, setOpen] = useState(false);

  // Setup floating-ui with positioning middlewares
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 6, crossAxis: 8 }), // add spacing between button and popover; mainAxis = vertical, crossAxis = horizontal
      flip(),    // flip to opposite side if not enough space
      shift(),   // shift into view if clipped
    ],
    placement: "bottom-start", // where it should appear by default
  });

  // Handle interactions (click to open/close, dismiss on outside click, etc.)
  const click = useClick(context);
  const dismiss = useDismiss(context, { ancestorScroll: true });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const styledChildren = Children.map(children, _ => {
    const styledChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const element = child as ReactElement<{ className?: string }>;
      return cloneElement(element, {
        className: `${element.props.className ?? ""} flex gap-1 items-center w-full whitespace-normal break-words text-start`,
      });
    }
    return child;
  });

  return <>{styledChildren}</>;
  });

 return (
    <div className={className}>
      {/* Trigger Button */}
      <button ref={refs.setReference} {...getReferenceProps()}>
        <Icon name="options" />
      </button>

      {/* Floating Popover */}
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="bg-white p-3 min-w-[160px] max-w-[200px] border-all z-30 rounded-[10px] text-darker"
          >
            <ul className="space-y-1">
              {onEdit && (
                <li className="hover:bg-gray px-2 py-1 rounded" onClick={() => setOpen(false)}>
                  <button
                    onClick={onEdit}
                    className="flex gap-1 items-center w-full whitespace-normal break-words text-start"
                  >
                    <Icon name="edit" size={20} />Edit
                  </button>
                </li>
              )}
              {onDelete && (
                <li className="hover:bg-gray px-2 py-1 rounded" onClick={() => setOpen(false)}>
                  <button
                    onClick={onDelete}
                    className="flex gap-1 items-center w-full whitespace-normal break-words text-start"
                  >
                    <Icon name="delete" size={20} /> Delete
                  </button>
                </li>
              )}

              {/* Custom Children */}
              {styledChildren && <li className="hover:bg-gray px-2 py-1 rounded" onClick={() => setOpen(false)}>{styledChildren}</li>}
            </ul>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}