import { useEffect, useState } from 'react'
import { 
        Chart as ChartJS,
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler,
        plugins,
        scales
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { getHistoryData } from '../../../../services/historicalBudget'
import { max } from 'date-fns'

ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        Filler
)

export default function LineGraph({ historyData, label, type }) {
        // const minValue = Math.min(historyData.map(data => {
        //         if (type === 'dailyBudget') {
        //                 return data.dailyBudget
        //         }
        //         return data.currentTotalBudget
        // }))
        // const maxValue = Math.max(historyData.map(data => {
        //         if (type === 'dailyBudget') {
        //                 return data.dailyBudget
        //         }
        //         return data.currentTotalBudget
        // }))

        // const padding = (maxValue - maxValue) * 0.5

        const data = {
                labels: historyData.map(data => data.date.split(', ')[0]),
                datasets: [
                        {
                                label: label,
                                data: historyData.map(data => {
                                        if (type === 'dailyBudget') {
                                                return data.dailyBudget
                                        }
                                        return data.currentTotalBudget

                                }),
                                borderColor: getComputedStyle(document.documentElement).getPropertyValue('--text-color'),
                                // backgroundColor: getComputedStyle(document.documentElement).getPropertyValue(`--${type === 'dailyBudget' ? 'secondary' : 'accent'}-color`),
                                backgroundColor: '#ffffff',
                                fill: true,
                                tension: 0.1,
                                borderWidth: 3,
                                pointRadius: 0
                        }
                ]
        }

        const options = {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                        legend: {
                                display: false,
                                position: 'bottom',
                                align: 'start',
                                labels: {
                                        color: '#000000',
                                        font: {
                                                size: 10,
                                                weight: 'bold',
                                                family: 'Sora'
                                        },
                                        padding: 16
                                }
                        },
                        tooltip: {
                                enabled: true,
                                mode: 'index',
                                intersect: false
                        }
                },
                scales: {
                        x: {
                                ticks: {
                                        color: '#000000',
                                        padding: 4,
                                        font: {
                                                size: 10,
                                                weight: 'bold',
                                                family: 'Sora'
                                        }
                                }
                        },
                        y: {
                                beginAtZero: false,
                                // max: maxValue - padding,
                                // min: minValue + padding,
                                ticks: {
                                        color: '#000000',
                                        padding: 0,
                                        font: {
                                                size: 10,
                                                weight: 'bold',
                                                family: 'Sora'
                                        }
                                }
                        }
                }
        }
       
        return (
                <section className="line-graph">
                        <Line data={data} options={options}></Line>
                </section>
        )
}