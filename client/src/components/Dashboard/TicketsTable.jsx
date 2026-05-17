import { useState } from 'react';
import Filters from './Filters';
import Table from './Table';

export default function TicketsTable({ isHome = true }) {

    const [typeSelected, setTypeSelected] = useState(null);
    const [prioritySelected, setPrioritySelected] = useState(null);
    const [dateSelected, setDateSelected] = useState(null);
    const [showFilter, setShowFilter] = useState(true);

    const [search, setSearch] = useState('');

    const dropDown = [
        { type: "Type", typeSelected: typeSelected, setTypeSelected: setTypeSelected, options: ['Open', 'Pending', 'In-Progress', 'Closed'] },
        { type: "Priority", typeSelected: prioritySelected, setTypeSelected: setPrioritySelected, options: ['Low', 'Medium', 'High'] },
        { type: "Date Submitted", typeSelected: dateSelected, setTypeSelected: setDateSelected, options: ['Newest', 'Oldest'] },
    ];

    return (
        <div className="bg-[#21222d] w-full rounded-xl text-white px-6 py-5 pb-9 ">
            <h1 className="text-[1.75rem] mb-7">{isHome ? 'Recent Tickets' : 'All Tickets'}</h1>

            {!isHome &&
                <Filters showFilter={showFilter} setShowFilter={setShowFilter} dropDown={dropDown} search={search} setSearch={setSearch} />
            }

            <Table search={search} setSearch={setSearch} prioritySelected={prioritySelected} isHome={isHome} />

        </div>
    );
}