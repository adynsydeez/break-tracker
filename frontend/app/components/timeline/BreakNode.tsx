import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface BreakNodeProps {
    id: string;
    CXRep: string;
    duration?: number;
    isStart?: boolean;
    stackLevel?: number;
}

const BreakNode = ({
    id,
    CXRep,
    duration = 10,
    isStart = false,
    stackLevel = 0,
}: BreakNodeProps) => {
    // Different colors for different stack levels to help distinguish overlapping breaks
    const colorVariants: string[] = [
        "bg-info border-info text-error-info",
        "bg-warning border-warning text-error-warning",
        "bg-error border-error text-error-error",
    ];

    const colorClass = colorVariants[stackLevel % colorVariants.length];

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `break-${id}`
    });
    const style = {
        transform: CSS.Translate.toString(transform),
        width: `calc(${duration / 10} * 2.5rem + ${
            duration / 10 - 1
        } * 0.25rem)`,
        position: "absolute" as const,
        left: "2px",
        zIndex: 1000,
    };

    // For continuation columns, return null since we're rendering one spanning element
    if (!isStart) return null;

    // If this is the start of a break, render the full spanning node
    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div
                className={`h-[100px] mt-[5vh] ${colorClass} border-2 rounded flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm text-xs font-medium`}
            >
                <span className="text-wrap px-1">{`${CXRep} - ${duration}`}</span>
            </div>
        </button>
    );
};

export default BreakNode;
