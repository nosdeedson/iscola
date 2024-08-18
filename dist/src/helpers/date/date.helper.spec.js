"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateFns = require("date-fns");
const helper = require("../date/date.helper");
const today = new Date(2024, 7, 10, 16, 26, 0, 0);
describe('Date helper unit tests', () => {
    it('should return Sunday', () => {
        const result = helper.DateHelper.getDayOfweek(today);
        expect(result).toBe('Saturday');
    });
    it('should return Sunday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 1,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Sunday');
    });
    it('should return Monday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 2,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Monday');
    });
    it('should return Tuesday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 3,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Tuesday');
    });
    it('should return Wednesday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 4,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Wednesday');
    });
    it('should return Thursday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 5,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Thursday');
    });
    it('should return Friday', () => {
        const sunday = dateFns.add(today, {
            years: 0,
            months: 0,
            weeks: 0,
            days: 6,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        const result = helper.DateHelper.getDayOfweek(sunday);
        expect(result).toBe('Friday');
    });
});
//# sourceMappingURL=date.helper.spec.js.map