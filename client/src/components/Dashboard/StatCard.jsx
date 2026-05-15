export default function StatCard({ data }) {

    console.log(data)

    return (
        <div className={`bg-[#21222d] rounded-xl text-white px-5 py-3 border-t-2 border-yellow-300`}>
            <div className="flex flex-row gap-2">
                <span className={`flex justify-center items-center px-0.5 rounded-sm ${data.bg}`}>
                    {data.icon}
                </span>
                <div className="text-[0.93rem]">{data.name}</div>
            </div>
            <div className="font-bold text-[2rem] py-3 border-b-[0.5px] border-gray-400">{data.data}</div>
            <div className="pt-3 flex items-center gap-2 text-[0.85rem] text-gray-400 font-normal">
                <span className={`${data.positive ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'} flex justify-center items-center font-semibold rounded-xl px-1 text-[0.75rem] h-[0.95]`}>{data.percentage}</span>
                Than Last Week
            </div>
        </div>
    )
}