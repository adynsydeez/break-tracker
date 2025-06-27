import React from "react";

interface BreakNodeProps {
    duration?: number;
    isStart?: boolean;
    stackLevel?: number;
}

const BreakNode = ({ duration = 10, isStart = false, stackLevel = 0 }) => {
    // Different colors for different stack levels to help distinguish overlapping breaks
    const colorVariants: string[] = [
        "bg-info border-info text-error-info",
        "bg-warning border-warning text-error-warning",
        "bg-error border-error text-error-error",
    ];

    const colorClass = colorVariants[stackLevel % colorVariants.length];

    // If this is the start of a break, render the full spanning node
    if (isStart) {
        return (
            <div
                className={`h-[100px] mt-[5vh] ${colorClass} border-2 rounded flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm text-xs font-medium`}
                draggable
                style={{
                    width: `calc(${duration / 10} * 2.5rem + ${
                        duration / 10 - 1
                    } * 0.25rem)`,
                    position: "absolute",
                    left: "2px",
                    zIndex: 10 + stackLevel,
                }}
            >
                <span className="text-wrap px-1">{duration}m Break</span>
            </div>
        );
    }

    // For continuation columns, return null since we're rendering one spanning element
    return null;
};

export default BreakNode;
