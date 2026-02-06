import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orders } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  out_for_delivery: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const AdminOrders = () => {
  const handleStatusChange = (orderId: string, status: string) => {
    toast({ title: "Status updated", description: `Order ${orderId} is now ${status}` });
  };

  return (
    <div>
      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-6 text-gray-800">Orders</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Order ID</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Customer</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Amount</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Status</th>
                <th className="text-left p-4 font-semibold text-gray-700 text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">{order.id}</td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium text-gray-800">{order.customerName}</p>
                      <p className="text-sm text-gray-600">{order.customerEmail}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-800 font-medium">₹{order.totalAmount}</td>
                  <td className="p-4">
                    <Select defaultValue={order.status} onValueChange={(v) => handleStatusChange(order.id, v)}>
                      <SelectTrigger className="w-40 border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
