import { describe, it, expect } from "vitest"
import { 
        calculateDailyBudget, 
        calculateAverageIncrease, 
        calculateAverageIncreaseRate,
        calculateAverageDailyExpense
} from "./dailyBudget"

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

describe('calculate average increase of daily budget', () => {
        // TODO how do you know its sorted? what if its not sorted? what if its sorted i descending order instead of the other way around based on date?

        it('returns the average of daily budgets from an array', () => {
                expect(calculateAverageIncrease([10, 30])).toBe(20)
                expect(calculateAverageIncrease([250, 255.56])).toBe(5.56)
                expect(calculateAverageIncrease([10, 20, 30])).toBe(10)
                expect(calculateAverageIncrease([10, 15, 20, 25, 30])).toBe(5)
        })
        
        it('returns a negative value when daily budgets are decreasing', () => {
                expect(calculateAverageIncrease([30, 25, 20, 15, 10, 5, 0])).toBe(-5)
                expect(calculateAverageIncrease([10, 6])).toBe(-4)
        })

        it('returns an average with 2 decimal places', () => {
                expect(calculateAverageIncrease([176.47, 187.5, 200, 214.29, 219.23])).toBe(10.69)
                expect(String(calculateAverageIncrease([176.47, 187.5, 200, 214.29, 219.23]))).toMatch(/^\d+\.\d{2}$/)
        })
        
        it('throws an error when passed argument is not an array of numbers', () => {
                expect(() => calculateAverageIncrease('')).toThrow()
        })
        
        it('throws an error when array contains a string', () => {
                expect(() => calculateAverageIncrease(['not number', 100, 200])).toThrow()
                expect(() => calculateAverageIncrease([100, 'string', 200])).toThrow()
                expect(() => calculateAverageIncrease([100, 'string', 'soigfoeif'])).toThrow()
        })

        it('returns 0 when the daily budgets array is empty', () => {
                expect(calculateAverageIncrease([])).toBe(0)
        })
        
        it('returns 0 when daily budgets array has only 1 daily budget', () => {
                expect(calculateAverageIncrease([100])).toBe(0)
        })
})

describe('calculate average increase rate of daily budgets', () => {
        it('returns the average increase rate', () => {
                expect(calculateAverageIncreaseRate([5, 10, 20, 40])).toBe(100)
                expect(calculateAverageIncreaseRate([5, 10])).toBe(100)
        })
        
        it('returns an average daily budget increase rate with 2 decimal places', () => {
                expect(calculateAverageIncreaseRate([5, 10, 15, 20, 25, 30])).toBe(45.67)
                expect(String(calculateAverageIncreaseRate([176.47, 187.5, 200, 214.29, 219.23]))).toMatch(/^\d+\.\d{2}$/)
        })

        it('returns a negative value when daily budgets are decreasing', () => {
                expect(calculateAverageIncreaseRate([30, 25, 20, 15, 10, 5, 0])).toBe(-40.83)
                expect(calculateAverageIncreaseRate([10, 6])).toBe(-40)
        })

        it('throws an error when passed argument is not an array of numbers', () => {
                expect(() => calculateAverageIncreaseRate('')).toThrow()
        })
        
        it('throws an error when array contains a string', () => {
                expect(() => calculateAverageIncreaseRate(['not number', 100, 200])).toThrow()
                expect(() => calculateAverageIncreaseRate([100, 'string', 200])).toThrow()
                expect(() => calculateAverageIncreaseRate([100, 'string', 'soigfoeif'])).toThrow()
        })

        it('returns 0 when the daily budgets array is empty', () => {
                expect(calculateAverageIncreaseRate([])).toBe(0)
        })
        
        it('returns 0 when daily budgets array has only 1 daily budget', () => {
                expect(calculateAverageIncreaseRate([100])).toBe(0)
        })
})

describe('calculate average daily expense from record of total budgets', () => {
        it('returns an average of daily expense from array of total budgets', () => {
                expect(calculateAverageDailyExpense([1000, 900, 800, 700])).toBe(100)
        })

        it('returns an average daily expense with 2 decimal places', () => {
                expect(calculateAverageDailyExpense([3000, 2850, 2700, 2500])).toBe(166.67)
                expect(String(calculateAverageDailyExpense([3000, 2850, 2700, 2500]))).toMatch(/^\d+\.\d{2}$/)
        })

        it('throws an error when passing a string instead of array', () => {
                expect(() => calculateAverageDailyExpense('')).toThrow()
        })
        
        it('throws an error when total budgets array has a string', () => {
                expect(() => calculateAverageDailyExpense([3000, 'string', 2622, '12fe'])).toThrow()
        })
        
        it('returns 0 when total budgets are empty', () => {
                expect(calculateAverageDailyExpense([])).toBe(0)
        })
        
        it('returns 0 when theres only one total budget in the array', () => {
                expect(calculateAverageDailyExpense([3000])).toBe(0)
        })

        it('return a negative value if total budgets are increasing', () => {
                expect(calculateAverageDailyExpense([1000, 2000, 3000])).toBe(-1000)
        })
})