import BarGraph from "../components/Dashboard/BarGraph"
import ProgressBar from "../components/Dashboard/ProgressBar"
import StatCard from '../components/Dashboard/StatCard'
import TicketsTable from "../components/Dashboard/TicketsTable"

import { useState } from "react"

import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import BlockIcon from '@mui/icons-material/Block';
import CloudDoneIcon from '@mui/icons-material/CloudDone';

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

    const statData = [
        { icon: <LocalActivityOutlinedIcon sx={{ color: 'darkgreen', fontSize: 18 }} />, bg: 'bg-green-300', name: "Open Tickets", data: 126, percentage: '+2.6 %', positive: true },
        { icon: <QuestionMarkIcon sx={{ color: 'darkorange', fontSize: 18 }} />, bg: 'bg-orange-300', name: "Pending Tickets", data: 12, percentage: '+2.6 %', positive: true },
        { icon: <RepeatOutlinedIcon sx={{ color: 'purple', fontSize: 18 }} />, bg: 'bg-purple-300', name: "In-Progress Tickets", data: 26, percentage: '-2.6 %', positive: false },
        { icon: <BlockIcon sx={{ color: '#ca8a04', fontSize: 18 }} />, bg: 'bg-yellow-300', name: "Closed Tickets", data: 50, percentage: '-2.6 %', positive: false },
        { icon: <CloudDoneIcon sx={{ color: '#2563eb', fontSize: 18 }} />, bg: 'bg-blue-300', name: "Resolved Tickets", data: 69, percentage: '-2.6 %', positive: false },
    ]

    return (
        <div className="bg-[#171821] px-7 py-5 h-full w-full flex flex-col gap-7">
            <div className="grid grid-cols-5 gap-x-5">
                {statData.map((item, index) =>
                    <StatCard key={index} data={item} />
                )}
            </div>

            <div className="grid grid-cols-4 gap-x-5">
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
            <div className="">
                <TicketsTable/>
            </div>
        </div>

    )
}