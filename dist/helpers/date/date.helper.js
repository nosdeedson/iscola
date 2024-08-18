"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateHelper = void 0;
class DateHelper {
    static getDayOfweek(date) {
        switch (date.getDay()) {
            case 0: return 'Sunday';
            case 1: return 'Monday';
            case 2: return 'Tuesday';
            case 3: return 'Wednesday';
            case 4: return 'Thursday';
            case 5: return 'Friday';
            default: return 'Saturday';
        }
    }
}
exports.DateHelper = DateHelper;
//# sourceMappingURL=date.helper.js.map