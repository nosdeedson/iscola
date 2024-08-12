import { Grade } from "./grade"
import { toEnum } from '../grade/grade'

describe('Grade unit test', () =>{

    it('should return enum of BAD', () => {
        const grade = Grade.BAD;
        let result = toEnum(grade);
        expect(result).toBe('BAD')
    })

    it('should return undefined', () => {
        const grade = 'invalid';
        let result = toEnum(grade);
        expect(result).toBeUndefined()
    })

})