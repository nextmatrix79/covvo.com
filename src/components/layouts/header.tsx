export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="relative w-64">
                    {/* Search input or other elements */}
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notification button with aria-label */}
                    <button
                        className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Notifications"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </button>

                    {/* User profile section */}
                    <div className="flex items-center">
                        <div className="mr-3 text-right">
                            <p className="text-sm font-medium text-gray-700">Admin User</p>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                        <div
                            className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                            aria-label="User profile"
                        >
                            <span className="text-blue-600 font-medium">AU</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}