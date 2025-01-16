"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Inputs, TaxBracket } from "@/types/FormTypes";

const ENDPOINT = "http://localhost:5001/tax-calculator/tax-year";

const Form = () => {
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { salary, year } = data;
    if (
      Number(salary) <= 0 ||
      !year ||
      Number(year) < 2020 ||
      Number(year) > 2022
    ) {
      setResult("Please enter valid inputs");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.get(`${ENDPOINT}/${year}`);
      const tax = calculateTax(Number(salary), data.tax_brackets);
      setResult(`$${tax}`);
    } catch (error) {
      console.error(error);
      setResult("Error calculating taxes");
    }
  };
  const calculateTax = (salary: number, brackets: TaxBracket[]) => {
    let totalTax = 0;
    brackets.forEach(({ min, max, rate }: TaxBracket) => {
      if (salary > min) {
        const taxableIncome = max ? Math.min(salary, max) - min : salary - min;
        totalTax += taxableIncome * rate;
      }
    });
    return totalTax.toFixed(2);
  };
  // TODO add use form hook
  // TODO add shadcn eleemnts
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Annual Salary:
        <input
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          required
        />
      </label>
      <label>
        Fiscal Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Calculating..." : "Calculate"}
      </button>
      {result && <div>Result: {result}</div>}
    </form>
  );
};

export default Form;
