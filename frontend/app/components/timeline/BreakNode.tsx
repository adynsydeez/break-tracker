import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { randomInt } from "crypto";

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
    const colourVariants: string[] = [
        "bg-info border-info text-error-info",
        "bg-warning border-warning text-error-warning",
        "bg-error border-error text-error-error",
        "bg-success border-success text-error-success",
        "bg-secondary border-secondary text-error-secondary",
    ];

    const idNum: number = parseInt(id.split("-")[1]);
    const colourClass = colourVariants[(idNum - 1) % colourVariants.length];

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
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

    if (!isStart) return null;

    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div
                className={`h-[100px] mt-[5vh] ${colourClass} border-2 rounded flex items-center justify-center hover:opacity-80 transition-opacity shadow-sm text-xs font-medium`}
            >
                <span className="text-wrap px-1">{`${CXRep} - ${duration}`}</span>
            </div>
        </button>
    );
};

export default BreakNode;
