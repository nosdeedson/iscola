export enum Grade {
    BAD = 'BAD',
    REGULAR = 'REGULAR',
    GOOD = 'GOOD',
    VERY_GOOD = 'VERY_GOOD',
    EXCELENT = 'EXCELENT'
}

export function toEnum(value: string): any {
    let values = [ Grade.BAD, Grade.REGULAR, Grade.GOOD, Grade.VERY_GOOD, Grade.EXCELENT ];
    const result = values.filter(it => it === value)[0]
    return result;
}