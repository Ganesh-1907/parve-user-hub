import { Link, Navigate } from "react-router-dom";
import { User, Package, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useStore";

const Profile = () => {
  const { isLoggedIn, user, logout } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container max-w-2xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Profile</h1>

        <div className="bg-card rounded-2xl p-6 md:p-8 shadow-soft mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Phone</label>
              <p className="font-medium">{user?.phone}</p>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Address</label>
              <p className="font-medium">{user?.address}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/orders" className="bg-card rounded-xl p-6 shadow-soft hover-lift flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">My Orders</h3>
              <p className="text-sm text-muted-foreground">View order history</p>
            </div>
          </Link>

          <Link to="/wishlist" className="bg-card rounded-xl p-6 shadow-soft hover-lift flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Wishlist</h3>
              <p className="text-sm text-muted-foreground">Saved items</p>
            </div>
          </Link>
        </div>

        <Button
          variant="outline"
          className="w-full mt-6 text-destructive hover:text-destructive gap-2"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
