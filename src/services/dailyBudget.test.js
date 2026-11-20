import { describe, it, expect } from "vitest"
import { calculateDailyBudget } from "./dailyBudget"

describe('calculate daily budget rate', () => {
        it('returns a number', () => {
                expect(typeof calculateDailyBudget(100, 12) === 'number').toBeTruthy()
        })

        it('returns the current budget if remaining days is 0', () => {
                expect(calculateDailyBudget(100, 0)).toBe(100)
                expect(typeof calculateDailyBudget(100, 12) === 'number').toBeTruthy()
        })

        it('returns the current budget if remaining days is a negative value', () => {
                expect(calculateDailyBudget(100, -10)).toBe(100)
        })

        it('returns 0 when remaining budget is negative', () => {
                expect(calculateDailyBudget(-100, 23)).toBe(0)
        })
})