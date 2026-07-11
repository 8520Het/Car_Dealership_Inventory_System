import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, Car, PlusCircle, Settings } from 'lucide-react';

const Sidebar = () => {
    const { role } = useSelector((state) => state.auth);
    const isAdmin = role === 'ROLE_ADMIN';

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Inventory', path: '/dashboard/inventory', icon: Car },
    ];

    if (isAdmin) {
        navItems.push({ name: 'Add Vehicle', path: '/dashboard/inventory/new', icon: PlusCircle });
        navItems.push({ name: 'Settings', path: '/dashboard/settings', icon: Settings });
    }

    return (
        <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col h-full shadow-sm">
            <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">
                    Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/dashboard'}
                        className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                isActive
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                        {item.name}
                    </NavLink>
                ))}
            </div>
            
            <div className="p-4 border-t border-slate-200">
                <div className="bg-slate-50 rounded-lg p-3 text-sm">
                    <p className="text-slate-500 font-medium text-xs">Role</p>
                    <p className="text-slate-800 font-semibold">{isAdmin ? 'Administrator' : 'Customer'}</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
