'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

const data = [
  { name: 'Th1', users: 400, sales: 2400 },
  { name: 'Th2', users: 300, sales: 2210 },
  { name: 'Th3', users: 500, sales: 2290 },
  { name: 'Th4', users: 278, sales: 2000 },
  { name: 'Th5', users: 189, sales: 2181 },
];

const pieData = [
  { name: 'Sản phẩm A', value: 400 },
  { name: 'Sản phẩm B', value: 300 },
  { name: 'Sản phẩm C', value: 300 },
  { name: 'Sản phẩm D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  return (
    <div className="pt-24 pl-64 pr-6 pb-6 min-h-screen bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Trang Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-700 font-semibold mb-2">👥 Người dùng</h2>
          <p className="text-3xl font-bold text-blue-500">+1,200</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-700 font-semibold mb-2">🛒 Đơn hàng</h2>
          <p className="text-3xl font-bold text-green-500">+530</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-gray-700 font-semibold mb-2">💰 Doanh thu</h2>
          <p className="text-3xl font-bold text-orange-500">58 triệu</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Thống kê người dùng theo tháng</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Doanh số theo tháng</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Tỉ lệ bán các loại sản phẩm</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
