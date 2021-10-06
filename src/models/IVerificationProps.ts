export interface IVerificationProps {
  inputValue: string;
  onChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
}
