import { useState } from 'react';
import { BarChart, Bar, XAxis, Cell, LabelList, ResponsiveContainer } from 'recharts';

const CustomTick = ({ x, y, payload, activeIndex, index }) => {
    const [day, month] = payload.value.split(' ');
    const isActive = index === activeIndex;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={12} textAnchor="middle" fill={isActive ? '#6366f1' : '#6b7280'} fontSize={12} fontWeight={isActive ? 600 : 400}>
                {day}
            </text>
            <text x={0} y={0} dy={26} textAnchor="middle" fill={isActive ? '#6366f1' : '#6b7280'} fontSize={12} fontWeight={isActive ? 600 : 400}>
                {month}
            </text>
        </g>
    );
};

export default function BarGraph({activeIndex, setActiveIndex , weeklyData}) {

    const handleClick = (data, index) => {
        setActiveIndex(prev => prev === index ? null : index);
    };

    return (
        <div className="flex flex-col justify-center rounded-xl bg-[#21222d] px-7 py-4 text-white">
            <h2 className="text-[1.1rem] font-semibold">Daily Tickets</h2>
            <p className="text-gray-500 text-[0.9rem] font-normal">Check out each column for more details</p>
            <div style={{ width: '100%', height: 200, minWidth: 0, outline: 'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={weeklyData}
                        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                        barSize={18}
                        barCategoryGap="20%"
                    >
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                            height={45}
                            tick={(props) => <CustomTick {...props} activeIndex={activeIndex} />}
                        />
                        <Bar
                            dataKey="tickets"
                            radius={[4, 4, 0, 0]}
                            cursor="pointer"
                            onClick={handleClick}
                        >
                            {weeklyData.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={index === activeIndex ? '#6366f1' : '#343344'}
                                />
                            ))}
                            <LabelList
                                dataKey="tickets"
                                position="top"
                                content={({ x, y, width, value, index }) =>
                                    index === activeIndex ? (
                                        <text
                                            x={x + width / 2}
                                            y={y - 6}
                                            textAnchor="middle"
                                            fill="#6366f1"
                                            fontSize={12}
                                            fontWeight={600}
                                        >
                                            {value}
                                        </text>
                                    ) : null
                                }
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}   