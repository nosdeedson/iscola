import {IsStrongPasswordConstraint} from "./is-strong-password-constraint"

describe('IsStrongPasswordConstraint', () => {
    const validator = new IsStrongPasswordConstraint();
    it('should accept a strong password', () => {
        expect(validator.validate('Abcd1234', null as any)).toBe(true);
    });

    it('should reject a weak password', () => {
        expect(validator.validate('weak', null as any)).toBe(false);
    });

    it('should reject a non-string value', () => {
        expect(validator.validate(123, null as any)).toBe(false);
    });
})