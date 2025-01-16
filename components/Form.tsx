"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Inputs, TaxBracket } from "@/types/FormTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import formatMoney from "@/lib/formatMoney";

const ENDPOINT = "http://localhost:5001/tax-calculator/tax-year";

const Form = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
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
      const response = await axios.get(`${ENDPOINT}/${year}`);
      if (!response.data || !response.data.tax_brackets) {
        throw new Error("Invalid API response");
      }
      const { data } = response;
      const tax = calculateTax(Number(salary), data.tax_brackets);
      setResult(formatMoney(tax));
    } catch (error) {
      console.error(error);
      setResult("Error calculating taxes, please try again later");
    } finally {
      setLoading(false);
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
    return totalTax;
  };

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>Instructions:</CardTitle>
        <CardDescription>
          <ul className={"grid w-full max-w-xl items-center gap-1.5"}>
            <li>
              Provide Your Annual Income: Enter your total annual income before
              any deductions (e.g., gross salary, rental income, or any other
              sources).
            </li>
            <li>
              Provide the Fiscal Year: Provide the fiscal year for which you
              want to calculate your taxes. Ensure the year matches the income
              period you are declaring.
            </li>
          </ul>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={"flex flex-col gap-4"}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 m-auto">
            <Label htmlFor="salary">Annual Salary:</Label>
            <Input
              id={"salary"}
              type="number"
              {...register("salary", { required: true, min: 1 })}
            />
            {errors.salary && (
              <span className={"text-red-600"}>This field is required</span>
            )}
            {errors.salary?.type === "min" && (
              <span className={"text-red-600"}>
                Please enter a salary greater than 0
              </span>
            )}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 m-auto">
            <Label htmlFor="year">Fiscal Year:</Label>
            <Input
              id={"year"}
              type="number"
              {...register("year", { required: true, min: 2019, max: 2022 })}
            />
            {errors.year?.type === "required" && (
              <span className={"text-red-600"}>This field is required</span>
            )}
            {errors.year?.type === "min" && (
              <span className={"text-red-600"}>
                Please enter a year after 2019
              </span>
            )}
            {errors.year?.type === "max" && (
              <span className={"text-red-600"}>
                Please enter a year before 2023
              </span>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className={"w-full max-w-sm m-auto"}
          >
            {loading ? (
              <span className={"animate-spin"} data-testid="calculating">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-loader-circle"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              </span>
            ) : (
              "Calculate"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {result && (
          <div className="mt-4 w-full text-center p-2 bg-gray-100 rounded m-auto">
            Result: <strong>{result}</strong>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Form;
