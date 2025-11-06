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
  Text,
  TextField,
  Table,
  Select
} from "@radix-ui/themes";
import { PlusIcon, MagnifyingGlassIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

type Ingredient = {
  id: string;
  name: string;
  category: string;
  cost: number;
  unit: string;
  supplier: string;
  allergens: string[];
  inStock: boolean;
};

const mockIngredients: Ingredient[] = [
  {
    id: "1",
    name: "Organic Spinach",
    category: "Vegetables",
    cost: 3.99,
    unit: "lb",
    supplier: "Chef Store",
    allergens: [],
    inStock: true
  },
  {
    id: "2",
    name: "Chicken Breast",
    category: "Proteins",
    cost: 5.49,
    unit: "lb",
    supplier: "US Foods",
    allergens: [],
    inStock: true
  },
  {
    id: "3",
    name: "Almond Milk",
    category: "Dairy",
    cost: 4.25,
    unit: "half gallon",
    supplier: "Costco",
    allergens: ["tree nuts"],
    inStock: true
  },
  {
    id: "4",
    name: "Parmesan Cheese",
    category: "Dairy",
    cost: 12.99,
    unit: "lb",
    supplier: "Sam's Club",
    allergens: ["dairy"],
    inStock: true
  },
  {
    id: "5",
    name: "Extra Virgin Olive Oil",
    category: "Oils",
    cost: 18.50,
    unit: "gallon",
    supplier: "Costco",
    allergens: [],
    inStock: false
  },
  {
    id: "6",
    name: "Gluten-Free Pasta",
    category: "Grains",
    cost: 3.75,
    unit: "lb",
    supplier: "Aldi",
    allergens: [],
    inStock: true
  }
];

const categories = ["All", "Vegetables", "Proteins", "Dairy", "Oils", "Grains", "Spices"];

export default function IngredientsPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(mockIngredients);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<Ingredient | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "Vegetables",
    cost: "",
    unit: "lb",
    supplier: "",
    allergens: ""
  });

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenDialog = (ingredient?: Ingredient) => {
    if (ingredient) {
      setEditingIngredient(ingredient);
      setFormData({
        name: ingredient.name,
        category: ingredient.category,
        cost: ingredient.cost.toString(),
        unit: ingredient.unit,
        supplier: ingredient.supplier,
        allergens: ingredient.allergens.join(", ")
      });
    } else {
      setEditingIngredient(null);
      setFormData({
        name: "",
        category: "Vegetables",
        cost: "",
        unit: "lb",
        supplier: "",
        allergens: ""
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    const allergensList = formData.allergens
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a);

    if (editingIngredient) {
      // Update existing
      setIngredients(
        ingredients.map((ing) =>
          ing.id === editingIngredient.id
            ? {
                ...ing,
                name: formData.name,
                category: formData.category,
                cost: parseFloat(formData.cost),
                unit: formData.unit,
                supplier: formData.supplier,
                allergens: allergensList
              }
            : ing
        )
      );
    } else {
      // Add new
      const newIngredient: Ingredient = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        cost: parseFloat(formData.cost),
        unit: formData.unit,
        supplier: formData.supplier,
        allergens: allergensList,
        inStock: true
      };
      setIngredients([...ingredients, newIngredient]);
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const totalValue = ingredients.reduce((sum, ing) => sum + ing.cost, 0);
  const inStockCount = ingredients.filter((ing) => ing.inStock).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Flex justify="between" align="center">
        <div className="page-header">
          <div className="page-title">Ingredients</div>
          <div className="page-subtitle">
            Manage your ingredient library, costs, and suppliers
          </div>
        </div>
        <Button
          size="3"
          onClick={() => handleOpenDialog()}
          style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
        >
          <PlusIcon width={16} height={16} />
          Add Ingredient
        </Button>
      </Flex>

      {/* Stats */}
      <Grid columns={{ initial: "1", sm: "3" }} gap="4">
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Total Ingredients
          </Text>
          <Heading size="6">{ingredients.length}</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            In Stock
          </Text>
          <Heading size="6">{inStockCount}</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Total Value
          </Text>
          <Heading size="6">${totalValue.toFixed(2)}</Heading>
        </Card>
      </Grid>

      {/* Filters */}
      <Card className="stat-card">
        <Flex gap="3" align="center" wrap="wrap">
          <TextField.Root style={{ flex: 1, minWidth: "250px" }}>
            <TextField.Slot>
              <MagnifyingGlassIcon />
            </TextField.Slot>
            <TextField.Input
              placeholder="Search ingredients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </TextField.Root>

          <Flex gap="2" wrap="wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                size="2"
                color={selectedCategory === category ? "violet" : "gray"}
                style={{
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  fontWeight: selectedCategory === category ? 600 : 400
                }}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </Flex>
        </Flex>
      </Card>

      {/* Ingredients Table */}
      <Card className="stat-card">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Category</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Cost per Unit</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Supplier</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Allergens</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredIngredients.map((ingredient) => (
              <Table.Row key={ingredient.id}>
                <Table.Cell>
                  <Text weight="medium">{ingredient.name}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Badge size="1" color="blue">
                    {ingredient.category}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Text weight="bold">${ingredient.cost.toFixed(2)}</Text>
                  <Text size="1" color="gray"> / {ingredient.unit}</Text>
                </Table.Cell>
                <Table.Cell>
                  <Text size="2" color="gray">{ingredient.supplier}</Text>
                </Table.Cell>
                <Table.Cell>
                  {ingredient.allergens.length > 0 ? (
                    <Flex gap="1" wrap="wrap">
                      {ingredient.allergens.map((allergen) => (
                        <Badge key={allergen} size="1" color="red">
                          {allergen}
                        </Badge>
                      ))}
                    </Flex>
                  ) : (
                    <Text size="1" color="gray">None</Text>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Badge color={ingredient.inStock ? "green" : "gray"} size="1">
                    {ingredient.inStock ? "In Stock" : "Out"}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <Button
                      size="1"
                      variant="soft"
                      onClick={() => handleOpenDialog(ingredient)}
                    >
                      <Pencil1Icon width={14} height={14} />
                    </Button>
                    <Button
                      size="1"
                      variant="soft"
                      color="red"
                      onClick={() => handleDelete(ingredient.id)}
                    >
                      <TrashIcon width={14} height={14} />
                    </Button>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {filteredIngredients.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "#64748b" }}>
            <Text size="2">No ingredients found. Try adjusting your search or filters.</Text>
          </div>
        )}
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Content style={{ maxWidth: "500px" }}>
          <Dialog.Title>{editingIngredient ? "Edit" : "Add"} Ingredient</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {editingIngredient ? "Update" : "Create a new"} ingredient for your recipes
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <TextField.Root>
                <TextField.Input
                  placeholder="e.g., Organic Spinach"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </TextField.Root>
            </label>

            <Grid columns="2" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Category
                </Text>
                <Select.Root
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <Select.Trigger style={{ width: "100%" }} />
                  <Select.Content>
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <Select.Item key={cat} value={cat}>
                        {cat}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Unit
                </Text>
                <Select.Root
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <Select.Trigger style={{ width: "100%" }} />
                  <Select.Content>
                    <Select.Item value="lb">lb</Select.Item>
                    <Select.Item value="oz">oz</Select.Item>
                    <Select.Item value="kg">kg</Select.Item>
                    <Select.Item value="case">case</Select.Item>
                    <Select.Item value="gallon">gallon</Select.Item>
                    <Select.Item value="half gallon">half gallon</Select.Item>
                    <Select.Item value="each">each</Select.Item>
                  </Select.Content>
                </Select.Root>
              </label>
            </Grid>

            <Grid columns="2" gap="3">
              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Cost per Unit
                </Text>
                <TextField.Root>
                  <TextField.Slot>$</TextField.Slot>
                  <TextField.Input
                    placeholder="0.00"
                    type="number"
                    step="0.01"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </TextField.Root>
              </label>

              <label>
                <Text as="div" size="2" mb="1" weight="bold">
                  Supplier
                </Text>
                <TextField.Root>
                  <TextField.Input
                    placeholder="e.g., Costco"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  />
                </TextField.Root>
              </label>
            </Grid>

            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Allergens
              </Text>
              <TextField.Root>
                <TextField.Input
                  placeholder="e.g., dairy, tree nuts (comma-separated)"
                  value={formData.allergens}
                  onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                />
              </TextField.Root>
              <Text size="1" color="gray" mt="1">
                Separate multiple allergens with commas
              </Text>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleSave}
              disabled={!formData.name || !formData.cost || !formData.supplier}
              style={{
                background:
                  formData.name && formData.cost && formData.supplier
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : undefined
              }}
            >
              {editingIngredient ? "Update" : "Add"} Ingredient
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
