import logo from '../../assets/logo-up.png'

import DashboardIcon from '@mui/icons-material/Dashboard';
import BugReportIcon from '@mui/icons-material/BugReport';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import CategoryIcon from '@mui/icons-material/Category';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import LogoutIcon from '@mui/icons-material/Logout';

const NavOpts = [
    { icon: DashboardIcon, name: 'Dashboard' },
    { icon: BugReportIcon, name: 'Tickets' },
    { icon: SupervisorAccountIcon, name: 'Customers' },
    { icon: CategoryIcon, name: 'Categories' },
    { icon: AdminPanelSettingsIcon, name: 'Admin' },
]

export default function Navbar() {
    return (
        <nav className='h-screen w-60  bg-[#1c1c25]  py-5 flex justify-start  flex-col '>
            <div className="mb-7 px-5">
                <a href="/">
                    <img src={logo} className='h-13 w-full' />
                </a>
            </div>
            <div className="h-full flex flex-col justify-between text-gray-400 text-[0.87rem] font-normal">
                <ul className="">
                    {NavOpts.map((item, i) => {
                        const Icon = item.icon;

                        return (

                            <li key={i} className='flex flex-row items-center py-4  cursor-pointer px-5 hover:bg-[#2a2a35] hover:text-white'>
                                <Icon className='mr-3 ' sx={{ fontSize: 21 }} />
                                {item.name}
                            </li>
                        )
                    }
                    )}
                </ul>
                <div className="px-5 py-4 cursor-pointer hover:bg-[#2a2a35] hover:text-white">
                    <LogoutIcon className='mr-3' sx={{ fontSize: 20 }} />
                    Logout
                </div>
            </div>
        </nav>
    );
}







