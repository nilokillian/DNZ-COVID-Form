export enum ShotsOptionsEnum {
  ZERO = "zero",
  ONE = "one",
  TWO = "two",
  BOOSTER = "booster",
  EXEMPTION = "exemption",
}

export interface IRadioButtonControlProps {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
}
