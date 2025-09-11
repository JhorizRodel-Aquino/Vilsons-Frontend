export const navItems = [
    {
        name: 'Dashboard',
        iconFilename: 'dashboard', 
    },
    {
        name: 'Other Income',
        iconFilename: 'other-income'
    },
    {
        name: 'Transactions',
        iconFilename: 'transactions'
    },
    {
        name: 'Finances',
        iconFilename: 'finances',
        children: [
            { name: 'Revenue and Profit' },
            { name: 'Operational Expenses' },
            { name: 'Overhead Expenses' }
        ]
    },
    {
        name: 'Transactions',
        iconFilename: 'transactions'
    },
];
