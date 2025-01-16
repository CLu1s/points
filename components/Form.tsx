"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BandResult, Inputs } from "@/types/FormTypes";
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
import Result from "@/components/Result";
import { calculateTax } from "@/lib/calculateTax";
import Spinner from "@/components/Spinner";

const ENDPOINT = "http://localhost:5001/tax-calculator/tax-year";

const Form = () => {
  const [result, setResult] = useState<BandResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalTax, setTotalTax] = useState<string>("");
  const [effectiveRate, setEffectiveRate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { salary, year } = data;

    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await axios.get(`${ENDPOINT}/${year}`);
      if (!response.data || response.status !== 200) {
        throw new Error("Invalid API response");
      }
      const { total, breakdown } = calculateTax(
        Number(salary),
        response.data.tax_brackets,
      );
      setTotalTax(formatMoney(total));
      setEffectiveRate(
        `${((Number(total) / Number(salary)) * 100).toFixed(2)}%`,
      );
      setResult(breakdown);
    } catch (error) {
      console.error(error);
      setError("Error calculating taxes, please try again later");
    } finally {
      setLoading(false);
    }
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
                Please enter a year after 2018
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
            {loading ? <Spinner /> : "Calculate"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {error && (
          <div className={"text-red-600 text-center w-full"}>{error}</div>
        )}
        {result && (
          <Result
            result={result}
            totalTax={totalTax}
            effectiveRate={effectiveRate}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default Form;
