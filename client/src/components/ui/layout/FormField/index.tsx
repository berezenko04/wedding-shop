import { FormControl, FormLabel } from "@mui/material";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  return (
    <FormControl fullWidth sx={{ gap: 0.75 }}>
      <FormLabel sx={{ fontSize: 14, fontWeight: 500 }}>{label}</FormLabel>
      {children}
    </FormControl>
  );
};

export default FormField;
