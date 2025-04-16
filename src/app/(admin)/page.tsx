import { Card } from '@/components/ui/card'

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Total Users" value="1,234" change="+12%" />
        <Card title="Open Claims" value="56" change="-5%" />
        <Card title="Messages" value="24" change="+3%" />
        <Card title="Storage Used" value="78%" change="+15%" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          {/* Activity chart/table would go here */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          {/* Quick actions would go here */}
        </div>
      </div>
    </div>
  )
}