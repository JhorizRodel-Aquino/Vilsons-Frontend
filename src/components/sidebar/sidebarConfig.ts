export type NavItem = {
    label: string;
    iconName?: string;
    path?: string;
    children?: NavItem[];
}

export const sidebarItems: NavItem[] = [
    {
        label: 'Dashboard',
        iconName: 'dashboard', 
        path: '/dashboard'
    },
    {
        label: 'Job Orders',
        iconName: 'job-orders',
        path: '/job-orders'
    },
    {
        label: 'Other Income',
        iconName: 'other-income',
        path: '/other-income'
    },
    {
        label: 'Transactions',
        iconName: 'transactions',
        path: '/transactions'
    },
    {
        label: 'Finances',
        iconName: 'finances',
        children: [
            { 
                label: 'Revenue and Profit', 
                path: '/revenue-and-profit' 
            },
            { 
                label: 'Operational Expenses', 
                path: '/operational-expenses'  
            },
            { 
                label: 'Overhead Expenses', 
                path: '/overhead-expenses'  

            }
        ]
    },
    {
        label: 'Trucks',
        iconName: 'truck',
        path: '/trucks' 
    },
    {
        label: 'Activity Logs',
        iconName: 'activity-logs',
        path: '/activity-logs' 
    },
    {
        label: 'Users',
        iconName: 'users',
        children: [
            { 
                label: 'All Users', 
                path: '/all-users' 
            },
            { 
                label: 'Roles and Permissions', 
                path: '/rles-and-permissions'  
            },
            { 
                label: 'My Profile', 
                path: '/my-profile'  

            }
        ]
    },
];
