import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

// components
import PrimaryMark from "@/components/features/profile/PrimaryMark";
import OutlinedBlock from "@/components/ui/layout/OutlinedBlock";

// api
import PaymentService from "@/api/payment/payment.service";

// types
import { BaseResponseData } from "@/types/base.types";
import { PaymentMethod } from "@/api/payment/payment.types";
import { PaymentMethods } from "@/types/enums.types";

// icons
import { DeleteOutline, EditOutlined } from "@mui/icons-material";

// data
import { paymentMethodsList } from "@/data/main";

const PaymentMethod: React.FC<PaymentMethod> = ({ id, method, email, last4, cardHolder, createdAt, primary }) => {
  const [isUpdateModalOpened, setIsUpdateModalOpened] = useState<boolean>(false);

  const imgUrl = paymentMethodsList.find((i) => i.value === method)?.images[0];
  const isCard = method === PaymentMethods.CARD;

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => PaymentService.delete(id),
    onSuccess: (result: BaseResponseData, id: string) => {
      toast.success(result.message);
      queryClient.setQueryData(["payment"], (old: PaymentMethod[] = []) => old.filter((s) => s.id !== id));
    },
  });

  const handleClose = () => {
    setIsUpdateModalOpened(false);
  };

  return (
    <OutlinedBlock>
      <Stack flexDirection="row" justifyContent="space-between" gap={4} alignItems="flex-start">
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={(theme) => ({
              border: `1px solid ${theme.palette.grey[100]}`,
              width: 60,
              height: 40,
              borderRadius: "6px",
            })}
          >
            <Box component="img" src={`/payment/${imgUrl}`} />
          </Stack>
          <Stack>
            <Typography variant="medium" fontSize={20} textTransform="uppercase">
              {isCard ? `${method} ****${last4}` : email}
            </Typography>
            <Typography>
              {isCard
                ? `Card Holder: ${cardHolder}`
                : `Connected on ${new Date(createdAt).toLocaleDateString("en-GB")}`}
            </Typography>
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center" gap={2}>
          {primary && <PrimaryMark />}
          <Stack flexDirection="row" alignItems="center" gap={0.5}>
            <IconButton onClick={() => setIsUpdateModalOpened(true)}>
              <EditOutlined />
            </IconButton>
            <IconButton color="error" onClick={() => deleteMutation.mutate(id)}>
              <DeleteOutline />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </OutlinedBlock>
  );
};

export default PaymentMethod;
