"use client";

import Table from "./components/table/Table";
import Section from "./components/Section";
import Timeline from "./components/timeline/Timeline";
import BreakRow from "./components/table/BreakRow";
import AddBreakRow from "./components/table/AddBreakRow";

import { useState, useEffect } from "react";
import ErrorModal from "./components/ErrorModal";

type Break = {
    id: number;
    initial: any;
    firstTen: any;
    thirty: any;
    secondTen: any;
};

export default function Home() {
    const [breaks, setBreaks] = useState<Break[]>([]);
    const [showMissingFieldsError, setShowMissingFieldsError] = useState(false);
    const [showInvalidTimeError, setShowInvalidTimeError] = useState(false);

    const refreshBreaks = () => {
        fetch("http://localhost:5000/api/breaks")
            .then((res) => res.json())
            .then((data) => setBreaks(data));
    };

    const handleShowError = (error: string) => {
        if (error == "missingFields") setShowMissingFieldsError(true);
        else if (error == "invalidTime") setShowInvalidTimeError(true);
    };

    const handleHideError = () => {
        setShowMissingFieldsError(false);
        setShowInvalidTimeError(false);
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
                        {breaks.map((br: Break) => (
                            <BreakRow
                                key={br.id}
                                breakItem={br}
                                showMissingFieldsError={() =>
                                    handleShowError("missingFields")
                                }
                                showInvalidTimeError={() =>
                                    handleShowError("invalidTime")
                                }
                                refreshBreaks={refreshBreaks}
                            />
                        ))}
                        <AddBreakRow
                            refreshBreaks={refreshBreaks}
                            showMissingFieldsError={() =>
                                handleShowError("missingFields")
                            }
                            showInvalidTimeError={() =>
                                handleShowError("invalidTime")
                            }
                        />
                    </Table>
                </Section>
            </div>

            {/* Right column - takes 2/3 of width */}
            <div className="row-span-2 col-span-15 ...">
                <Section title="Timeline View" size="half">
                    <Timeline breaks={breaks} />
                </Section>
            </div>

            {showMissingFieldsError && (
                <ErrorModal
                    message="All fields are required."
                    onExit={handleHideError}
                />
            )}
            {showInvalidTimeError && (
                <ErrorModal
                    message="One or more times are outside the valid range."
                    onExit={handleHideError}
                />
            )}
        </div>
    );
}
