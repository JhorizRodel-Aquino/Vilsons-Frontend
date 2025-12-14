import { NavLink } from 'react-router';
import SidebarGroup from './SidebarGroup';
import SidebarLink from './SidebarLink';
import { sidebarItems } from './sidebarConfig';
import SidebarItem from './SidebarItem';
import type { NavItem } from './sidebarConfig';
import logo from '../../assets/logo.webp'
import { hasPermissions } from '../../services/permissionService';


function Sidebar({ openSidebar }: { openSidebar: boolean }) {
    const renderSidebarItems = (navs: NavItem[], depth = 0) => {
        return (
            navs.map((nav, i) => (
                hasPermissions(nav.permissions) && (
                    nav.children && nav.children.length > 0
                        ? (
                            <SidebarItem key={i}>
                                <SidebarGroup label={nav.label} iconName={depth > 0 ? undefined : nav.iconName} depth={depth} >
                                    {renderSidebarItems(nav.children, depth + 1)}
                                </SidebarGroup>
                            </SidebarItem>
                        ) : (
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
                )
            ))
        )
    }

    return (
        <aside
            className={` bg-light border-r h-full overflow-y-auto thin-scrollbar z-30 transition-[width,padding] duration-300 ease-in-out ${openSidebar ? "w-96 px-4" : "w-0 px-0 overflow-hidden"}`}
        >
            <div className='grid gap-2'>
                <div className='logo sticky top-0 bg-light py-3 flex justify-start z-10'>
                    <NavLink to='/' >
                        <img src={logo} alt='' />
                    </NavLink>
                </div>
                <nav className='grid gap-2 py-3'>
                    <ul>
                        {renderSidebarItems(sidebarItems)}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
