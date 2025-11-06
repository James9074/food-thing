"use client";

import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { ArrowUpIcon, ArrowDownIcon } from "@radix-ui/react-icons";

type PriceAlert = {
  product: string;
  supplier: string;
  previousPrice: number;
  currentPrice: number;
  unit: string;
};

export function PriceAlertCard({ alert }: { alert: PriceAlert }) {
  const change = alert.currentPrice - alert.previousPrice;
  const increase = change >= 0;
  const percent = ((Math.abs(change) / alert.previousPrice) * 100).toFixed(1);

  return (
    <Card variant="surface" className="w-full">
      <Flex justify="between" align="center">
        <div>
          <Heading size="3">{alert.product}</Heading>
          <Text as="div" color="gray">
            {alert.supplier} • {alert.unit}
          </Text>
        </div>
        <Flex align="center" gap="2">
          <Text weight="bold">${alert.currentPrice.toFixed(2)}</Text>
          <Flex align="center" gap="1" color={increase ? "red" : "green"}>
            {increase ? <ArrowUpIcon /> : <ArrowDownIcon />}
            <Text>{percent}%</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
