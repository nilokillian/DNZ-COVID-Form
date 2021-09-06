import axios from "axios";

export interface IVerificationCodeEmail {
  sendTo: string[];
  subject: string;
  emailBody: string;
}

export const sendVerificationCode = async (
  email: IVerificationCodeEmail
): Promise<void> => {
  const flowUrl =
    "https://prod-09.australiasoutheast.logic.azure.com:443/workflows/45c87ecec2374548ac816b9becb1913e/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DTmBlAzNr2K5U5Y57vlj_eRw0qTf5i7g2IR8d-SDjeM";
  const data = email;
  await axios.post(flowUrl, data);
};
