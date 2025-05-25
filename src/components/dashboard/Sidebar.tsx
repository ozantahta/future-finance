import { useEffect } from "react";
import { LayoutDashboard, PieChart, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  onToggle: (isOpen: boolean) => void;
  isOpen: boolean;
}

export const Sidebar = ({ onToggle, isOpen }: SidebarProps) => {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'b') {
        event.preventDefault();
        onToggle(!isOpen);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, onToggle]);

  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Portfolio', icon: PieChart, href: '/portfolio' },
    { name: 'Market', icon: TrendingUp, href: '/market' },
    // { name: 'Prediction', icon: TrendingDown, href: '/prediction' },
    // { name: 'Alerts', icon: ArrowUp, href: '/alerts' },
    // { name: 'Settings', icon: ArrowDown, href: '/settings' }
  ];


  const getTitle = () => {
    if (pathname === '/') {
      return 'Dashboard';
    } else if (pathname === '/portfolio') {
      return 'Portfolio';
    } else if (pathname === '/market') {
      return 'Market';
    }
    // } else if (pathname === '/prediction') {
    //   return 'Prediction';
    // } else if (pathname === '/alerts') {
    //   return 'Alerts';
    // } 
  }

  return (
    <div 
      className={`${isOpen ? 'w-72' : 'w-16'} h-screen transition-all duration-500 ease-in-out bg-gray-900/80 backdrop-blur-lg border-r border-cyan-400/20 shadow-2xl relative overflow-hidden group`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5"></div>
      
      <div className={`${isOpen ? 'p-6' : 'p-3'} relative z-10 transition-all duration-500 ease-in-out`}>
        <div className="flex items-center space-x-3 mb-8">
          <div className={`w-10 h-10 flex-shrink-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center shadow-lg glow-effect transition-all duration-500 ease-in-out ${isOpen ? 'scale-100' : 'scale-90'}`}>
            <span className="text-white font-bold text-sm crypto-accent">CF</span>
          </div>
          <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
            <h1 className="font-bold text-xl text-white crypto-heading">CryptoFinance</h1>
            <p className="text-sm text-cyan-400">{getTitle()}</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center ${isOpen ? 'justify-start space-x-3' : 'justify-center'} p-3 rounded-lg cursor-pointer transition-all duration-500 ease-in-out ${
                  isActive 
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-400 shadow-lg glow-effect border border-cyan-400/30' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400 hover:border hover:border-cyan-400/20'
                }`}
              >
                <Icon size={20} className="flex-shrink-0 transition-transform duration-500 ease-in-out" />
                <span 
                  className={`font-medium transition-all duration-500 ease-in-out ${
                    isOpen 
                      ? 'opacity-100 w-auto translate-x-0' 
                      : 'opacity-0 w-0 -translate-x-4 overflow-hidden'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Toggle Button */}
      <button
        onClick={() => onToggle(!isOpen)}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-cyan-400 border border-cyan-400/30 transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-cyan-400/20 group-hover:scale-110"
        title="Toggle Sidebar (Ctrl + B)"
      >
        <div className="transition-transform duration-500 ease-in-out transform">
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          )}
        </div>
      </button>
    </div>
  );
}; 