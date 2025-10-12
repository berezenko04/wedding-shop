import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CardExpValid', async: false })
export class CardExpValidator implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return false;

    const [month, year] = value.split('/').map((v) => parseInt(v, 10));
    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    return (
      year > currentYear || (year === currentYear && month >= currentMonth)
    );
  }

  defaultMessage() {
    return 'Card expiration date must be in MM/YY format and not expired';
  }
}
