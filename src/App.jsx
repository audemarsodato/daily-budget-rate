import { useEffect, useState } from "react"
import { endOfMonth } from "date-fns"

import { calculateDailyBudget } from "./services/dailyBudget"

export default function App() {
        const [ currentDate, setCurrentDate ] = useState(null)
        const [ remainingDays, setRemainingDays ] = useState(null)
        const [ starting, setStarting ] = useState('tomorrow')
        const [ dailyBudget, setDailyBudget ] = useState(null)
        const [ currentBudget, setCurrentBudget ] = useState(null)



        useEffect(() => {
                const today = new Date()
                const formatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'})
                setCurrentDate(formatter.format(today).replace(' ', '. '))

                let remainingDays =  endOfMonth(today).getDate() - today.getDate()
                if (starting === 'today') remainingDays += 1
                setRemainingDays(remainingDays)
        }, [starting])

        useEffect(() => {
                if (!dailyBudget || !currentBudget) return

                const newDailyBudget = calculateDailyBudget(currentBudget, remainingDays)
                setDailyBudget(newDailyBudget)
        }, [remainingDays])

        const handleChange = event => {
                setCurrentBudget(event.target.value)
                const dailyBudget = calculateDailyBudget(event.target.value, remainingDays)

                setDailyBudget(dailyBudget)
        }

        return (
                <section className="app">
                        <section className="current-date">
                                <h1>{currentDate}</h1>
                                <p className="days-left">{remainingDays} DAYS LEFT</p>
                        </section>

                        <section className="starting">
                                <p className="starting__label">Starts</p>
                                <div className="starting__options">
                                        <label htmlFor="today" className={starting === 'today' ? 'choosen' : ''} >TODAY</label>
                                        <label htmlFor="tomorrow" className={starting === 'tomorrow' ? 'choosen' : ''}>TOMORROW</label>

                                        <input type="radio" name="starting" value='today' id="today" hidden checked={starting === 'today'} onChange={() => setStarting('today')} />
                                        <input type="radio" name="starting" value='tomorrow' id="tomorrow" hidden checked={starting === 'tomorrow'} onChange={() => setStarting('tomorrow')} />
                                </div>
                        </section>

                        <section className="amount-input">
                                <p className="amount-input__label">Remaining Budget</p>
                                <input type="number" onChange={handleChange} placeholder="0"/>
                        </section>

                        <section className="output">
                                <p><span className="daily-budget">{dailyBudget ? dailyBudget.toFixed(2) : ' - '}</span> pesos per day</p>
                                <p className="output__label">DAILY BUDGET</p>
                        </section>
                </section>
        )
}