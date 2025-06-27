import Image from "next/image";
import Table from "./components/Table";
import Form from "./components/Form";
import FormInput from "./components/FormInput";
import Section from "./components/Section";
import Timeline from "./components/Timeline";

export default function Home() {
    return (
        <div className="grid grid-flow-col grid-rows-2 gap-4 p-4 h-screen">
            <div className="row-span-2 col-span-5 ...">
                {/* Bottom section - Table View */}
                <Section title="Table View" size="half">
                    <Table />
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
