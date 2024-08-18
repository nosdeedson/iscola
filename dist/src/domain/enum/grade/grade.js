"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grade = void 0;
exports.toEnum = toEnum;
var Grade;
(function (Grade) {
    Grade["BAD"] = "BAD";
    Grade["REGULAR"] = "REGULAR";
    Grade["GOOD"] = "GOOD";
    Grade["VERY_GOOD"] = "VERY_GOOD";
    Grade["EXCELENT"] = "EXCELENT";
})(Grade || (exports.Grade = Grade = {}));
function toEnum(value) {
    let values = [Grade.BAD, Grade.REGULAR, Grade.GOOD, Grade.VERY_GOOD, Grade.EXCELENT];
    const result = values.filter(it => it === value)[0];
    return result;
}
//# sourceMappingURL=grade.js.map