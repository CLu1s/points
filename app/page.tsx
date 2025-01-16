import Image from "next/image";
import Form from "@/components/Form";
import { Calculator, Github } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className={"flex gap-4"}>
          <h1 className={"text-7xl font-semibold text-center m-auto"}>
            Tax Calculator
          </h1>
          <div className={"flex flex-col justify-center m-auto"}>
            <Calculator height={150} width={150} />
          </div>
        </div>
        <Form />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.canada.ca/en/financial-consumer-agency/services/financial-toolkit/taxes/taxes-2/5.html"
          target="_blank"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://investinganswers.com/dictionary/m/marginal-tax-rate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/CLu1s/points"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github height={16} width={16} />
          Go to repo →
        </a>
      </footer>
    </div>
  );
}
