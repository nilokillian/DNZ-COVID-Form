import {
  IAttachment,
  IVaccinationRecord,
} from "../store/reducers/vaccination/types";

export type VaccinationFormState = Omit<
  IVaccinationRecord,
  "id" | "attachments"
> & {
  id?: number;
  attachments: Omit<IAttachment, "id">[] & { id?: number }[];
};
