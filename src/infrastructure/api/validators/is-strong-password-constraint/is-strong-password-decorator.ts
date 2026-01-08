import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsStrongPasswordConstraint } from './is-strong-password-constraint';

export function IsStrongPassword(
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStrongPasswordConstraint,
    });
  };
}
