import { FormatMoney } from "format-money-js";

const formatMoney = (amount: number, decimals = 2): string => {
  const fm = new FormatMoney({
    decimals,
  });
  return fm.from(amount, {
    symbol: "$",
  }) as string;
};

export default formatMoney;
