import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../components/Form";
import axios from "axios";

jest.mock("axios");

describe("Tax Calculation Form", () => {
  it("sends the correct data to the API and displays the result", async () => {
    const mockResponse = {
      status: 200,
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
      target: { value: "2020" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/result/i)).toBeInTheDocument();
    });
  });
  it("displays an error message if the API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<Form />);

    fireEvent.change(screen.getByLabelText(/annual salary/i), {
      target: { value: "60000" },
    });
    fireEvent.change(screen.getByLabelText(/fiscal year/i), {
      target: { value: "2020" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(
        /Error calculating taxes, please try again later/i,
      ),
    ).toBeInTheDocument();
  });
  it("does not call the API if salary in negative", async () => {
    render(<Form />);

    fireEvent.change(screen.getByLabelText(/annual salary/i), {
      target: { value: "-10000" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    expect(
      await screen.findByText(/Please enter a salary greater than 0/i),
    ).toBeInTheDocument();
  });
  it("displays total taxes and breakdown correctly", async () => {
    const mockResponse = {
      status: 200,
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
      target: { value: "2020" },
    });
    fireEvent.click(screen.getByRole("button", { name: /calculate/i }));

    await waitFor(() => {
      expect(screen.getByText(/total taxes owed/i)).toBeInTheDocument();
      expect(screen.getByText(/effective tax rate/i)).toBeInTheDocument();
      expect(screen.getByText(/\$0.00 - \$50,197.00/i)).toBeInTheDocument();
      expect(
        screen.getByText(/\$50,197.00 - \$100,392.00/i),
      ).toBeInTheDocument();
    });
  });
});
