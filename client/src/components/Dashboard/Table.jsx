import { useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
} from '@tanstack/react-table';

const ticketsData = [
    { id: 'TC-0001', subject: 'System Login Failure', priority: 'Low', customer: 'Billy Harper', agent: null, date: '01 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0002', subject: 'Unable to Reset Password', priority: 'High', customer: 'Ben White', agent: null, date: '08 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0003', subject: 'Slow Application Performance', priority: 'Low', customer: 'Emily Johnson', agent: null, date: '12 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0004', subject: 'Request for Additional Storage', priority: 'Low', customer: 'Tiago Motta', agent: null, date: '08 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0005', subject: 'File Upload Error', priority: 'High', customer: 'John Anderson', agent: 'Bryan', date: '11 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0006', subject: 'Unable to Access Reports', priority: 'High', customer: 'Isabella Thompson', agent: 'Rijal Jatnika', date: '16 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0007', subject: 'Integration with Third-party', priority: 'Medium', customer: 'Charlotte Green', agent: 'Panji Dwi', date: '17 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0008', subject: 'Data Sync Issue', priority: 'Low', customer: 'Harper Scott', agent: 'Raihan Fikri', date: '22 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0009', subject: 'Unexpected App Crash', priority: 'High', customer: 'Evelyn Carter', agent: 'Mufti Hidayat', date: '22 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0010', subject: 'Feedback on User Interface', priority: 'Low', customer: 'Oliver Wright', agent: 'Laokta Roymarlay', date: '15 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0011', subject: 'Incorrect Billing Information', priority: 'Medium', customer: 'Olivia Jackson', agent: 'Fauzan A', date: '28 Sept 2024', last: '01 Sept 2024' },
    { id: 'TC-0012', subject: 'Page Not Loading', priority: 'Medium', customer: 'Emma Brown', agent: 'Wildan M', date: '27 Sept 2024', last: '01 Sept 2024' },
];

const defaultData = ticketsData.slice(0, 6);

// PriorityBadge 
const priorityConfig = {
    Low: { dot: '#22c55e', text: '#22c55e', bg: '#22c55e15' },
    Medium: { dot: '#f59e0b', text: '#f59e0b', bg: '#f59e0b15' },
    High: { dot: '#ef4444', text: '#ef4444', bg: '#ef444415' },
};

function PriorityBadge({ priority }) {
    const config = priorityConfig[priority] || priorityConfig.Low;
    return (
        <span style={{ background: config.bg, color: config.text, border: `1px solid ${config.dot}30` }}
            className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full"
        >
            <span style={{ background: config.dot }} className="w-1.5 h-1.5 rounded-full inline-block" />
            {priority}
        </span>
    );
}

// Avatar Frame
const avatarColors = ['#6366f1', '#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#14b8a6', '#f97316'];

function Avatar({ name, size = 28 }) {
    const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
    return (
        <div
            style={{ width: size, height: size, background: color + '30', border: `1px solid ${color}60`, color }}
            className="rounded-full text-[11px] font-semibold flex items-center justify-center shrink-0"
        >
            {initials}
        </div>
    );
}

// Sort icon
function SortIcon({ sorted }) {
    if (!sorted) return <span className="text-gray-600 text-[11px] ml-1">⇅</span>;
    return <span className="text-[#6366f1] text-[11px] ml-1">{sorted === 'asc' ? '↑' : '↓'}</span>;
}

// Columns 
const columns = [
    {
        accessorKey: 'id',
        header: 'Ticket ID',
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span className="text-gray-300 font-medium text-[13px]">{getValue()}</span>
            </div>
        ),
    },
    {
        accessorKey: 'subject',
        header: 'Subject',
        cell: ({ getValue }) => (
            <span className="text-white text-[13px] block truncate max-w-[220px]">
                {getValue()}
            </span>
        ),
    },
    {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ getValue }) => <PriorityBadge priority={getValue()} />,
    },
    {
        accessorKey: 'customer',
        header: 'Customer',
        cell: ({ getValue }) => (
            <div className="flex items-center gap-2">
                <Avatar name={getValue()} />
                <span className="text-gray-300 text-[13px]">{getValue()}</span>
            </div>
        ),
    },
    {
        accessorKey: 'agent',
        header: 'Agent',
        cell: ({ getValue }) => {
            const agent = getValue();
            return agent ? (
                <div className="flex items-center gap-2">
                    <Avatar name={agent} size={24} />
                    <span className="text-gray-300 text-[13px]">{agent}</span>
                </div>
            ) : (
                <button className="flex items-center gap-1 text-[#6366f1] text-[13px] bg-transparent border-none cursor-pointer p-0 font-[inherit] hover:underline">
                    <span className="text-base leading-none">+</span> Assign agent
                </button>
            );
        },
    },
    {
        accessorKey: 'date',
        header: 'Date Submitted',
        cell: ({ getValue }) => (
            <span className="text-gray-400 text-[13px]">{getValue()}</span>
        ),
    },
    {
        accessorKey: 'last',
        header: 'Last Updated',
        cell: ({ getValue }) => (
            <span className="text-gray-400 text-[13px]">{getValue()}</span>
        ),
    },
];

// Main table
export default function Table({ search, prioritySelected, isHome }) {
    const [sorting, setSorting] = useState([]);

    const filteredData = useMemo(() => {
        if (!prioritySelected) return defaultData;
        return defaultData.filter(d => d.priority === prioritySelected);
    }, [prioritySelected]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting, globalFilter: search },
        globalFilterFn: 'includesString',
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 6 } },
    });

    const rows = table.getRowModel().rows;

    return (
        <div>

            {!isHome &&
                <div className="mb-5 flex justify-end pr-5">
                    <span className="text-xs text-gray-500">
                        {table.getFilteredRowModel().rows.length} tickets
                    </span>
                </div>
            }

            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[700px]">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id} className="border-b border-[#2a2d34]">
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 cursor-pointer select-none whitespace-nowrap hover:text-white transition-colors"
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        <SortIcon sorted={header.column.getIsSorted()} />
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody >
                        {rows.length !== 0 ? (

                            rows.map((row, i) => (
                                <tr
                                    key={row.id}
                                    className={`border-b border-[#1e2130] cursor-pointer transition-colors duration-150 hover:bg-[#1e2130]
                                    ${i % 2 === 0 ? 'bg-transparent' : 'bg-[#1a1d27]'}`}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-4 py-3">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )
                            :
                            (
                                <tr className=''>
                                    <td colSpan={columns.length} className="text-center py-10 text-gray-500">
                                        No tickets found.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>

            {!isHome &&
                <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
                    <span className="text-xs text-gray-500">
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <div className="flex gap-1.5">
                        {[
                            { label: '«', action: () => table.setPageIndex(0), disabled: !table.getCanPreviousPage() },
                            { label: '‹', action: () => table.previousPage(), disabled: !table.getCanPreviousPage() },
                            { label: '›', action: () => table.nextPage(), disabled: !table.getCanNextPage() },
                            { label: '»', action: () => table.setPageIndex(table.getPageCount() - 1), disabled: !table.getCanNextPage() },
                        ].map(({ label, action, disabled }) => (
                            <button
                                key={label}
                                onClick={action}
                                disabled={disabled}
                                className={`w-7 h-7 rounded-md bg-[#25282C] border border-[#2a2d34] text-sm font-[inherit]
                            ${disabled ? 'text-gray-600 cursor-not-allowed' : 'text-gray-300 cursor-pointer hover:bg-[#2e2f3e]'}`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>
            }
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