"use client";

import { Card, Flex, Heading, Text } from "@radix-ui/themes";

export type PrepItem = {
  recipe: string;
  portions: number;
  station: string;
  due: string;
};

export function PrepList({ items }: { items: PrepItem[] }) {
  return (
    <Card variant="surface">
      <Heading size="3" className="mb-3">
        Today's Prep List
      </Heading>
      <div className="space-y-2">
        {items.map((item) => (
          <Flex key={item.recipe} justify="between" className="rounded-md bg-slate-100 px-3 py-2">
            <div>
              <Text weight="medium">{item.recipe}</Text>
              <Text as="div" color="gray">
                Station: {item.station}
              </Text>
            </div>
            <div className="text-right">
              <Text weight="bold">{item.portions} portions</Text>
              <Text as="div" color="gray">
                Due by {item.due}
              </Text>
            </div>
          </Flex>
        ))}
      </div>
    </Card>
  );
}
