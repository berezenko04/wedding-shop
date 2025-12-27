import { useQuery } from "@tanstack/react-query";
import { Button, Stack } from "@mui/material";
import { useState } from "react";

// components
import PaymentMethod from "./Item";
import EmptyState from "../EmptyState";
import CustomModal from "@/components/ui/layout/CustomModal";
import PaymentMethodForm from "@/components/forms/profile/PaymentMethod";

// api
import PaymentService from "@/api/payment/payment.service";

// icons
import { Add } from "@mui/icons-material";

const PaymentMethods: React.FC = () => {
  const [isAddModalOpened, setIsAddModalOpened] = useState<boolean>(false);

  const { data: payment = [] } = useQuery({
    queryKey: ["payment"],
    queryFn: PaymentService.getAll,
  });

  const handleClose = () => {
    setIsAddModalOpened(false);
  };

  const handleOpen = () => {
    setIsAddModalOpened(true);
  };

  return (
    <Stack gap={2}>
      {payment.length > 0 ? (
        payment.map((address) => <PaymentMethod {...address} />)
      ) : (
        <EmptyState
          title="No payment method saved"
          description="Checkout faster by saving a payment method"
          buttonText="Add Payment"
          onClick={handleOpen}
        />
      )}
      {payment.length < 3 && payment.length > 0 && (
        <Button
          startIcon={<Add />}
          variant="outlined"
          color="grey"
          size="small"
          sx={{ width: "max-content" }}
          onClick={handleOpen}
        >
          Add Payment Method
        </Button>
      )}
      <CustomModal maxWidth={600} title="Add Payment Method" open={isAddModalOpened} onClose={handleClose}>
        <PaymentMethodForm mode="create" afterSubmit={handleClose} />
      </CustomModal>
    </Stack>
  );
};

export default PaymentMethods;
