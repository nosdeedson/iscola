import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class IsStrongPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, _args: ValidationArguments): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    // example rule
    return value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be at least 8 characters long, contain one uppercase letter and one number`;
  }
}
