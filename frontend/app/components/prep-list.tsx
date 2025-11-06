"use client";

import { Card, Flex, Heading, Text, Badge } from "@radix-ui/themes";
import { ClockIcon, CheckCircledIcon } from "@radix-ui/react-icons";

export type PrepItem = {
  recipe: string;
  portions: number;
  station: string;
  due: string;
};

export function PrepList({ items }: { items: PrepItem[] }) {
  return (
    <Card className="stat-card animate-slide-in">
      <Flex justify="between" align="center" style={{ marginBottom: "1.5rem" }}>
        <div>
          <Heading size="5" style={{ fontWeight: 600, marginBottom: "0.25rem" }}>
            Today's Prep List
          </Heading>
          <Text size="2" color="gray">
            {items.length} items scheduled
          </Text>
        </div>
        <Badge size="2" color="blue" style={{ padding: "0.5rem 0.75rem" }}>
          Active
        </Badge>
      </Flex>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {items.map((item, idx) => (
          <div
            key={item.recipe}
            style={{
              background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
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
            <Flex justify="between" align="start">
              <div style={{ flex: 1 }}>
                <Flex align="center" gap="2" style={{ marginBottom: "0.5rem" }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  }} />
                  <Text weight="bold" style={{ fontSize: "0.95rem" }}>{item.recipe}</Text>
                </Flex>
                <Text size="2" color="gray">
                  Station: {item.station}
                </Text>
              </div>
              <div style={{ textAlign: "right" }}>
                <Text weight="bold" style={{ fontSize: "1.1rem", color: "#0f172a", display: "block", marginBottom: "0.25rem" }}>
                  {item.portions}
                </Text>
                <Text size="1" color="gray">portions</Text>
              </div>
            </Flex>
            <Flex align="center" gap="1" style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(15, 23, 42, 0.05)" }}>
              <ClockIcon width={14} height={14} style={{ color: "#64748b" }} />
              <Text size="2" color="gray">
                Due by {item.due}
              </Text>
            </Flex>
          </div>
        ))}
      </div>
    </Card>
  );
}
