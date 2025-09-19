import SidebarItem from './SidebarItem';
import { sidebarItems } from './sidebarConfig';


type NavItem = {
    label: string,
    iconFilename?: string,
    children?: NavItem[]
}

function Sidebar() {
    const renderSidebarItems = (navs: NavItem[], depth = 0) => {
        return navs.map((nav, i) => 
            nav.children && nav.children.length > 0
            ? (
                <li key={i}>
                    <button className='w-full'>
                        <SidebarItem 
                            label={nav.label} 
                            iconFilename={depth > 0 ? undefined : nav.iconFilename} 
                            depth={depth} 
                            isGroup={true} 
                        />
                    </button>

                    <ul>
                        {renderSidebarItems(nav.children, depth + 1)}
                    </ul>
                </li>
            )
            : (
                <li key={i}>
                    <a href=''>
                        <SidebarItem 
                            label={nav.label} 
                            iconFilename={depth > 0 ? undefined : nav.iconFilename} 
                            depth={depth} />
                    </a>
                </li>
            )
        )
    }
    
    return (
        <aside className='bg-light py-3 px-4 w-96 border-r h-full overflow-y-auto'>
            <div className='grid gap-[33px]'>
                <img className='logo' src='logo.webp' alt='' />
                <nav className='grid gap-2'>
                    <ul>
                        {renderSidebarItems(sidebarItems)}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
