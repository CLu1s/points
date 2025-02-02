export type Inputs = {
  salary: number;
  year: string;
};

export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface BandResult {
  band: string;
  tax: string;
}
