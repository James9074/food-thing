import { Grid, Heading, Text } from "@radix-ui/themes";
import { PriceAlertCard } from "../components/price-alert-card";
import { PrepList } from "../components/prep-list";
import { OrdersList } from "../components/orders-list";

const mockAlerts = [
  {
    product: "Organic Kale (10 lb)",
    supplier: "Chef Store",
    previousPrice: 19.5,
    currentPrice: 29.75,
    unit: "case"
  },
  {
    product: "Dairy-Free Alfredo Sauce",
    supplier: "Aldi",
    previousPrice: 12.75,
    currentPrice: 8.1,
    unit: "2x64 oz"
  }
];

const mockPrep = [
  { recipe: "Lemon Herb Chicken", portions: 120, station: "Hot Line", due: "10:00 AM" },
  { recipe: "Roasted Veggie Bowls", portions: 95, station: "Garde Manger", due: "11:00 AM" },
  { recipe: "Chocolate Protein Muffins", portions: 60, station: "Bake Shop", due: "1:00 PM" }
];

const mockOrders = [
  { supplier: "Sam's Club", status: "pending" as const, eta: "Tomorrow", total: 742.1 },
  { supplier: "US Foods", status: "submitted" as const, eta: "Friday", total: 1289.45 },
  { supplier: "Costco", status: "received" as const, eta: "Received", total: 390.0 }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <Heading size="6">Daily Operations</Heading>
        <Text color="gray">Real-time insight into Jessica's production pipeline and purchasing.</Text>
      </div>
      <Grid columns={{ initial: "1", md: "2" }} gap="4">
        {mockAlerts.map((alert) => (
          <PriceAlertCard key={alert.product} alert={alert} />
        ))}
      </Grid>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <PrepList items={mockPrep} />
        <OrdersList orders={mockOrders} />
      </Grid>
    </div>
  );
}
