import BarGraph from "../components/Dashboard/BarGraph"

export default function HomePage() {
    return (
        <div className="bg-[#171821] px-7 py-5 h-screen w-full grid grid-cols-3 grid-rows-2">
            <BarGraph />
        </div>

    )
}