import { Button, Rating, Stack, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// api
import ReviewsService from '@/api/reviews/reviews.service';

// mapping
import { numberToRating } from '@/data/mapping';

type ReviewFormProps = {
  productId: string;
};

type ReviewFormFields = {
  rating: number | null;
  comment: string;
};

const ReviewForm: React.FC<ReviewFormProps> = ({ productId }) => {
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm<ReviewFormFields>({
    defaultValues: {
      rating: null,
      comment: '',
    },
  });

  const rating = watch('rating');
  const comment = watch('comment');

  const isDisabled = isSubmitting || rating === null || comment.trim().length < 4;

  const onSubmit = async ({ comment, rating }: ReviewFormFields) => {
    try {
      await ReviewsService.createReview({
        productId,
        comment,
        rating: numberToRating[rating as keyof typeof numberToRating],
      });
      queryClient.invalidateQueries({ queryKey: ['productRating', productId] });
      queryClient.invalidateQueries({ queryKey: ['productReviews', productId] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    } catch {
      toast.error('Failed to create review. Please try again.');
    } finally {
      reset();
    }
  };

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      p={2}
      gap={2}
      sx={{ backgroundColor: 'grey.50' }}
    >
      <Controller
        name="rating"
        control={control}
        render={({ field }) => <Rating value={field.value} onChange={(_, value) => field.onChange(value)} />}
      />

      <Controller
        name="comment"
        control={control}
        render={({ field }) => (
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
          />
        )}
      />

      <Button
        color="primary"
        variant="contained"
        size="small"
        type="submit"
        disabled={isDisabled}
        sx={{ alignSelf: 'flex-end' }}
      >
        Send
      </Button>
    </Stack>
  );
};

export default ReviewForm;
