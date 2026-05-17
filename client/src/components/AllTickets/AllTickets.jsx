import TicketsTable from "../Dashboard/TicketsTable"

export default function AllTickets() {
    return (
        <div className="bg-[#171821] px-7 py-5 min-h-full">
            <TicketsTable isHome={false} />
        </div>
    )
}
