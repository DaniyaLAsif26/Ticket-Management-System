import BarGraph from "../components/Dashboard/BarGraph"
import ProgressBar from "../components/Dashboard/ProgressBar"

import { useState } from "react"

export default function HomePage() {

    const [activeIndex, setActiveIndex] = useState(null);

    const weeklyData = [
        { day: '9 May', tickets: 24, pending: 40, open: 60, closed: 20 },
        { day: '10 May', tickets: 38, pending: 70, open: 90, closed: 40 },
        { day: '11 May', tickets: 31, pending: 50, open: 70, closed: 30 },
        { day: '12 May', tickets: 45, pending: 80, open: 85, closed: 50 },
        { day: '13 May', tickets: 52, pending: 65, open: 80, closed: 30 },
        { day: '14 May', tickets: 18, pending: 30, open: 40, closed: 15 },
        { day: '15 May', tickets: 12, pending: 20, open: 35, closed: 10 },
    ];

    return (
        <div className="bg-[#171821] px-7 py-5 h-screen w-full grid grid-cols-3 grid-rows-2 gap-x-5">
            <BarGraph
                weeklyData={weeklyData}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <ProgressBar
                weeklyData={weeklyData}
                activeIndex={activeIndex}
            />
        </div>

    )
}