import { Grid, Heading, Text, Card, Flex } from "@radix-ui/themes";
import { PriceAlertCard } from "../components/price-alert-card";
import { PrepList } from "../components/prep-list";
import { OrdersList } from "../components/orders-list";
import { BarChartIcon, DashboardIcon, PersonIcon, ActivityLogIcon } from "@radix-ui/react-icons";

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

const stats = [
  { label: "Active Suppliers", value: "12", change: "+2 this month", icon: PersonIcon, color: "#667eea" },
  { label: "Total Recipes", value: "87", change: "+5 this week", icon: DashboardIcon, color: "#f093fb" },
  { label: "Monthly Spend", value: "$24.5K", change: "-8% vs last month", icon: BarChartIcon, color: "#48bb78" },
  { label: "Cost Savings", value: "$3.2K", change: "from price alerts", icon: ActivityLogIcon, color: "#ed8936" }
];

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="page-header">
        <div className="page-title">Dashboard</div>
        <div className="page-subtitle">
          Welcome back! Here's what's happening with your kitchen today.
        </div>
      </div>

      {/* Stats Grid */}
      <Grid columns={{ initial: "1", sm: "2", md: "4" }} gap="4">
        {stats.map((stat, idx) => (
          <Card
            key={stat.label}
            className="stat-card"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <Flex direction="column" gap="3">
              <Flex justify="between" align="start">
                <Text size="2" color="gray" weight="medium">
                  {stat.label}
                </Text>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}25 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <stat.icon style={{ width: 18, height: 18, color: stat.color }} />
                </div>
              </Flex>
              <div>
                <Heading size="6" style={{ marginBottom: "0.25rem" }}>
                  {stat.value}
                </Heading>
                <Text size="1" color="gray">
                  {stat.change}
                </Text>
              </div>
            </Flex>
          </Card>
        ))}
      </Grid>

      {/* Price Alerts Section */}
      <div>
        <div style={{ marginBottom: "1rem" }}>
          <Heading size="5" style={{ marginBottom: "0.25rem" }}>Price Alerts</Heading>
          <Text size="2" color="gray">Monitor significant price changes from your suppliers</Text>
        </div>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          {mockAlerts.map((alert) => (
            <PriceAlertCard key={alert.product} alert={alert} />
          ))}
        </Grid>
      </div>

      {/* Operations Section */}
      <Grid columns={{ initial: "1", md: "2" }} gap="4">
        <PrepList items={mockPrep} />
        <OrdersList orders={mockOrders} />
      </Grid>
    </div>
  );
}
