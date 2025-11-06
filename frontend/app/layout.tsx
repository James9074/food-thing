import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { DashboardIcon, MixIcon, RocketIcon, ArchiveIcon, FileTextIcon, ComponentInstanceIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "FoodFlow - Smart Kitchen Management",
  description: "Professional restaurant food management system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme radius="large" scaling="95%" accentColor="violet">
          <div className="main-container">
            <aside className="sidebar">
              <div className="sidebar-header">
                <div className="sidebar-logo">F</div>
                <div className="sidebar-title">FoodFlow</div>
              </div>
              <nav>
                <Link className="nav-link" href="/dashboard">
                  <DashboardIcon className="nav-icon" />
                  <span>Dashboard</span>
                </Link>
                <Link className="nav-link" href="/recipes">
                  <MixIcon className="nav-icon" />
                  <span>Recipes</span>
                </Link>
                <Link className="nav-link" href="/ingredients">
                  <ComponentInstanceIcon className="nav-icon" />
                  <span>Ingredients</span>
                </Link>
                <Link className="nav-link" href="/suppliers">
                  <RocketIcon className="nav-icon" />
                  <span>Suppliers</span>
                </Link>
                <Link className="nav-link" href="/inventory">
                  <ArchiveIcon className="nav-icon" />
                  <span>Inventory</span>
                </Link>
                <Link className="nav-link" href="/orders">
                  <FileTextIcon className="nav-icon" />
                  <span>Orders</span>
                </Link>
              </nav>
            </aside>
            <main className="content">{children}</main>
          </div>
        </Theme>
      </body>
    </html>
  );
}
