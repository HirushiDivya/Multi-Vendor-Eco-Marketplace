import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 fixed">
      <h1 className="text-2xl font-bold mb-10 text-green-400">Eco Market</h1>
      <nav className="flex-1 space-y-2">
        <NavItem icon={<LayoutDashboard size={20}/>} label="Dashboard" active />
        <NavItem icon={<ShoppingBag size={20}/>} label="Products" />
        <NavItem icon={<Users size={20}/>} label="Users" />
        <NavItem icon={<Settings size={20}/>} label="Settings" />
      </nav>
      <div className="border-t border-slate-700 pt-4">
        <NavItem icon={<LogOut size={20}/>} label="Logout" />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${active ? 'bg-green-600' : 'hover:bg-slate-800'}`}>
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

export default Sidebar;