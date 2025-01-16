import { calculateTax } from "@/lib/calculateTax";

describe("calculateTax", () => {
  it("calculates taxes correctly for a single tax band", () => {
    const brackets = [{ min: 0, max: 50000, rate: 0.1 }];
    const result = calculateTax(30000, brackets);
    expect(result.total).toBe(3000.0);
    expect(result.breakdown).toEqual([
      { band: "$0.00 - $50,000.00", tax: "$3,000.00" },
    ]);
  });

  it("calculates taxes correctly across multiple tax bands", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
    ];
    const result = calculateTax(75000, brackets);
    expect(result.total).toBe(10000.0);
    expect(result.breakdown).toEqual([
      { band: "$0.00 - $50,000.00", tax: "$5,000.00" },
      { band: "$50,000.00 - $100,000.00", tax: "$5,000.00" },
    ]);
  });

  it("handles salaries exceeding the highest tax band", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
      { min: 100000, rate: 0.3 },
    ];
    const result = calculateTax(150000, brackets);
    expect(result.total).toBe(30000.0);
    expect(result.breakdown).toEqual([
      { band: "$0.00 - $50,000.00", tax: "$5,000.00" },
      { band: "$50,000.00 - $100,000.00", tax: "$10,000.00" },
      { band: "$100,000.00 - above", tax: "$15,000.00" },
    ]);
  });

  it("returns zero tax for a salary of zero", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
    ];
    const result = calculateTax(0, brackets);
    expect(result.total).toBe(0.0);
    expect(result.breakdown).toEqual([]);
  });

  it("handles edge case where salary is exactly at a band limit", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, max: 100000, rate: 0.2 },
    ];
    const result = calculateTax(50000, brackets);
    expect(result.total).toBe(5000.0);
    expect(result.breakdown).toEqual([
      { band: "$0.00 - $50,000.00", tax: "$5,000.00" },
    ]);
  });

  it("handles a tax structure with no upper limit on the last band", () => {
    const brackets = [
      { min: 0, max: 50000, rate: 0.1 },
      { min: 50000, rate: 0.2 },
    ];
    const result = calculateTax(120000, brackets);
    expect(result.total).toBe(19000.0);
    expect(result.breakdown).toEqual([
      { band: "$0.00 - $50,000.00", tax: "$5,000.00" },
      { band: "$50,000.00 - above", tax: "$14,000.00" },
    ]);
  });
});
