import { Link, Navigate } from "react-router-dom";
import { Package, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/useStore";
import { orders } from "@/data/mockData";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-blue-100 text-blue-800",
  out_for_delivery: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusLabels = {
  pending: "Pending",
  processing: "Processing",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const Orders = () => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Mock orders for the logged in user
  const userOrders = orders.slice(0, 2);

  if (userOrders.length === 0) {
    return (
      <div className="container py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-serif text-3xl font-bold mb-4">No Orders Yet</h1>
        <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
        <Link to="/products">
          <Badge className="cursor-pointer">Browse Products</Badge>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container max-w-3xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-card rounded-xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge className={statusColors[order.status]}>
                  {statusLabels[order.status]}
                </Badge>
              </div>

              <div className="space-y-3 mb-4">
                {order.products.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="font-semibold">Total: ₹{order.totalAmount}</p>
                <Link
                  to={`/orders/${order.id}`}
                  className="text-primary text-sm font-medium flex items-center gap-1 hover:underline"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
