"use client";

import { useState } from "react";
import { Badge, Button, Card, Flex, Grid, Heading, Table, Text } from "@radix-ui/themes";
import {
  PlusIcon,
  CheckCircledIcon,
  ClockIcon,
  CrossCircledIcon,
  RocketIcon,
  ExclamationTriangleIcon,
  CalendarIcon
} from "@radix-ui/react-icons";

type OrderStatus = "pending" | "submitted" | "received" | "cancelled";

type Order = {
  id: string;
  supplier: string;
  created: string;
  status: OrderStatus;
  items: number;
  total: number;
  eta?: string;
};

type LowStockItem = {
  name: string;
  current: number;
  par: number;
  unit: string;
  supplier: string;
  estimatedCost: number;
};

type SuggestedOrder = {
  supplier: string;
  itemCount: number;
  total: number;
  reason: string;
};

const orderHistory: Order[] = [
  {
    id: "PO-2024-195",
    supplier: "Sam's Club",
    created: "2024-02-20",
    status: "pending",
    items: 14,
    total: 742.10,
    eta: "Tomorrow"
  },
  {
    id: "PO-2024-194",
    supplier: "US Foods",
    created: "2024-02-19",
    status: "submitted",
    items: 22,
    total: 1289.45,
    eta: "Feb 24"
  },
  {
    id: "PO-2024-193",
    supplier: "Costco",
    created: "2024-02-18",
    status: "received",
    items: 9,
    total: 390.00,
    eta: "Delivered"
  },
  {
    id: "PO-2024-192",
    supplier: "Chef Store",
    created: "2024-02-17",
    status: "received",
    items: 31,
    total: 1547.80,
    eta: "Delivered"
  },
  {
    id: "PO-2024-191",
    supplier: "Aldi",
    created: "2024-02-16",
    status: "received",
    items: 18,
    total: 456.25,
    eta: "Delivered"
  },
  {
    id: "PO-2024-190",
    supplier: "Sam's Club",
    created: "2024-02-15",
    status: "cancelled",
    items: 7,
    total: 298.50,
    eta: "Cancelled"
  },
  {
    id: "PO-2024-189",
    supplier: "Costco",
    created: "2024-02-14",
    status: "received",
    items: 12,
    total: 623.90,
    eta: "Delivered"
  },
  {
    id: "PO-2024-188",
    supplier: "US Foods",
    created: "2024-02-13",
    status: "received",
    items: 25,
    total: 1876.30,
    eta: "Delivered"
  }
];

const lowStockItems: LowStockItem[] = [
  { name: "Organic Spinach", current: 8, par: 40, unit: "lb", supplier: "Chef Store", estimatedCost: 31.92 },
  { name: "Chicken Breast", current: 12, par: 50, unit: "lb", supplier: "US Foods", estimatedCost: 208.62 },
  { name: "Extra Virgin Olive Oil", current: 0, par: 5, unit: "gal", supplier: "Costco", estimatedCost: 92.50 },
  { name: "Almond Milk", current: 3, par: 20, unit: "case", supplier: "Costco", estimatedCost: 72.25 },
  { name: "Parmesan Cheese", current: 2, par: 15, unit: "lb", supplier: "Sam's Club", estimatedCost: 168.87 }
];

const suggestedOrders: SuggestedOrder[] = [
  { supplier: "Chef Store", itemCount: 8, total: 324.50, reason: "5 items below par level" },
  { supplier: "US Foods", itemCount: 12, total: 892.30, reason: "Weekly delivery schedule" },
  { supplier: "Costco", itemCount: 6, total: 287.75, reason: "3 out of stock items" }
];

const statusConfig: Record<OrderStatus, { color: "amber" | "blue" | "green" | "red"; icon: any; label: string }> = {
  pending: { color: "amber", icon: ClockIcon, label: "Pending" },
  submitted: { color: "blue", icon: RocketIcon, label: "Submitted" },
  received: { color: "green", icon: CheckCircledIcon, label: "Received" },
  cancelled: { color: "red", icon: CrossCircledIcon, label: "Cancelled" }
};

export default function OrdersPage() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const activeOrders = orderHistory.filter((o) => o.status === "pending" || o.status === "submitted");
  const totalPending = activeOrders.reduce((sum, o) => sum + o.total, 0);
  const completedThisMonth = orderHistory.filter((o) => o.status === "received").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Flex justify="between" align="center">
        <div className="page-header">
          <div className="page-title">Smart Ordering</div>
          <div className="page-subtitle">
            AI-powered purchase order suggestions based on inventory levels and usage patterns
          </div>
        </div>
        <Button
          size="3"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <PlusIcon width={16} height={16} />
          Create Order
        </Button>
      </Flex>

      {/* Stats */}
      <Grid columns={{ initial: "1", sm: "4" }} gap="4">
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Active Orders
          </Text>
          <Heading size="6">{activeOrders.length}</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Pending Value
          </Text>
          <Heading size="6">${totalPending.toFixed(2)}</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Completed (Month)
          </Text>
          <Heading size="6">{completedThisMonth}</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Items Below Par
          </Text>
          <Heading size="6">{lowStockItems.length}</Heading>
        </Card>
      </Grid>

      {/* Suggested Orders */}
      <div>
        <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
          <div>
            <Heading size="5" style={{ marginBottom: "0.25rem" }}>Suggested Orders</Heading>
            <Text size="2" color="gray">AI recommendations based on your inventory and consumption patterns</Text>
          </div>
        </Flex>
        <Grid columns={{ initial: "1", md: "3" }} gap="4">
          {suggestedOrders.map((suggestion, idx) => (
            <Card
              key={suggestion.supplier}
              className="stat-card animate-slide-in"
              style={{
                animationDelay: `${idx * 0.1}s`,
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)",
                border: "2px solid rgba(102, 126, 234, 0.1)"
              }}
            >
              <Flex direction="column" gap="3">
                <Flex justify="between" align="start">
                  <div>
                    <Heading size="4" style={{ marginBottom: "0.5rem" }}>{suggestion.supplier}</Heading>
                    <Badge color="violet" size="2" style={{ padding: "0.35rem 0.65rem" }}>
                      {suggestion.itemCount} items
                    </Badge>
                  </div>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <ExclamationTriangleIcon style={{ width: 20, height: 20, color: "#667eea" }} />
                  </div>
                </Flex>
                <div style={{
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(15, 23, 42, 0.06)"
                }}>
                  <Text size="2" color="gray" style={{ display: "block", marginBottom: "0.5rem" }}>
                    {suggestion.reason}
                  </Text>
                  <Heading size="5" style={{ color: "#667eea" }}>
                    ${suggestion.total.toFixed(2)}
                  </Heading>
                </div>
                <Button
                  size="2"
                  variant="soft"
                  style={{ width: "100%", fontWeight: 600 }}
                >
                  Review & Create
                </Button>
              </Flex>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Low Stock Items */}
      <Card className="stat-card">
        <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
          <div>
            <Heading size="5" style={{ marginBottom: "0.25rem" }}>Items Below Par Level</Heading>
            <Text size="2" color="gray">Items that need to be reordered soon</Text>
          </div>
          <Badge color="red" size="2" style={{ padding: "0.5rem 0.75rem" }}>
            {lowStockItems.length} items
          </Badge>
        </Flex>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Item</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Current</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Par Level</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Est. Cost to Par</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {lowStockItems.map((item) => {
              const percentage = Math.round((item.current / item.par) * 100);
              const isOutOfStock = item.current === 0;
              const isCritical = percentage < 30;

              return (
                <Table.Row key={item.name}>
                  <Table.Cell>
                    <Text weight="medium">{item.name}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="bold" style={{ color: isOutOfStock ? "#ef4444" : "#0f172a" }}>
                      {item.current} {item.unit}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text color="gray">{item.par} {item.unit}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2" color="gray">{item.supplier}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="bold">${item.estimatedCost.toFixed(2)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={isOutOfStock ? "red" : isCritical ? "amber" : "blue"}
                      size="1"
                    >
                      {isOutOfStock ? "Out of Stock" : isCritical ? "Critical" : "Low"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Card>

      {/* Order History */}
      <Card className="stat-card">
        <Flex justify="between" align="center" style={{ marginBottom: "1rem" }}>
          <div>
            <Heading size="5" style={{ marginBottom: "0.25rem" }}>Order History</Heading>
            <Text size="2" color="gray">Recent purchase orders and their status</Text>
          </div>
        </Flex>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Order ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Items</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>ETA</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orderHistory.map((order) => {
              const config = statusConfig[order.status];
              const IconComponent = config.icon;

              return (
                <Table.Row key={order.id}>
                  <Table.Cell>
                    <Text weight="medium" style={{ fontFamily: "monospace" }}>{order.id}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="medium">{order.supplier}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Flex align="center" gap="1">
                      <CalendarIcon width={12} height={12} style={{ color: "#64748b" }} />
                      <Text size="2" color="gray">{order.created}</Text>
                    </Flex>
                  </Table.Cell>
                  <Table.Cell>
                    <Text>{order.items}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Text weight="bold">${order.total.toFixed(2)}</Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge color={config.color} size="1" style={{ padding: "0.35rem 0.65rem" }}>
                      <Flex align="center" gap="1">
                        <IconComponent width={12} height={12} />
                        {config.label}
                      </Flex>
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="2" color="gray">{order.eta}</Text>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </Card>
    </div>
  );
}
