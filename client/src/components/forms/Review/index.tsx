import { Rating, Stack, TextField } from "@mui/material";

const ReviewForm: React.FC = () => {
  return (
    <Stack p={2} gap={2} sx={{ backgroundColor: "grey.50" }}>
      <Rating />
      <TextField
        multiline
        rows={3}
        variant="standard"
        placeholder="Enter your comment..."
        slotProps={{
          input: {
            disableUnderline: true,
          },
        }}
      />
    </Stack>
  );
};

export default ReviewForm;
