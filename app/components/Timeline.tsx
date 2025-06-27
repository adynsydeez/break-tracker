"use client";

import React from "react";
import TimelineNode from "./TimelineNode";
import BreakNode from "./BreakNode";
import { useDrag } from "react-dnd";

interface Break {
    id: number;
    startCol: number;
    duration: number;
}

interface TimelineProps {
    breaks?: Break[];
}

const Timeline = ({ breaks = [] }) => {
    // Default example break data if none provided
    const defaultBreaks: Break[] = [
        { id: 1, startCol: 5, duration: 10 },
        { id: 2, startCol: 15, duration: 30 },
        { id: 3, startCol: 16, duration: 30 }, // Overlapping with break 2
        { id: 4, startCol: 17, duration: 10 },
    ];

    const breaksToUse = breaks.length > 0 ? breaks : defaultBreaks;

    // Function to find all breaks that START at a given column
    const getBreaksStartingAtColumn = (colIndex: number): Break[] => {
        return breaksToUse.filter(
            (breakItem) => breakItem.startCol === colIndex
        );
    };

    // Function to check if a column is covered by any break (for stacking position)
    const getStackLevelForBreak = (
        breakItem: Break,
        colIndex: number
    ): number => {
        // Find all breaks that cover this column and started before or at the same time
        const coveringBreaks = breaksToUse.filter((otherBreak) => {
            const otherEndCol =
                otherBreak.startCol + otherBreak.duration / 10 - 1;
            return (
                colIndex >= otherBreak.startCol &&
                colIndex <= otherEndCol &&
                otherBreak.startCol <= breakItem.startCol &&
                otherBreak.id !== breakItem.id
            );
        });

        // Sort by start column to ensure consistent stacking
        coveringBreaks.sort((a, b) => a.startCol - b.startCol);

        // Find the position of this break in the stack
        const allBreaksAtStart = breaksToUse
            .filter((b) => {
                const bEndCol = b.startCol + b.duration / 10 - 1;
                return colIndex >= b.startCol && colIndex <= bEndCol;
            })
            .sort((a, b) => a.startCol - b.startCol);

        return allBreaksAtStart.findIndex((b) => b.id === breakItem.id);
    };

    const formatTime = (index: number): string => {
        const hour =
            Math.floor(index / 6) + 11 <= 12
                ? Math.floor(index / 6) + 11
                : Math.floor(index / 6) - 1;
        const minute =
            (index % 6) * 10 === 0 ? "00" : ((index % 6) * 10).toString();
        return `${hour}:${minute}`;
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="inline-grid grid-cols-81 gap-1 whitespace-nowrap min-w-max">
                {Array.from({ length: 81 }, (_, index) => {
                    const breaksStartingHere = getBreaksStartingAtColumn(index);

                    return (
                        <div
                            key={index}
                            className="relative bg-base-300 rounded-lg flex items-center justify-center w-10 h-[85vh]"
                            id={`${index}`}
                        >
                            {/* Time label */}
                            <span className="text-xs mt-[-80vh] -rotate-90 z-0">
                                {formatTime(index)}
                            </span>

                            {/* Break nodes that START at this column */}
                            {breaksStartingHere.map((breakItem) => {
                                const stackLevel = getStackLevelForBreak(
                                    breakItem,
                                    index
                                );

                                return (
                                    <div
                                        key={`break-${breakItem.id}`}
                                        className="absolute"
                                        style={{
                                            top: `${stackLevel * 105}px`,
                                            left: 0,
                                            right: 0,
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <BreakNode
                                            duration={breakItem.duration}
                                            isStart={true}
                                            stackLevel={stackLevel}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Timeline;
