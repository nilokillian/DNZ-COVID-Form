import { ShotsOptionsEnum } from "../store/reducers/vaccination/types";

export interface IVaccinateStatusSelectionProps {
  id: string;
  label: string;
  value: ShotsOptionsEnum;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
}
