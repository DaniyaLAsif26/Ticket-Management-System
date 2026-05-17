import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import SearchIcon from '@mui/icons-material/Search';

export default function Filters({ showFilter, setShowFilter, dropDown , search, setSearch }) {

    const lineStyles = 'h-5 bg-gray-500 w-px mx-5';

    return (
        <div className="px-3 flex flex-row justify-start items-center mb-7">

            <div className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden
                    ${showFilter
                    ? 'opacity-100 max-w-169 pointer-events-auto'
                    : 'opacity-0 max-w-0 pointer-events-none'
                }`}
            >

                <div className="flex items-center bg-[#25282C] px-2 rounded-xl h-8 w-40 border-2 border-[#5e5e5e]">
                    <SearchIcon sx={{ fontSize: 18, color: 'gray' }} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent text-white ml-1 text-[0.95rem] w-full focus:outline-none "
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <span className={lineStyles}></span>

                <div className="flex flex-row gap-3">
                    {dropDown.map((items, i) => (
                        <DropdownMenu.Root key={i} className="border-2 border-[#5e5e5e]">
                            <DropdownMenu.Trigger className="flex items-center gap-2 px-3 py-1.5 bg-[#25282C] border border-[#5e5e5e] rounded-lg text-sm text-white outline-none hover:bg-[#2e2f3e] cursor-pointer whitespace-nowrap">
                                {items.type}
                                <span className="text-gray-400 text-xs">▾</span>
                            </DropdownMenu.Trigger>

                            <DropdownMenu.Portal>
                                <DropdownMenu.Content
                                    sideOffset={6}
                                    className="bg-[#21222d] border rounded-lg p-1 min-w-40 shadow-lg z-50
                                     border-[#5e5e5e]"
                                >
                                    {items.options.map((item, j) => (
                                        <div key={item}>
                                            {j === items.options.length - 1 &&
                                                <DropdownMenu.Separator className="h-px bg-[#2a2d34] my-1" />
                                            }
                                            <DropdownMenu.Item
                                                className={`flex items-center px-3 py-2 text-sm rounded-md outline-none cursor-pointer hover:bg-[#2e2f3e]
                                                        ${item === items.typeSelected ? 'text-[#6366f1] font-medium bg-[#2e2f3e]' : 'text-white'}`}
                                                onSelect={() => items.setTypeSelected(item === items.typeSelected ? null : item)}
                                            >
                                                {item}
                                            </DropdownMenu.Item>
                                        </div>
                                    ))}
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                    ))}
                </div>

                <span className={lineStyles}></span>
            </div>

            <div
                className="underline cursor-pointer text-sm text-gray-400 hover:text-white transition-colors duration-200 whitespace-nowrap"
                onClick={() => setShowFilter(prev => !prev)}
            >
                {showFilter ? 'Hide filters' : 'Show filters'}
            </div>

        </div>

    )
}