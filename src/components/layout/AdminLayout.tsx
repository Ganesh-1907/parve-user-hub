import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from "@/assets/logo-parve.png";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NavContent = () => (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            location.pathname === item.path
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent"
          }`}
        >
          <item.icon className="h-5 w-5" />
          {item.name}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        <div className="p-6">
          <img src={logo} alt="PARVE Admin" className="h-8 invert" />
          <p className="text-xs text-sidebar-foreground/60 mt-1">Admin Dashboard</p>
        </div>
        <div className="flex-1 px-4">
          <NavContent />
        </div>
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-5 w-5" />
            Exit Admin
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b">
          <img src={logo} alt="PARVE" className="h-8" />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-sidebar p-0">
              <div className="p-6">
                <img src={logo} alt="PARVE" className="h-8 invert" />
              </div>
              <div className="px-4">
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-6 md:p-8 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
