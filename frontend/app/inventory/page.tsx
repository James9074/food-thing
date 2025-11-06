import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { ClockIcon, CheckCircledIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

const inventory = [
  { name: "Spinach", onHand: 24, par: 40, unit: "lb", expires: "2 days", status: "warning" },
  { name: "Almond Milk", onHand: 12, par: 20, unit: "case", expires: "6 days", status: "ok" },
  { name: "Chicken Breast", onHand: 35, par: 30, unit: "lb", expires: "1 day", status: "critical" }
];

const statusConfig = {
  ok: { color: "green" as const, label: "In Stock", icon: CheckCircledIcon },
  warning: { color: "amber" as const, label: "Low Stock", icon: ExclamationTriangleIcon },
  critical: { color: "red" as const, label: "Critical", icon: ExclamationTriangleIcon }
};

export default function InventoryPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="page-header">
        <div className="page-title">Inventory Health</div>
        <div className="page-subtitle">
          Track stock levels and expiration dates across your kitchen
        </div>
      </div>

      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
        {inventory.map((item, idx) => {
          const config = statusConfig[item.status];
          const stockPercentage = Math.round((item.onHand / item.par) * 100);
          const IconComponent = config.icon;

          return (
            <Card
              key={item.name}
              className="stat-card animate-slide-in"
              style={{
                animationDelay: `${idx * 0.1}s`,
                background: item.status === 'critical'
                  ? "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)"
                  : "white"
              }}
            >
              <Flex direction="column" gap="3">
                {/* Header */}
                <Flex justify="between" align="start">
                  <div>
                    <Heading size="4" style={{ marginBottom: "0.5rem", fontWeight: 600 }}>
                      {item.name}
                    </Heading>
                    <Badge
                      color={config.color}
                      size="2"
                      style={{ padding: "0.35rem 0.65rem", fontWeight: 500 }}
                    >
                      <Flex align="center" gap="1">
                        <IconComponent width={12} height={12} />
                        {config.label}
                      </Flex>
                    </Badge>
                  </div>
                </Flex>

                {/* Stock Level */}
                <div>
                  <Flex justify="between" align="center" style={{ marginBottom: "0.5rem" }}>
                    <Text size="2" color="gray">Stock Level</Text>
                    <Text size="1" color="gray">{stockPercentage}% of par</Text>
                  </Flex>
                  <div style={{
                    width: "100%",
                    height: "8px",
                    background: "#f1f5f9",
                    borderRadius: "4px",
                    overflow: "hidden"
                  }}>
                    <div style={{
                      width: `${Math.min(stockPercentage, 100)}%`,
                      height: "100%",
                      background: item.status === 'critical'
                        ? "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)"
                        : item.status === 'warning'
                        ? "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)"
                        : "linear-gradient(90deg, #10b981 0%, #059669 100%)",
                      transition: "width 0.3s ease"
                    }} />
                  </div>
                </div>

                {/* Details Grid */}
                <Grid columns="2" gap="3" style={{
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(15, 23, 42, 0.06)"
                }}>
                  <div>
                    <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                      On Hand
                    </Text>
                    <Text size="3" weight="bold">
                      {item.onHand} {item.unit}
                    </Text>
                  </div>
                  <div>
                    <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                      Par Level
                    </Text>
                    <Text size="3" weight="bold">
                      {item.par} {item.unit}
                    </Text>
                  </div>
                </Grid>

                {/* Expiration */}
                <Flex
                  align="center"
                  gap="2"
                  style={{
                    padding: "0.75rem",
                    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                    borderRadius: "8px",
                    border: "1px solid rgba(15, 23, 42, 0.06)"
                  }}
                >
                  <ClockIcon width={16} height={16} style={{ color: "#64748b" }} />
                  <div style={{ flex: 1 }}>
                    <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.1rem" }}>
                      Expires in
                    </Text>
                    <Text size="2" weight="medium" style={{ color: item.expires.includes("1 day") ? "#ef4444" : "#0f172a" }}>
                      {item.expires}
                    </Text>
                  </div>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}
