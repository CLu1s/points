import { BandResult } from "@/types/FormTypes";

interface Props {
  result: BandResult[];
  totalTax: string | null;
  effectiveRate: string | null;
}

const Result = ({ result, totalTax, effectiveRate }: Props) => {
  return (
    <div className="mt-4 w-full  p-2 bg-gray-100 rounded">
      <div className={"m-auto max-w-sm "}>
        <h3 className="text-md font-semibold">Result:</h3>
        <div>Total Taxes Owed: {totalTax}</div>
        <br />
        <h3>Breakdown:</h3>
        <ul className={"flex flex-col gap-1.5"}>
          {result.map((band: BandResult, index: number) => (
            <li
              key={index}
              className={"grid grid-cols-[minmax(210px,_1fr)_24px_1fr] gap-2"}
            >
              <span>{band.band}</span>
              <span> → </span>
              <span>{band.tax}</span>
            </li>
          ))}
        </ul>
        <br />
        <div>Effective Tax Rate: {effectiveRate}</div>
      </div>
    </div>
  );
};

export default Result;
