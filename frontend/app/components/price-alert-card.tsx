"use client";

import { Card, Flex, Heading, Text, Badge } from "@radix-ui/themes";
import { ArrowUpIcon, ArrowDownIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

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
  const isSignificantChange = Math.abs(change / alert.previousPrice) > 0.15;

  return (
    <Card
      className="stat-card animate-slide-in"
      style={{
        background: increase && isSignificantChange
          ? "linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)"
          : "white"
      }}
    >
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <div style={{ flex: 1 }}>
            <Flex align="center" gap="2" style={{ marginBottom: "0.5rem" }}>
              <Heading size="4" style={{ fontWeight: 600 }}>{alert.product}</Heading>
              {increase && isSignificantChange && (
                <ExclamationTriangleIcon style={{ color: "#ef4444", width: 18, height: 18 }} />
              )}
            </Flex>
            <Text size="2" color="gray">
              {alert.supplier} • {alert.unit}
            </Text>
          </div>
        </Flex>

        <Flex justify="between" align="center">
          <div>
            <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
              Current Price
            </Text>
            <Text size="5" weight="bold" style={{ color: "#0f172a" }}>
              ${alert.currentPrice.toFixed(2)}
            </Text>
          </div>

          <Flex align="center" gap="2">
            <Badge
              size="2"
              color={increase ? "red" : "green"}
              style={{
                padding: "0.5rem 0.75rem",
                fontWeight: 600
              }}
            >
              <Flex align="center" gap="1">
                {increase ? <ArrowUpIcon width={14} height={14} /> : <ArrowDownIcon width={14} height={14} />}
                <span>{percent}%</span>
              </Flex>
            </Badge>
          </Flex>
        </Flex>

        <div style={{
          paddingTop: "0.75rem",
          borderTop: "1px solid rgba(15, 23, 42, 0.05)",
          fontSize: "0.875rem",
          color: "#64748b"
        }}>
          Previous: ${alert.previousPrice.toFixed(2)} • Change: ${Math.abs(change).toFixed(2)}
        </div>
      </Flex>
    </Card>
  );
}
