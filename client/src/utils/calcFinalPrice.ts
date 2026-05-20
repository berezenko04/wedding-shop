export const calcFinalPrice = (price: number, discount?: number | null) => price * (1 - (discount ?? 0));
