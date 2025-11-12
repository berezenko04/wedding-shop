import { useQuery } from "@tanstack/react-query";
import { Stack } from "@mui/material";

// components
import Address from "./Item";
import EmptyState from "../EmptyState";

// api
import ShippingService from "@/api/shipping/shipping.service";

const Addresses: React.FC = () => {
  const { data: addresses = [] } = useQuery({
    queryKey: ["shipping"],
    queryFn: ShippingService.getAll,
  });

  return (
    <Stack gap={2}>
      {addresses.length > 0 ? (
        addresses.map((address) => <Address {...address} />)
      ) : (
        <EmptyState
          title="No shipping address saved"
          description="Checkout faster by saving a shipping address"
          buttonText="Add Shipping Address"
          onClick={() => {}}
        />
      )}
    </Stack>
  );
};

export default Addresses;
