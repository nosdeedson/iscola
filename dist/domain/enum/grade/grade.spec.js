"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grade_1 = require("./grade");
const grade_2 = require("../grade/grade");
describe('Grade unit test', () => {
    it('should return enum of BAD', () => {
        const grade = grade_1.Grade.BAD;
        let result = (0, grade_2.toEnum)(grade);
        expect(result).toBe('BAD');
    });
    it('should return undefined', () => {
        const grade = 'invalid';
        let result = (0, grade_2.toEnum)(grade);
        expect(result).toBeUndefined();
    });
});
//# sourceMappingURL=grade.spec.js.map