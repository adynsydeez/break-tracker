import React from "react";

interface SectionProps {
    title: string;
    size: "full" | "half";
    children?: React.ReactNode;
}

const Section = ({ title, size, children }: SectionProps) => {
    let height;
    if (size === "half") height = "h-[47.2vh]";
    else if (size === "full") height = "h-[96vh]";

    return (
        <fieldset
            className={`min-w-[100%] fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ${height} max-${height}`}
        >
            <legend className="fieldset-legend">{title}</legend>
            {children}
        </fieldset>
    );
};

export default Section;
