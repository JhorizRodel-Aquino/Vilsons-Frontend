import SidebarNav from './SidebarNav';
import { navItems } from './sidebarConfig';


type NavItem = {
    name: string,
    iconFilename?: string,
    children?: NavItem[]
}

function Sidebar() {
    const renderNavItems = (navs: NavItem[], depth = 0) => {
        return navs.map((nav, i) => 
            nav.children && nav.children.length > 0
            ? (
                <li key={i}>
                    <button className='w-full'>
                        <SidebarNav 
                            navName={nav.name} 
                            iconFilename={depth > 0 ? undefined : nav.iconFilename} 
                            depth={depth} 
                            isGroup={true} 
                        />
                    </button>

                    <ul>
                        {renderNavItems(nav.children, depth + 1)}
                    </ul>
                </li>
            )
            : (
                <li key={i}>
                    <a href=''>
                        <SidebarNav 
                            navName={nav.name} 
                            iconFilename={depth > 0 ? undefined : nav.iconFilename} 
                            depth={depth} />
                    </a>
                </li>
            )
        )
    }
    
    return (
        <aside className='bg-red-50 py-3 px-4 w-96 border-r h-full overflow-y-auto'>
            <div className='grid gap-[33px]'>
                <img className='logo' src='logo.webp' alt='' />
                <nav className='grid gap-2'>
                    <ul>
                        {renderNavItems(navItems)}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
