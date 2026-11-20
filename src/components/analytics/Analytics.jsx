import { useEffect, useState } from "react"
import { getHistoryData } from "../../services/historicalBudget"
import LineGraph from "./components/line-graph/LineGraph"
import './Analytics.css'

export default function Analytics({ saveCount }) {
        const [ historyData, setHistoryData ] = useState(getHistoryData())
        const [ toggleOn, setToggleOn ] = useState(false)
       
        useEffect(() => {
                setHistoryData(getHistoryData())
        }, [saveCount])

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
                                </div>
                        }
                </section>
        )
}