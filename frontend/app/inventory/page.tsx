import { Badge, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";

const inventory = [
  { name: "Spinach", onHand: 24, par: 40, unit: "lb", expires: "2 days", status: "warning" },
  { name: "Almond Milk", onHand: 12, par: 20, unit: "case", expires: "6 days", status: "ok" },
  { name: "Chicken Breast", onHand: 35, par: 30, unit: "lb", expires: "1 day", status: "critical" }
];

const statusColor = {
  ok: "green",
  warning: "amber",
  critical: "red"
} as const;

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <Heading size="6">Inventory Health</Heading>
      <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
        {inventory.map((item) => (
          <Card key={item.name} variant="surface">
            <Flex justify="between" align="center" className="mb-2">
              <Heading size="4">{item.name}</Heading>
              <Badge color={statusColor[item.status]}>{item.status}</Badge>
            </Flex>
            <Text color="gray">On hand: {item.onHand} {item.unit}</Text>
            <Text color="gray">Par level: {item.par}</Text>
            <Text color="gray">Expires in {item.expires}</Text>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
