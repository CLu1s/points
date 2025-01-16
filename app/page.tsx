import Form from "@/components/ui/Form";
import { Calculator } from "lucide-react";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className={"flex flex-col-reverse lg:flex-row gap-4"}>
          <h1 className={"text-7xl font-semibold text-center m-auto"}>
            Tax Calculator
          </h1>
          <div className={"flex flex-col justify-center m-auto"}>
            <Calculator className={"h-28 w-28"} />
          </div>
        </div>
        <Form />
      </main>
      <Footer />
    </div>
  );
}
