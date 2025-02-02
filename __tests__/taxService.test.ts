import { fetchTaxBrackets } from "@/services/taxService";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchTaxBrackets", () => {
  it("fetches tax brackets successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { tax_brackets: [{ min: 0, max: 50000, rate: 0.1 }] },
    });

    const result = await fetchTaxBrackets("2022");
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "http://localhost:5001/tax-calculator/tax-year/2022",
    );
    expect(result).toEqual({
      tax_brackets: [{ min: 0, max: 50000, rate: 0.1 }],
    });
  });

  it("throws an error when the API fails", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));
    await expect(fetchTaxBrackets("2022")).rejects.toThrow("Network Error");
  });
});
