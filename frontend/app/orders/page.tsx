import { Badge, Button, Card, Flex, Heading, Table } from "@radix-ui/themes";

const orderHistory = [
  {
    id: "PO-2024-188",
    supplier: "Sam's Club",
    created: "2024-02-18",
    status: "pending",
    items: 14,
    total: 742.1
  },
  {
    id: "PO-2024-177",
    supplier: "Costco",
    created: "2024-02-16",
    status: "submitted",
    items: 9,
    total: 389.6
  }
];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <Flex justify="between" align="center">
        <Heading size="6">Smart Ordering</Heading>
        <Button>Create order</Button>
      </Flex>
      <Card>
        <Heading size="4" className="mb-3">
          Order history
        </Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Items</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderHistory.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.supplier}</Table.Cell>
                <Table.Cell>
                  <Badge color={order.status === "pending" ? "amber" : "blue"}>{order.status}</Badge>
                </Table.Cell>
                <Table.Cell>{order.items}</Table.Cell>
                <Table.Cell>${order.total.toFixed(2)}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Card>
    </div>
  );
}
