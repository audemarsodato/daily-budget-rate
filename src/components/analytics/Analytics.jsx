import { useEffect, useState } from "react"
import { getHistoryData } from "../../services/historicalBudget"
import { calculateAverageDailyExpense, calculateAverageIncrease } from '../../services/dailyBudget'
import LineGraph from "./components/line-graph/LineGraph"
import './Analytics.css'

export default function Analytics({ saveCount }) {
        const [ historyData, setHistoryData ] = useState(getHistoryData())
        const [ avgDailyExpense, setAvgDailyExpense ] = useState(calculateAverageDailyExpense(
                historyData.map(data => data.currentTotalBudget)
        ))
        const [ avgDailyBudgetIncrease, setAvgDailyBudgetIncrease ] = useState(calculateAverageIncrease(
                historyData.map(data => data.dailyBudget)
        ))
        const [ toggleOn, setToggleOn ] = useState(false)
       
        useEffect(() => {
                setHistoryData(getHistoryData())
        }, [saveCount])
        
        useEffect(() => {
                setAvgDailyExpense(calculateAverageDailyExpense(
                        historyData.map(data => data.currentTotalBudget)
                ))
                setAvgDailyBudgetIncrease(calculateAverageIncrease(
                        historyData.map(data => data.dailyBudget)
                ))
                console.log(calculateAverageIncrease(historyData.map(data => data.dailyBudget)))
        }, [historyData])

        return (
                <section className="analytics">
                        <button className="analytics__toggle__button" onClick={() => setToggleOn(prev => !prev)}>
                                Analytics
                                <span className={`material-symbols-outlined analytics__toggle__icon ${toggleOn ? 'rotate-up' : ''}`}>arrow_drop_down</span>
                        </button>
                        {toggleOn &&
                                <div className={`analytics__toggle animate-toggle`}>
                                        <div className="analytics__section">
                                                <p className="analytics__label">Daily Budget</p>
                                                <LineGraph historyData={historyData} label={'Daily Budget'} type={'dailyBudget'}/>
                                        </div>

                                        <div className="analytics__section">
                                                <p className="analytics__label">Total Budget</p>
                                                <LineGraph historyData={historyData} label={'Total Budget'} type={'totalBudget'}/>
                                        </div>
                                        <section className="indicators">
                                                <section className="average-daily-expense indicator">
                                                        <h2>{avgDailyExpense}</h2>
                                                        <p className="indicator__peso-label">pesos</p>
                                                        <p className="indicator__label">Average Daily Expense</p>
                                                </section>
                                                <section className="average-daily-budget-increase indicator">
                                                        <h2>{avgDailyBudgetIncrease > 0 ? 
                                                                `+${avgDailyBudgetIncrease}` 
                                                                :
                                                                avgDailyBudgetIncrease}
                                                        </h2>
                                                        <p className="indicator__peso-label">pesos</p>
                                                        <p className="indicator__label">Average Increase on Daily Budget</p>
                                                </section>
                                        </section>
                                </div>
                        }
                </section>
        )
}