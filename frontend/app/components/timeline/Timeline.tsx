"use client";

import React, { useState, useEffect } from "react";
import TimelineNode from "./TimelineNode";
import BreakNode from "./BreakNode";
import TimelineCol from "./TimelineCol";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { resolveObjectURL } from "buffer";

type Break = {
    id: number;
    initial: any;
    firstTen: any;
    thirty: any;
    secondTen: any;
};

type BreakSingular = {
    initial: string;
    startTime: string;
    duration: number;
};

interface TimelineProps {
    breaks: Break[];
}

const Timeline = ({ breaks }: TimelineProps) => {
    const [breaksState, setBreaksState] = useState<Break[]>(breaks);

    useEffect(() => {
        setBreaksState(breaks);
    }, [breaks]);

    let breaksSingular: BreakSingular[] = [];
    breaksState.forEach((b) => {
        if (b.firstTen) {
            breaksSingular.push({
                initial: b.initial,
                startTime: b.firstTen,
                duration: 10,
            });
        }
        if (b.thirty) {
            breaksSingular.push({
                initial: b.initial,
                startTime: b.thirty,
                duration: 30,
            });
        }
        if (b.secondTen) {
            breaksSingular.push({
                initial: b.initial,
                startTime: b.secondTen,
                duration: 10,
            });
        }
    });

    function timeToMinutes(timeString: string) {
        const parts = timeString.split(":");
        let minutes = 0;

        const hrsToMins =
            parseInt(parts[0], 10) > 0
                ? (parseInt(parts[0], 10) - 11) * 60
                : 13 * 60;

        minutes = hrsToMins + parseInt(parts[1], 10);
        return minutes;
    }

    const timeToColIndex = (time: number) => Math.floor(time / 10);

    const getBreaksStartingAtColumn = (colIndex: number): BreakSingular[] => {
        const result = breaksSingular.filter((breakItem) => {
            return (
                timeToColIndex(timeToMinutes(breakItem.startTime)) === colIndex
            );
        });
        return result;
    };

    // Function to check if a column is covered by any break (for stacking position)
    const getStackLevelForBreak = (
        breakItem: BreakSingular,
        colIndex: number
    ): number => {
        const start = breakItem.startTime;
        const duration = breakItem.duration;
        const startCol = timeToColIndex(timeToMinutes(breakItem.startTime));
        const endCol = startCol + duration / 10 - 1;

        // Find all breaks that cover this column
        const coveringBreaks = breaksSingular.filter((b) => {
            const { startTime: bStart, duration: bDuration } = b;
            const bStartCol = timeToColIndex(timeToMinutes(bStart));
            const bEndCol = bStartCol + bDuration / 10 - 1;
            return colIndex >= bStartCol && colIndex <= bEndCol;
        });

        return coveringBreaks.findIndex(
            (b) =>
                b.initial + b.startTime ===
                breakItem.initial + breakItem.startTime
        );
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over) return;

        const breakId = parseInt(active.id.replace("break-", ""));
        const colIndex = parseInt(over.id.replace("col-", ""));
        const newStartTime = colIndex * 10;

        setBreaksState((prev) =>
            prev.map((b) => {
                if (b.id !== breakId) return b;
                // Update the correct time property
                if (b.firstTen) return { ...b, firstTen: String(newStartTime) };
                if (b.thirty) return { ...b, thirty: String(newStartTime) };
                if (b.secondTen)
                    return { ...b, secondTen: String(newStartTime) };
                return b;
            })
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
                                                key={`break-${
                                                    breakItem.initial +
                                                    breakItem.startTime
                                                }`}
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
                                                    id={
                                                        breakItem.initial +
                                                        breakItem.startTime
                                                    }
                                                    CXRep={breakItem.initial}
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
