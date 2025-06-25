import React from "react";

const Timeline = () => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="inline-grid grid-cols-81 gap-1 whitespace-nowrap min-w-max">
                {Array.from({ length: 81 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-base-300 rounded-lg flex items-center justify-center w-20 h-[85vh]"
                    >
                        <span className="text-xs mt-[-90vh]">
                            {`${
                                Math.floor(index / 6) + 11 <= 12
                                    ? Math.floor(index / 6) + 11
                                    : Math.floor(index / 6) - 1
                            }:${
                                (index % 6) * 10 == 0 ? `00` : (index % 6) * 10
                            }`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
