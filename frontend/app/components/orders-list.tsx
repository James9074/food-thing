"use client";

import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";

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

export function OrdersList({ orders }: { orders: OrderSummary[] }) {
  return (
    <Card>
      <Heading size="3" className="mb-3">
        Pending Orders
      </Heading>
      <div className="space-y-2">
        {orders.map((order) => (
          <Flex key={order.supplier} justify="between" align="center" className="bg-white px-3 py-2 rounded-md">
            <div>
              <Text weight="medium">{order.supplier}</Text>
              <Text as="div" color="gray">
                ETA {order.eta}
              </Text>
            </div>
            <Flex align="center" gap="3">
              <Badge color={statusColor[order.status]}>{order.status}</Badge>
              <Text weight="bold">${order.total.toFixed(2)}</Text>
            </Flex>
          </Flex>
        ))}
      </div>
    </Card>
  );
}
