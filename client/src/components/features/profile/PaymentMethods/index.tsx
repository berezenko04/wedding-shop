import { useQuery } from "@tanstack/react-query";
import { Button, Stack } from "@mui/material";
import { useState } from "react";

// components
import PaymentMethod from "./Item";
import EmptyState from "../EmptyState";
import CustomModal from "@/components/ui/layout/CustomModal";
import ShippingAddressForm from "@/components/forms/profile/ShippingAddress";

// api
import ShippingService from "@/api/shipping/shipping.service";

// icons
import { Add } from "@mui/icons-material";

const PaymentMethods: React.FC = () => {
  const [isCreateModalOpened, setIsCreateModalOpened] = useState<boolean>(false);

  const { data: payment = [] } = useQuery({
    queryKey: ["shipping"],
    queryFn: ShippingService.getAll,
  });

  const handleClose = () => {
    setIsCreateModalOpened(false);
  };

  const handleOpen = () => {
    setIsCreateModalOpened(true);
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
          Add Shipping Address
        </Button>
      )}
      <CustomModal
        maxWidth={580}
        title="Add Shipping Address"
        open={isCreateModalOpened}
        onClose={handleClose}
      >
        <ShippingAddressForm mode="create" afterSubmit={handleClose} />
      </CustomModal>
    </Stack>
  );
};

export default PaymentMethods;
