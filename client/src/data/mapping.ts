import { Rating } from "@/types/enums.types";

export const ratingToNumber = {
  [Rating.ONE]: 1,
  [Rating.TWO]: 2,
  [Rating.THREE]: 3,
  [Rating.FOUR]: 4,
  [Rating.FIVE]: 5,
};

export const numberToRating = {
  1: Rating.ONE,
  2: Rating.TWO,
  3: Rating.THREE,
  4: Rating.FOUR,
  5: Rating.FIVE,
};
