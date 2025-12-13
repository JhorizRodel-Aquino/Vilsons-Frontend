export type NavItem = {
    label: string;
    iconName?: string;
    path?: string;
    children?: NavItem[];
    permissions: string[];
}

export const sidebarItems: NavItem[] = [
    {
        label: 'Dashboard',
        iconName: 'dashboard', 
        path: '/dashboard',
        permissions: ['view_admin_dashboard_revenue', 'view_admin_dashboard_profit', 'view_admin_dashboard_expenses', 'view_admin_dashboard_job_orders', 'view_admin_dashboard_customer_balance']
    },
    {
        label: 'Job Orders',
        iconName: 'job-orders',
        path: '/job-orders',
        permissions: ['view_job_orders']
    },
    {
        label: 'Other Income',
        iconName: 'other-income',
        path: '/other-income',
        permissions: ['view_other_incomes']
    },
    {
        label: 'Transactions',
        iconName: 'transactions',
        path: '/transactions',
        permissions: ['view_transactions']
    },
    {
        label: 'Finances',
        iconName: 'finances',
        permissions: ['view_revenue_profit', 'view_materials', 'view_equipments', 'view_labors', 'view_overheads'],
        children: [
            { 
                label: 'Revenue and Profit', 
                path: '/revenue-and-profit', 
                permissions: ['view_revenue_profit']
            },
            { 
                label: 'Operational Expenses', 
                path: '/operational-expenses',  
                permissions: ['view_materials', 'view_equipments', 'view_labors']
            },
            { 
                label: 'Overhead Expenses', 
                path: '/overhead-expenses',
                permissions: ['view_overheads']

            }
        ]
    },
    {
        label: 'Branches',
        iconName: 'truck',
        path: '/branches',
        permissions: ['view_branches']
    },
    {
        label: 'Trucks',
        iconName: 'truck',
        path: '/trucks' ,
        permissions: ['view_trucks']
    },
    {
        label: 'Approval Logs',
        iconName: 'activity-logs',
        path: '/approval-logs',
        permissions: ['view_approval_logs'] 
    },
    {
        label: 'Activity Logs',
        iconName: 'activity-logs',
        path: '/activity-logs' ,
        permissions: ['view_activity_logs']
    },
    {
        label: 'User Management',
        iconName: 'users',
        permissions: ['view_users', 'view_roles_permissions'],
        children: [
            { 
                label: 'Users', 
                path: '/users', 
                permissions: ['view_users']
            },
            { 
                label: 'Roles and Permissions', 
                path: '/roles-and-permissions'  ,
                permissions: ['view_role_permissions']
            },

        ]
    },
    {
        label: 'My Account',
        iconName: 'users',            
        path: '/my-account',  
        permissions: ['view_own_profile']
    },
];
