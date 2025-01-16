import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../components/Form";
import axios from "axios";

jest.mock("axios");

describe("Tax Calculation Form", () => {
  it("sends the correct data to the API and displays the result", async () => {
    const mockResponse = {
      data: {
        tax_brackets: [
          { max: 50197, min: 0, rate: 0.15 },
          { max: 100392, min: 50197, rate: 0.205 },
        ],
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/annual salary/i), {
      target: { value: "60000" },
    });
    fireEvent.change(screen.getByLabelText(/fiscal year/i), {
      target: { value: "2022" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/result/i)).toBeInTheDocument();
    });
  });
  it("does not call the API if inputs are invalid", async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/annual salary/i), {
      target: { value: "-10000" },
    });
    fireEvent.change(screen.getByLabelText(/fiscal year/i), {
      target: { value: "2027" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/please enter valid inputs/i),
    ).toBeInTheDocument();
  });
  it("shows loading state during API call", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: { tax_brackets: [{ min: 0, max: 50000, rate: 0.1 }] },
    });

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/annual salary/i), {
      target: { value: "40000" },
    });
    fireEvent.change(screen.getByLabelText(/fiscal year/i), {
      target: { value: "2022" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(screen.getByText(/calculating.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/result/i)).toBeInTheDocument();
    });
  });
});
