"use client";

import Table from "./components/table/Table";
import Section from "./components/Section";
import Timeline from "./components/timeline/Timeline";
import BreakRow from "./components/table/BreakRow";
import AddBreakRow from "./components/table/AddBreakRow";

import { useState, useEffect } from "react";

type Break = {
    id: number;
    initial: any;
    firstTen: any;
    thirty: any;
    secondTen: any;
};

export default function Home() {
    const [breaks, setBreaks] = useState<Break[]>([]);

    const refreshBreaks = () => {
        fetch("http://localhost:5000/api/breaks")
            .then((res) => res.json())
            .then((data) => setBreaks(data));
    };

    useEffect(() => {
        refreshBreaks();
    }, []);

    return (
        <div className="grid grid-flow-col grid-rows-2 gap-4 p-4 h-screen">
            <div className="row-span-2 col-span-5 ...">
                {/* Bottom section - Table View */}
                <Section title="Table View" size="half">
                    <Table>
                        {breaks.map((br) => (
                            <BreakRow
                                key={br.id}
                                id={br.id}
                                initial={br.initial}
                                firstTen={br.firstTen}
                                thirty={br.thirty}
                                secondTen={br.secondTen}
                                refreshBreaks={refreshBreaks}
                            />
                        ))}
                        <AddBreakRow refreshBreaks={refreshBreaks} />
                    </Table>
                </Section>
            </div>

            {/* Right column - takes 2/3 of width */}
            <div className="row-span-2 col-span-15 ...">
                <Section title="Timeline View" size="half">
                    <Timeline />
                </Section>
            </div>
        </div>
    );
}
