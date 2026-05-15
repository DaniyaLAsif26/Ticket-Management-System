export default function ProgressBar({ activeIndex, weeklyData }) {

    const weeklyTickets = weeklyData.reduce((sum, item) => sum + item.tickets, 0);

    const selected = activeIndex !== null ? weeklyData[activeIndex] : null;

    const statusData = [
        { label: 'Pending', percentage: selected ? selected.pending : 65, color: '#f59e0b' },
        { label: 'Open', percentage: selected ? selected.open : 80, color: '#ffffff' },
        { label: 'Closed', percentage: selected ? selected.closed : 30, color: '#3b82f6' },
    ];

    const selectedDay = selected ? selected.day : null;

    return (
        <div className="box-border flex flex-col justify-start rounded-xl bg-[#21222d] px-7 py-4 text-white">
            <h2 className="text-[1.1rem] font-semibold">Tickets by Status</h2>
            <div className="text-gray-500 text-[0.9rem] font-normal py-2 pb-3 flex *:flex-row justify-between">
                <p className="">
                    {selectedDay ? selectedDay : 'Weekly Data'}
                </p>

                <p>
                    Total Tickets : {selected ? selected.tickets : weeklyTickets}
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-6">
                {statusData.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                        {/* Track */}
                        <div className="flex-1 h-3 bg-[#2e2f3e] rounded-full overflow-hidden">
                            {/* Fill */}
                            <div
                                className="h-full rounded-full"
                                style={{
                                    width: `${item.percentage}%`,
                                    backgroundColor: item.color,
                                    transition: 'width 0.6s ease'
                                }}
                            />
                        </div>
                        {/* Percentage */}
                        <span
                            className="text-[0.9rem] font-semibold w-10 text-right"
                            style={{ color: item.color }}
                        >
                            {item.percentage}%
                        </span>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 pt-3">
                {statusData.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-sm"
                            style={{ backgroundColor: item.color }}
                        />
                        <span
                            className="text-[0.85rem] font-medium"
                            style={{ color: item.color }}
                        >
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    )
}