import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export const metadata: Metadata = {
  title: "Food Service Manager",
  description: "Restaurant food management system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme radius="large" scaling="95%">
          <div className="main-container">
            <aside className="sidebar">
              <h1 className="text-2xl font-semibold mb-6">Food Manager</h1>
              <nav className="space-y-3">
                <Link className="block text-slate-600 hover:text-slate-900" href="/dashboard">
                  Dashboard
                </Link>
                <Link className="block text-slate-600 hover:text-slate-900" href="/recipes">
                  Recipes
                </Link>
                <Link className="block text-slate-600 hover:text-slate-900" href="/suppliers">
                  Suppliers
                </Link>
                <Link className="block text-slate-600 hover:text-slate-900" href="/inventory">
                  Inventory
                </Link>
                <Link className="block text-slate-600 hover:text-slate-900" href="/orders">
                  Orders
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
