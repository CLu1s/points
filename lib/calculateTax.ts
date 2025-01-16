import { BandResult, TaxBracket } from "@/types/FormTypes";
import formatMoney from "@/lib/formatMoney";

export const calculateTax = (salary: number, brackets: TaxBracket[]) => {
  let totalTax = 0;
  const breakdown: BandResult[] = [];

  brackets.forEach(({ min, max, rate }: TaxBracket) => {
    if (salary > min) {
      const taxableIncome = max ? Math.min(salary, max) - min : salary - min;
      const taxForBand = taxableIncome * rate;
      totalTax += taxForBand;
      breakdown.push({
        band: `${formatMoney(min)} - ${max ? `${formatMoney(max)}` : "above"}`,
        tax: `${formatMoney(taxForBand)}`,
        rate: rate,
      });
    }
  });

  return {
    total: totalTax,
    breakdown,
  };
};
