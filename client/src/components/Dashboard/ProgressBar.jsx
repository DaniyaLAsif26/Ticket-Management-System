export default function ProgressBar({ activeIndex, weeklyData }) {

    const weeklyTickets = weeklyData.reduce((sum, item) => sum + item.tickets, 0);

    const selected = activeIndex !== null ? weeklyData[activeIndex] : null;

    const statusData = [
        { label: 'Pending', percentage: selected ? selected.pending : 0, color: '#fcd34d'  },
        { label: 'Open', percentage: selected ? selected.open : 0, color: '#f1f5f9'  },
        { label: 'Closed', percentage: selected ? selected.closed : 0, color: '#93c5fd'  },
    ];

    const selectedDay = selected ? selected.day : null;

    return (
        <div className="col-span-2 box-border flex flex-col justify-start rounded-xl bg-[#21222d] px-7 py-4 text-white">
            <h2 className="text-[1.1rem] font-semibold">Tickets by Status</h2>
            <div className="text-gray-500 text-[0.9rem] font-normal py-2 pb-3">
                <p className="">
                    {selectedDay ? selectedDay : 'Select Day'}
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
                                    width: `${item.percentage > 0 ? item.percentage : 69}%`,
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