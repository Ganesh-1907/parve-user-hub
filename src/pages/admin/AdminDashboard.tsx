import { Package, DollarSign, Truck, Clock, XCircle } from "lucide-react";
import { orders } from "@/data/mockData";

const stats = [
  { label: "Total Orders", value: orders.length, icon: Package, color: "bg-blue-500" },
  { label: "Total Revenue", value: `₹${orders.reduce((a, o) => a + o.totalAmount, 0).toLocaleString()}`, icon: DollarSign, color: "bg-green-500" },
  { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length, icon: Truck, color: "bg-emerald-500" },
  { label: "Pending", value: orders.filter((o) => o.status === "pending").length, icon: Clock, color: "bg-yellow-500" },
  { label: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, icon: XCircle, color: "bg-red-500" },
];

const AdminDashboard = () => {
  const statusData = [
    { name: "Delivered", value: orders.filter((o) => o.status === "delivered").length, color: "#22c55e" },
    { name: "Processing", value: orders.filter((o) => o.status === "processing").length, color: "#3b82f6" },
    { name: "Pending", value: orders.filter((o) => o.status === "pending").length, color: "#eab308" },
    { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, color: "#ef4444" },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 shadow-soft">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Order Status Chart */}
      <div className="bg-card rounded-xl p-6 shadow-soft">
        <h2 className="font-serif text-xl font-semibold mb-4">Order Status Distribution</h2>
        <div className="flex flex-wrap gap-4">
          {statusData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
              <span className="text-sm">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
