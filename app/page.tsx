import Image from "next/image";
import Table from "./components/Table";
import Form from "./components/Form";
import FormInput from "./components/FormInput";
import Section from "./components/Section";
import Timeline from "./components/Timeline";

export default function Home() {
    return (
        <div className="grid grid-flow-col grid-rows-2 gap-4 p-4 h-screen">
            {/* Left column - takes 1/3 of width */}
            <div className="row-span-1 col-span-2...">
                {/* Top section - Register Break */}
                <Section title="Register Break" size="half">
                    <Form>
                        <FormInput
                            label="Initial"
                            type="text"
                            placeholder="ABC"
                        />
                        <FormInput label="First 10" type="time" />
                        <FormInput label="30" type="time" />
                        <FormInput label="Second 10" type="time" />
                        <button className="btn btn-primary mt-4">Submit</button>
                    </Form>
                </Section>
            </div>

            <div className="row-span-1 col-span-1 ...">
                {/* Bottom section - Table View */}
                <Section title="Table View" size="half">
                    <Table />
                </Section>
            </div>

            {/* Right column - takes 2/3 of width */}
            <div className="row-span-1 col-span-20 ...">
                <Section title="Timeline View" size="full">
                    <Timeline />
                </Section>
            </div>
        </div>
    );
}
