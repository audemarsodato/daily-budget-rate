import { useEffect, useState } from "react"
import { endOfMonth } from "date-fns"

import { calculateDailyBudget } from "./services/dailyBudget"
import { saveDailyBudget } from "./services/historicalBudget"

import BottomSheet from "./components/bottom-sheet/BottomSheet"
import Analytics from "./components/analytics/Analytics"

export default function App() {
        const [ currentDate, setCurrentDate ] = useState(null)
        const [ remainingDays, setRemainingDays ] = useState(null)
        const [ starting, setStarting ] = useState('tomorrow')
        const [ dailyBudget, setDailyBudget ] = useState(null)
        const [ currentBudget, setCurrentBudget ] = useState(null)
        const [ isModalSheetOpen, setIsModalSheetOpen ] = useState(false)
        const [ saveCount, setSaveCount ] = useState(0) // use for tracking if user saved the daily budget rate, any changes triggers the analytics to display the newly saved data
        
        const openModalSheet = () => {
                setIsModalSheetOpen(true)
        }

        const closeModalSheet = () => {
                setIsModalSheetOpen(false)
        }

        const getRemainingDays = () => {
                const today = new Date()
                const formatter = new Intl.DateTimeFormat('en-US', {month: 'short', day: 'numeric'})
                setCurrentDate(formatter.format(today).replace(' ', '. '))
                const remainingDays =  endOfMonth(today).getDate() - today.getDate()

                return remainingDays
        }

        useEffect(() => {
                let remainingDays =  getRemainingDays()
                if (starting === 'today') remainingDays += 1
                setRemainingDays(remainingDays)
        }, [starting])

        useEffect(() => {
                if (!dailyBudget || !currentBudget) return

                const newDailyBudget = calculateDailyBudget(currentBudget, remainingDays)

                setDailyBudget(newDailyBudget)
                // saveDailyBudget(currentBudget, newDailyBudget, starting)
        }, [remainingDays])

        const handleChange = event => {
                setCurrentBudget(event.target.value)
                const dailyBudget = calculateDailyBudget(event.target.value, remainingDays)

                setDailyBudget(dailyBudget)
                // saveDailyBudget(event.target.value, dailyBudget, starting)
        }

        const handleSave = () => {
                saveDailyBudget(currentBudget, dailyBudget, starting)
                setSaveCount(count => count + 1)
        }

        // TODO use save button path to give users the controll on what to save. This is a tool to calculate daily budget and not on automatically recrding daily budgets as historycal analysis.

        return (
                <section className="app">
                        <section className="current-date">
                                <div>
                                        <h1>{currentDate}</h1>
                                        <p className="days-left">{remainingDays} DAYS LEFT</p>
                                </div>

                                <div className="settings">
                                        <button className="settings__button" onClick={openModalSheet}>
                                                <span className='material-symbols-outlined settings__button__icon'>settings</span>
                                        </button>
                                </div>
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
                                <p><span className="daily-budget">{dailyBudget ? dailyBudget : ' - '}</span> pesos per day</p>
                                <p className="output__label">DAILY BUDGET</p>
                        </section>

                        <section className="save-daily-budget">
                                <button className="save-daily-budget__button" onClick={handleSave} disabled={!currentBudget}>SAVE</button>
                        </section>

                        <Analytics saveCount={saveCount}/>

                        <BottomSheet isOpen={isModalSheetOpen} onClose={closeModalSheet} />
                </section>
        )
}