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
        permissions: [
            'view_admin_dashboard_revenue', 
            'view_admin_dashboard_profit', 
            'view_admin_dashboard_expenses', 
            'view_admin_dashboard_job_orders', 
            'view_admin_dashboard_customer_balance',
            'view_contractor_dashboard_balance', 
            'view_customer_dashboard_balance',
            'view_contractor_dashboard_job_orders',
            'view_customer_dashboard_job_orders'
        ]
    },
    {
        label: 'Job Orders',
        iconName: 'job-orders',
        path: '/job-orders',
        permissions: ['view_job_orders']
    },
    {
        label: 'Assigned Orders',
        iconName: 'job-orders',
        path: '/assigned-orders',
        permissions: ['view_contractor_assigned_job_orders']
    },
    {
        label: 'My Orders',
        iconName: 'job-orders',
        path: '/my-orders',
        permissions: ['view_customer_own_job_orders']
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
        label: 'Payroll',
        iconName: 'transactions',
        path: '/payroll',
        permissions: ['view_contractor_finances']
    },
    {
        label: 'My Transactions',
        iconName: 'transactions',
        path: '/my-transactions',
        permissions: ['view_customer_own_transactions']
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
        iconName: 'branches',
        path: '/branches',
        permissions: ['view_branches']
    },
    {
        label: 'Trucks',
        iconName: 'trucks',
        path: '/trucks' ,
        permissions: ['view_trucks']
    },
    {
        label: 'My Trucks',
        iconName: 'trucks',
        path: '/my-trucks' ,
        permissions: ['view_customer_own_trucks']
    },
    {
        label: 'Approval Logs',
        iconName: 'approval-logs',
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
        iconName: 'multi-users',
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
