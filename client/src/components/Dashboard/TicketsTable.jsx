// import SearchIcon from '@mui/icons-material/Search';
// import { useState } from 'react';
// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// export default function TicketsTable() {

//     const lineStyles = 'h-5 bg-gray-500 w-px mx-5';

//     const [typeSelected, setTypeSelected] = useState(null);
//     const [prioritySelected, setPrioritySelected] = useState(null);
//     const [dateSelected, setDateSelected] = useState(null);
//     const [showFilter, setShowFilter] = useState(true);

//     const dropDown = [
//         { type: "Type", typeSelected: typeSelected, setTypeSelected: setTypeSelected, options: ['Open', 'Pending', 'In-Progress', 'Closed'] },
//         { type: "Priority", typeSelected: prioritySelected, setTypeSelected: setPrioritySelected, options: ['Low', 'Medium', 'High'] },
//         { type: "Date Submitted", typeSelected: dateSelected, setTypeSelected: setDateSelected, options: ['Newest', 'Oldest'] },
//     ];

//     return (
//         <div className="bg-[#171a22] h-200 w-full rounded-xl text-white px-6 py-5">
//             <h1 className="text-[1.75rem] mb-7">Support Requests</h1>

//             <div className="px-3 flex flex-row justify-start items-center">

//                 {/* Collapsible filter section */}
//                 <div className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden
//                     ${showFilter
//                         ? 'opacity-100 max-w-169 pointer-events-auto'
//                         : 'opacity-0 max-w-0 pointer-events-none'
//                     }`}
//                 >
//                     {/* Search */}
//                     <div className="flex items-center bg-[#25282C] px-2 rounded-xl h-8 w-40 border-2 border-[#2a2d34]">
//                         <SearchIcon sx={{ fontSize: 18, color: 'gray' }} />
//                         <input
//                             type="text"
//                             placeholder="Search"
//                             className="bg-transparent text-white ml-1 text-[0.95rem] w-full focus:outline-none"
//                         />
//                     </div>

//                     <span className={lineStyles}></span>

//                     {/* Dropdowns */}
//                     <div className="flex flex-row gap-3">
//                         {dropDown.map((items, i) => (
//                             <DropdownMenu.Root key={i}>
//                                 <DropdownMenu.Trigger className="flex items-center gap-2 px-3 py-1.5 bg-[#25282C] border border-[#2a2d34] rounded-lg text-sm text-white outline-none hover:bg-[#2e2f3e] cursor-pointer whitespace-nowrap">
//                                     {items.type}
//                                     <span className="text-gray-400 text-xs">▾</span>
//                                 </DropdownMenu.Trigger>

//                                 <DropdownMenu.Portal>
//                                     <DropdownMenu.Content
//                                         sideOffset={6}
//                                         className="bg-[#21222d] border border-[#2a2d34] rounded-lg p-1 min-w-40 shadow-lg z-50"
//                                     >
//                                         {items.options.map((item, j) => (
//                                             <div key={item}>
//                                                 {j === items.options.length - 1 &&
//                                                     <DropdownMenu.Separator className="h-px bg-[#2a2d34] my-1" />
//                                                 }
//                                                 <DropdownMenu.Item
//                                                     className={`flex items-center px-3 py-2 text-sm rounded-md outline-none cursor-pointer hover:bg-[#2e2f3e]
//                                                         ${item === items.typeSelected ? 'text-[#6366f1] font-medium bg-[#2e2f3e]' : 'text-white'}`}
//                                                     onSelect={() => items.setTypeSelected(item === items.typeSelected ? null : item)}
//                                                 >
//                                                     {item}
//                                                 </DropdownMenu.Item>
//                                             </div>
//                                         ))}
//                                     </DropdownMenu.Content>
//                                 </DropdownMenu.Portal>
//                             </DropdownMenu.Root>
//                         ))}
//                     </div>

//                     <span className={lineStyles}></span>
//                 </div>

//                 {/* Toggle button — slides left when filters collapse */}
//                 <div
//                     className="underline cursor-pointer text-sm text-gray-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
//                     onClick={() => setShowFilter(prev => !prev)}
//                 >
//                     {showFilter ? 'Hide filters' : 'Show filters'}
//                 </div>

//             </div>
//         </div>
//     );
// }

// TicketsTable.jsx
// npm install @tanstack/react-table

import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

// ── Static data (replace with API call later) ─────────────────────────────────
const defaultData = [
    { id: 'TC-0001', subject: 'System Login Failure',           priority: 'Low',    customer: 'Billy Harper',        agent: null,               date: '01 Sept 2024' },
    { id: 'TC-0002', subject: 'Unable to Reset Password',       priority: 'High',   customer: 'Ben White',           agent: null,               date: '08 Sept 2024' },
    { id: 'TC-0003', subject: 'Slow Application Performance',   priority: 'Low',    customer: 'Emily Johnson',       agent: null,               date: '12 Sept 2024' },
    { id: 'TC-0004', subject: 'Request for Additional Storage', priority: 'Low',    customer: 'Tiago Motta',         agent: null,               date: '08 Sept 2024' },
    { id: 'TC-0005', subject: 'File Upload Error',              priority: 'High',   customer: 'John Anderson',       agent: 'Bryan',            date: '11 Sept 2024' },
    { id: 'TC-0006', subject: 'Unable to Access Reports',       priority: 'High',   customer: 'Isabella Thompson',   agent: 'Rijal Jatnika',    date: '16 Sept 2024' },
    { id: 'TC-0007', subject: 'Integration with Third-party',   priority: 'Medium', customer: 'Charlotte Green',     agent: 'Panji Dwi',        date: '17 Sept 2024' },
    { id: 'TC-0008', subject: 'Data Sync Issue',                priority: 'Low',    customer: 'Harper Scott',        agent: 'Raihan Fikri',     date: '22 Sept 2024' },
    { id: 'TC-0009', subject: 'Unexpected App Crash',           priority: 'High',   customer: 'Evelyn Carter',       agent: 'Mufti Hidayat',    date: '22 Sept 2024' },
    { id: 'TC-0010', subject: 'Feedback on User Interface',     priority: 'Low',    customer: 'Oliver Wright',       agent: 'Laokta Roymarlay', date: '15 Sept 2024' },
    { id: 'TC-0011', subject: 'Incorrect Billing Information',  priority: 'Medium', customer: 'Olivia Jackson',      agent: 'Fauzan A',         date: '28 Sept 2024' },
    { id: 'TC-0012', subject: 'Page Not Loading',               priority: 'Medium', customer: 'Emma Brown',          agent: 'Wildan M',         date: '27 Sept 2024' },
];

// ── Priority badge ────────────────────────────────────────────────────────────
const priorityConfig = {
    Low:    { dot: '#22c55e', text: '#22c55e', bg: '#22c55e15', label: 'Low'    },
    Medium: { dot: '#f59e0b', text: '#f59e0b', bg: '#f59e0b15', label: 'Medium' },
    High:   { dot: '#ef4444', text: '#ef4444', bg: '#ef444415', label: 'High'   },
};

function PriorityBadge({ priority }) {
    const config = priorityConfig[priority] || priorityConfig.Low;
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: config.bg, color: config.text,
            fontSize: 12, fontWeight: 500,
            padding: '3px 10px', borderRadius: 999,
            border: `1px solid ${config.dot}30`,
        }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: config.dot, display: 'inline-block' }} />
            {config.label}
        </span>
    );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
const avatarColors = ['#6366f1', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];

function Avatar({ name, size = 28 }) {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
    return (
        <div style={{
            width: size, height: size, borderRadius: '50%',
            background: color + '30', border: `1px solid ${color}60`,
            color, fontSize: 11, fontWeight: 600,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
        }}>
            {initials}
        </div>
    );
}

// ── Column definitions ────────────────────────────────────────────────────────
const columns = [
    {
        accessorKey: 'id',
        header: 'Ticket ID',
        cell: ({ getValue }) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', flexShrink: 0 }} />
                <span style={{ color: '#d1d5db', fontWeight: 500, fontSize: 13 }}>{getValue()}</span>
            </div>
        ),
        size: 110,
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ getValue }) => (
            <span style={{ color: '#f1f5f9', fontSize: 13, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>
                {getValue()}
            </span>
        ),
        size: 240,
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
        size: 100,
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ getValue }) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar name={getValue()} />
                <span style={{ color: '#d1d5db', fontSize: 13 }}>{getValue()}</span>
            </div>
        ),
        size: 180,
    },
    {
        accessorKey: 'agent',
        header: 'Agent',
        cell: ({ getValue }) => {
            const agent = getValue();
            return agent ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Avatar name={agent} size={24} />
                    <span style={{ color: '#d1d5db', fontSize: 13 }}>{agent}</span>
                </div>
            ) : (
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    background: 'transparent', border: 'none',
                    color: '#6366f1', fontSize: 13, cursor: 'pointer', padding: 0,
                    fontFamily: 'inherit',
                }}>
                    <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Assign agent
                </button>
            );
        },
        size: 160,
    },
    {
        accessorKey: 'date',
        header: 'Date Submitted',
        cell: ({ getValue }) => (
            <span style={{ color: '#9ca3af', fontSize: 13 }}>{getValue()}</span>
        ),
        size: 130,
    },
];

// ── Sort icon ─────────────────────────────────────────────────────────────────
function SortIcon({ sorted }) {
    if (!sorted) return <span style={{ color: '#4b5563', fontSize: 11, marginLeft: 4 }}>⇅</span>;
    return <span style={{ color: '#6366f1', fontSize: 11, marginLeft: 4 }}>{sorted === 'asc' ? '↑' : '↓'}</span>;
}

// ── Main table ────────────────────────────────────────────────────────────────
export default function TicketsTable() {
    const [sorting, setSorting] = useState([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [priorityFilter, setPriorityFilter] = useState(null);

    const filteredData = useMemo(() => {
        if (!priorityFilter) return defaultData;
        return defaultData.filter(d => d.priority === priorityFilter);
    }, [priorityFilter]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <div style={{ background: '#171a22', borderRadius: 14, padding: '24px', color: 'white', width: '100%', boxSizing: 'border-box' }}>

            {/* Header */}
            <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Support Requests</h1>

            {/* Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                {/* Search */}
                <div style={{ display: 'flex', alignItems: 'center', background: '#25282C', border: '1px solid #2a2d34', borderRadius: 8, padding: '6px 10px', gap: 6, minWidth: 180 }}>
                    <span style={{ color: '#6b7280', fontSize: 14 }}>🔍</span>
                    <input
                        value={globalFilter}
                        onChange={e => setGlobalFilter(e.target.value)}
                        placeholder="Search tickets..."
                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 13, width: '100%' }}
                    />
                </div>

                {/* Priority filter */}
                {['Low', 'Medium', 'High'].map(p => (
                    <button
                        key={p}
                        onClick={() => setPriorityFilter(prev => prev === p ? null : p)}
                        style={{
                            padding: '5px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                            border: `1px solid ${priorityFilter === p ? '#6366f1' : '#2a2d34'}`,
                            background: priorityFilter === p ? '#6366f120' : '#25282C',
                            color: priorityFilter === p ? '#6366f1' : '#9ca3af',
                            fontFamily: 'inherit', transition: 'all 0.15s',
                        }}
                    >
                        {p}
                    </button>
                ))}

                <div style={{ flex: 1 }} />

                {/* Row count */}
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                    {table.getFilteredRowModel().rows.length} tickets
                </span>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} style={{ borderBottom: '1px solid #2a2d34' }}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        style={{
                                            padding: '10px 16px', textAlign: 'left',
                                            fontSize: 12, fontWeight: 500, color: '#9ca3af',
                                            cursor: 'pointer', userSelect: 'none',
                                            whiteSpace: 'nowrap', width: header.column.columnDef.size,
                                        }}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        <SortIcon sorted={header.column.getIsSorted()} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row, i) => (
                            <tr
                                key={row.id}
                                style={{
                                    borderBottom: '1px solid #1e2130',
                                    background: i % 2 === 0 ? 'transparent' : '#1a1d27',
                                    cursor: 'pointer', transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#1e2130'}
                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : '#1a1d27'}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} style={{ padding: '12px 16px' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                    {[
                        { label: '«', action: () => table.setPageIndex(0),         disabled: !table.getCanPreviousPage() },
                        { label: '‹', action: () => table.previousPage(),          disabled: !table.getCanPreviousPage() },
                        { label: '›', action: () => table.nextPage(),              disabled: !table.getCanNextPage() },
                        { label: '»', action: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
                    ].map(({ label, action, disabled }) => (
                        <button
                            key={label}
                            onClick={action}
                            disabled={disabled}
                            style={{
                                width: 30, height: 30, borderRadius: 6,
                                background: '#25282C', border: '1px solid #2a2d34',
                                color: disabled ? '#4b5563' : '#d1d5db',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                                fontSize: 14, fontFamily: 'inherit',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Backend swap guide ────────────────────────────────────────────────────────
// Replace defaultData with:
//
// const [data, setData] = useState([]);
// useEffect(() => {
//   axios.get('/api/tickets').then(res => setData(res.data));
// }, []);
//
// Then pass `data` instead of `defaultData` to useReactTable