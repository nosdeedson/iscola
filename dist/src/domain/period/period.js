"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Period = void 0;
const entity_1 = require("../@shared/entity");
const period_validator_1 = require("./period.validator");
class Period extends entity_1.Entity {
    constructor(actual, beginningDate, endingDate, id, createdAt, updatedAt, deletedAt) {
        super(id, createdAt, updatedAt, deletedAt);
        this.actual = actual;
        this.beginningDate = beginningDate;
        this.endingDate = endingDate;
        this.validate();
    }
    validate() {
        new period_validator_1.PeriodValidator().validate(this);
    }
    getActual() {
        return this.actual;
    }
    getBeginningDate() {
        return this.beginningDate;
    }
    getEndingDate() {
        return this.endingDate;
    }
}
exports.Period = Period;
//# sourceMappingURL=period.js.map