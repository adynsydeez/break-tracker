"use client";

import React, { useState } from "react";
import TimelineNode from "./TimelineNode";
import BreakNode from "./BreakNode";
import TimelineCol from "./TimelineCol";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { resolveObjectURL } from "buffer";

interface Break {
    id: number;
    startCol: number;
    CXRep: string;
    duration: number;
}

const Timeline = ({ breaks = [] }) => {
    // Default example break data if none provided
    const defaultBreaks: Break[] = [
        { id: 1, startCol: 5, CXRep: "AS", duration: 10 },
        { id: 2, startCol: 15, CXRep: "AS", duration: 30 },
        { id: 3, startCol: 16, CXRep: "AS", duration: 30 }, // Overlapping with break 2
        { id: 4, startCol: 17, CXRep: "AS", duration: 10 },
    ];

    const [breaksState, setBreaksState] = useState(
        breaks.length > 0 ? breaks : defaultBreaks
    );

    // Function to find all breaks that START at a given column
    const getBreaksStartingAtColumn = (colIndex: number): Break[] => {
        return breaksState.filter(
            (breakItem) => breakItem.startCol === colIndex
        );
    };

    // Function to check if a column is covered by any break (for stacking position)
    const getStackLevelForBreak = (
        breakItem: Break,
        colIndex: number
    ): number => {
        // Find all breaks that cover this column
        const coveringBreaks = breaksState.filter((b) => {
            const bEndCol = b.startCol + b.duration / 10 - 1;
            return colIndex >= b.startCol && colIndex <= bEndCol;
        });

        // Sort by their order in breaksState (first come, first served)
        // (breaksState is already in order of addition)
        // So, just use their index in breaksState
        return coveringBreaks.findIndex((b) => b.id === breakItem.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        // Extract break id and column index
        const breakId = parseInt(active.id.replace("break-", ""));
        const colIndex = parseInt(over.id.replace("col-", ""));

        setBreaksState((prev) =>
            prev.map((b) =>
                b.id === breakId ? { ...b, startCol: colIndex } : b
            )
        );
    };

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
        >
            <div className="w-full overflow-x-auto">
                <div className="relative inline-grid grid-cols-81 gap-1 whitespace-nowrap min-w-max">
                    {Array.from({ length: 81 }, (_, index) => {
                        const breaksStartingHere =
                            getBreaksStartingAtColumn(index);

                        return (
                            <TimelineCol index={index} key={index}>
                                {/* Break nodes that START at this column */}
                                {breaksStartingHere.map(
                                    (breakItem, breakIndex) => {
                                        const stackLevel =
                                            getStackLevelForBreak(
                                                breakItem,
                                                index
                                            );

                                        return (
                                            <div
                                                key={`break-${breakItem.id}`}
                                                className="absolute"
                                                style={{
                                                    top: `${
                                                        stackLevel * 105
                                                    }px`,
                                                    left: 0,
                                                    right: 0,
                                                }}
                                            >
                                                <BreakNode
                                                    id={breakItem.id}
                                                    CXRep={breakItem.CXRep}
                                                    duration={
                                                        breakItem.duration
                                                    }
                                                    isStart={true}
                                                    stackLevel={stackLevel}
                                                />
                                            </div>
                                        );
                                    }
                                )}
                            </TimelineCol>
                        );
                    })}
                </div>
            </div>
        </DndContext>
    );
};

export default Timeline;
