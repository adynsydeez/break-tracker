import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface TimelineColProps {
    index: number;
    children?: React.ReactNode;
}

const TimelineCol = ({ index, children }: TimelineColProps) => {
    const formatTime = (index: number): string => {
        const hour =
            Math.floor(index / 6) + 11 <= 12
                ? Math.floor(index / 6) + 11
                : Math.floor(index / 6) - 1;
        const minute =
            (index % 6) * 10 === 0 ? "00" : ((index % 6) * 10).toString();
        return `${hour}:${minute}`;
    };

    const { setNodeRef } = useDroppable({
        id: `col-${index}`,
    });

    return (
        <div
            key={index}
            className="relative bg-base-300 rounded-lg flex items-center justify-center w-10 h-[85vh]"
            id={`${index}`}
            ref={setNodeRef}
        >
            {/* Time label */}
            <span className="text-xs mt-[-80vh] -rotate-90 z-0">
                {formatTime(index)}
            </span>

            {children}
        </div>
    );
};

export default TimelineCol;
