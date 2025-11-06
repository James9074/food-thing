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
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Flex justify="between" align="center">
        <div className="page-header">
          <div className="page-title">Recipe Builder</div>
          <div className="page-subtitle">
            Design dishes with live costing, nutrition, and allergen intelligence
          </div>
        </div>
        <Button
          onClick={() => setOpen(true)}
          size="3"
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          + Add Ingredient
        </Button>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="4">
        <Card className="stat-card">
          <Heading size="5" style={{ marginBottom: "1.5rem", fontWeight: 600 }}>
            Ingredient Matrix
          </Heading>
          {selected.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
              <Text size="2">No ingredients added yet. Click "Add Ingredient" to get started.</Text>
            </div>
          ) : (
            <>
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
                      <Table.Cell style={{ fontWeight: 600 }}>${(item.cost * item.quantity).toFixed(2)}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
              <Flex
                justify="between"
                align="center"
                style={{
                  marginTop: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "2px solid rgba(15, 23, 42, 0.1)"
                }}
              >
                <Text weight="bold" size="4">Total Food Cost</Text>
                <Heading size="5" style={{ color: "#667eea" }}>${totalCost.toFixed(2)}</Heading>
              </Flex>
            </>
          )}
        </Card>

        <Card className="stat-card">
          <Heading size="5" style={{ marginBottom: "1.5rem", fontWeight: 600 }}>
            Nutrition Snapshot
          </Heading>
          <Text size="2" color="gray" style={{ display: "block", marginBottom: "1rem" }}>
            Per serving estimate
          </Text>
          <Grid columns="2" gap="3">
            {Object.entries(nutrientProfile).map(([nutrient, value]) => (
              <div
                key={nutrient}
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                  padding: "1.25rem",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid rgba(15, 23, 42, 0.06)"
                }}
              >
                <Heading size="6" style={{ marginBottom: "0.25rem" }}>{value}</Heading>
                <Text size="1" color="gray" style={{ textTransform: "capitalize" }}>{nutrient}</Text>
              </div>
            ))}
          </Grid>
          <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(15, 23, 42, 0.06)" }}>
            <Text size="2" weight="medium" style={{ display: "block", marginBottom: "0.75rem" }}>
              Dietary Flags
            </Text>
            <Flex gap="2" wrap="wrap">
              <Badge color="green" size="2" style={{ padding: "0.5rem 0.75rem" }}>Vegetarian</Badge>
              <Badge color="amber" size="2" style={{ padding: "0.5rem 0.75rem" }}>Contains Dairy</Badge>
            </Flex>
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
