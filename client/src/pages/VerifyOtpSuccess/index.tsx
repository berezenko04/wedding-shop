import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

// components
import AuthFormLayout from "@/components/forms/auth/FormLayout";

const VerifyOtpSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resetToken = location.state?.resetToken;

  useEffect(() => {
    if (!resetToken) {
      navigate("/login");
    }
  }, [resetToken, navigate]);

  return (
    <AuthFormLayout
      title="Email verified"
      description="Your verification code has been confirmed. You can now reset your password."
    >
      <Button
        onClick={() => navigate(`/reset-password?resetToken=${resetToken}`)}
        color="primary"
        variant="contained"
        size="small"
      >
        Continue
      </Button>
    </AuthFormLayout>
  );
};

export default VerifyOtpSuccess;
