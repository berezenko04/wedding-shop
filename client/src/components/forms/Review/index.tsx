import { Button, Rating, Stack, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// api
import ReviewsService from "@/api/reviews/reviews.service";

// mapping
import { numberToRating } from "@/data/mapping";

type ReviewFormProps = {
  productId: string;
};

type ReviewFormFields = {
  rating: number;
  comment: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<ReviewFormFields>({
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const rating = watch("rating");
  const comment = watch("comment");

  const isDisabled = isSubmitting || rating === null || comment.trim().length < 4;

  const onSubmit = async ({ comment, rating }: ReviewFormFields) => {
    await ReviewsService.createReview({
      productId,
      comment,
      rating: numberToRating[rating as keyof typeof numberToRating],
    });
    reset();
  };

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      p={2}
      gap={2}
      sx={{ backgroundColor: "grey.50" }}
    >
      <Controller
        name="rating"
        control={control}
        render={({ field }) => <Rating value={field.value} onChange={(_, value) => field.onChange(value)} />}
      />

      <Controller
        name="comment"
        control={control}
        rules={{
          required: "Please enter your comment",
          maxLength: { value: 300, message: "Too long (max 300 chars)" },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            multiline
            minRows={1}
            maxRows={3}
            variant="standard"
            placeholder="Enter your comment..."
            slotProps={{
              input: { disableUnderline: true },
            }}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Button
        color="primary"
        variant="contained"
        size="small"
        type="submit"
        disabled={isDisabled}
        sx={{ alignSelf: "flex-end" }}
      >
        Send
      </Button>
    </Stack>
  );
};

export default ReviewForm;
