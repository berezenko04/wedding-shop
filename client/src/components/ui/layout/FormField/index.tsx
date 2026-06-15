import { FormControl, FormLabel } from "@mui/material";

type Props = {
  label: string;
  labelFontSize?: number;
  children: React.ReactNode;
};

const FormField: React.FC<Props> = ({ label, labelFontSize, children }) => {
  return (
    <FormControl fullWidth sx={{ gap: 0.75 }}>
      <FormLabel sx={{ fontSize: labelFontSize || 14, fontWeight: 500 }}>{label}</FormLabel>
      {children}
    </FormControl>
  );
};

export default FormField;
