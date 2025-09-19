export const sidebarItems = [
    {
        label: 'Dashboard',
        iconFilename: 'dashboard', 
    },
    {
        label: 'Other Income',
        iconFilename: 'other-income'
    },
    {
        label: 'Transactions',
        iconFilename: 'transactions'
    },
    {
        label: 'Finances',
        iconFilename: 'finances',
        children: [
            { label: 'Revenue and Profit' },
            { label: 'Operational Expenses' },
            { label: 'Overhead Expenses' }
        ]
    },
    {
        label: 'Transactions',
        iconFilename: 'transactions'
    },
];
