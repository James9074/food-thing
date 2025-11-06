"use client";

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Dialog,
  Flex,
  Grid,
  Heading,
  ScrollArea,
  Table,
  Text,
  TextField
} from "@radix-ui/themes";

type Ingredient = {
  id: string;
  name: string;
  cost: number;
  allergens: string[];
};

type RecipeIngredient = Ingredient & {
  quantity: number;
  unit: string;
};

const pantry: Ingredient[] = [
  { id: "1", name: "Roasted Sweet Potatoes", cost: 0.92, allergens: [] },
  { id: "2", name: "Black Beans", cost: 0.35, allergens: [] },
  { id: "3", name: "Pickled Red Onions", cost: 0.18, allergens: [] },
  { id: "4", name: "Lime Crema", cost: 0.45, allergens: ["dairy"] }
];

const nutrientProfile = {
  calories: 520,
  protein: 24,
  carbs: 58,
  fat: 20,
  fiber: 16
};

export default function RecipeBuilderPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<RecipeIngredient[]>([]);
  const [open, setOpen] = useState(false);

  const filtered = pantry.filter((ingredient) => ingredient.name.toLowerCase().includes(search.toLowerCase()));

  const totalCost = selected.reduce((sum, item) => sum + item.cost * item.quantity, 0);

  return (
    <div className="space-y-6">
      <Flex justify="between" align="center">
        <div>
          <Heading size="6">Recipe Builder</Heading>
          <Text color="gray">Design dishes with live costing, nutrition, and allergen intelligence.</Text>
        </div>
        <Button onClick={() => setOpen(true)}>Add Ingredient</Button>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Card>
          <Heading size="4" className="mb-4">
            Ingredient Matrix
          </Heading>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Ingredient</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Unit Cost</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {selected.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.quantity} {item.unit}</Table.Cell>
                  <Table.Cell>${item.cost.toFixed(2)}</Table.Cell>
                  <Table.Cell>${(item.cost * item.quantity).toFixed(2)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
          <Flex justify="between" className="mt-4">
            <Text weight="medium">Current food cost</Text>
            <Text weight="bold">${totalCost.toFixed(2)}</Text>
          </Flex>
        </Card>
        <Card>
          <Heading size="4" className="mb-4">
            Nutrition Snapshot (per serving)
          </Heading>
          <Grid columns="2" gap="3">
            {Object.entries(nutrientProfile).map(([nutrient, value]) => (
              <Card key={nutrient} variant="surface" className="p-4 text-center">
                <Heading size="5">{value}</Heading>
                <Text color="gray">{nutrient}</Text>
              </Card>
            ))}
          </Grid>
          <div className="mt-4 space-y-2">
            <Heading size="4">Dietary Flags</Heading>
            <div className="flex gap-2">
              <Badge color="green">Vegetarian</Badge>
              <Badge color="amber">Contains Dairy</Badge>
            </div>
          </div>
        </Card>
      </Grid>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content maxWidth="500px">
          <Dialog.Title>Add Ingredient</Dialog.Title>
          <Text color="gray">Sourced from live supplier catalogs</Text>
          <TextField.Root className="my-4" value={search} onChange={(event) => setSearch(event.target.value)}>
            <TextField.Input placeholder="Search pantry" />
          </TextField.Root>
          <ScrollArea className="h-64">
            <div className="space-y-3">
              {filtered.map((ingredient) => (
                <Card
                  key={ingredient.id}
                  variant="surface"
                  className="cursor-pointer"
                  onClick={() => {
                    setSelected((prev) => [
                      ...prev,
                      { ...ingredient, quantity: 1, unit: "lb" }
                    ]);
                    setOpen(false);
                  }}
                >
                  <Flex justify="between" align="center">
                    <div>
                      <Heading size="3">{ingredient.name}</Heading>
                      <Text color="gray">${ingredient.cost.toFixed(2)} per unit</Text>
                    </div>
                    <div className="flex gap-2">
                      {ingredient.allergens.map((allergen) => (
                        <Badge key={allergen} color="red">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </Flex>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
