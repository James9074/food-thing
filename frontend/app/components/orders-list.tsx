"use client";

import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { CalendarIcon } from "@radix-ui/react-icons";

export type OrderSummary = {
  supplier: string;
  status: "pending" | "submitted" | "received";
  eta: string;
  total: number;
};

const statusColor = {
  pending: "amber",
  submitted: "blue",
  received: "green"
} as const;

const statusLabel = {
  pending: "Pending",
  submitted: "Submitted",
  received: "Received"
} as const;

export function OrdersList({ orders }: { orders: OrderSummary[] }) {
  const totalValue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <Card className="stat-card animate-slide-in">
      <Flex justify="between" align="center" style={{ marginBottom: "1.5rem" }}>
        <div>
          <Heading size="5" style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Recent Orders
          </Heading>
          <Text size="2" color="gray">
            Total value: ${totalValue.toFixed(2)}
          </Text>
        </div>
        <Badge size="2" color="violet" style={{ padding: "0.5rem 0.75rem" }}>
          {orders.length} orders
        </Badge>
      </Flex>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {orders.map((order) => (
          <div
            key={order.supplier}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "1rem",
              border: "1px solid rgba(15, 23, 42, 0.06)",
              transition: "all 0.2s ease",
              cursor: "pointer"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.06)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <Flex justify="between" align="start" style={{ marginBottom: "0.75rem" }}>
              <div>
                <Text weight="bold" style={{ fontSize: "0.95rem", display: "block", marginBottom: "0.25rem" }}>
                  {order.supplier}
                </Text>
                <Flex align="center" gap="1">
                  <CalendarIcon width={14} height={14} style={{ color: "#64748b" }} />
                  <Text size="2" color="gray">
                    ETA: {order.eta}
                  </Text>
                </Flex>
              </div>
              <Badge
                color={statusColor[order.status]}
                size="2"
                style={{ padding: "0.35rem 0.65rem", fontWeight: 500 }}
              >
                {statusLabel[order.status]}
              </Badge>
            </Flex>

            <Flex justify="between" align="center" style={{ paddingTop: "0.75rem", borderTop: "1px solid rgba(15, 23, 42, 0.05)" }}>
              <Text size="2" color="gray">Order Total</Text>
              <Text weight="bold" style={{ fontSize: "1.1rem", color: "#0f172a" }}>
                ${order.total.toFixed(2)}
              </Text>
            </Flex>
          </div>
        ))}
      </div>
    </Card>
  );
}
