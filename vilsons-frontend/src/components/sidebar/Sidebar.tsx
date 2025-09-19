import { NavLink } from 'react-router';
import SidebarGroup from './SidebarGroup';
import SidebarLink from './SidebarLink';
import { sidebarItems } from './sidebarConfig';
import SidebarItem from './SidebarItem';
import type { NavItem } from './sidebarConfig';


function Sidebar() {
    const renderSidebarItems = (navs: NavItem[], depth = 0) => {
        return (
            navs.map((nav, i) => {
                if (nav.children && nav.children.length > 0) {
                    return (
                        <SidebarItem key={i}>
                            <SidebarGroup label={nav.label} iconName={depth > 0 ? undefined : nav.iconName} depth={depth} >
                                {renderSidebarItems(nav.children, depth + 1)}
                            </SidebarGroup>
                        </SidebarItem>
                    )
                }

                return (
                    <SidebarItem key={i}>
                        {nav.path
                            ? (
                                <NavLink
                                    to={nav.path}
                                    className={({ isActive }) => (nav.path === sidebarItems[0].path && window.location.pathname === '/') || isActive ? 'active' : ''}
                                >
                                    {({ isActive }) => (
                                        <SidebarLink
                                            label={nav.label}
                                            iconName={depth > 0 ? undefined : nav.iconName}
                                            depth={depth}
                                            isSelected={(nav.path === sidebarItems[0].path && window.location.pathname === '/') || isActive}
                                        />
                                    )}
                                </NavLink>
                            ) : (
                                <SidebarLink label={nav.label} iconName={depth > 0 ? undefined : nav.iconName} depth={depth} />
                            )
                        }
                    </SidebarItem>
                )
            })
        )
    }

    return (
        <aside className='bg-light py-3 px-4 w-96 border-r h-full overflow-y-auto'>
            <div className='grid gap-[33px]'>
                <NavLink to='/' >
                    <img className='logo' src='logo.webp' alt='' />
                </NavLink>
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
