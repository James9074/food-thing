"use client";

import { useState } from "react";
import { Button, Card, Flex, Grid, Heading, Text, TextField } from "@radix-ui/themes";

const suppliers = [
  { name: "Sam's Club", format: "csv", api: false },
  { name: "Costco", format: "pdf", api: false },
  { name: "Aldi", format: "xlsx", api: false },
  { name: "Chef Store", format: "api", api: true }
];

export default function SuppliersPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <Heading size="6">Supplier Catalogs</Heading>
      <Grid columns={{ initial: "1", md: "2" }} gap="4">
        {suppliers.map((supplier) => (
          <Card
            key={supplier.name}
            variant={selected === supplier.name ? "surface" : "ghost"}
            className="cursor-pointer"
            onClick={() => setSelected(supplier.name)}
          >
            <Heading size="4">{supplier.name}</Heading>
            <Text color="gray">Preferred format: {supplier.format.toUpperCase()}</Text>
            <Text color="gray">API available: {supplier.api ? "Yes" : "No"}</Text>
          </Card>
        ))}
      </Grid>
      <Card>
        <Heading size="4">Upload catalog</Heading>
        <Text color="gray" className="mb-3">
          Drop spreadsheets, PDFs, or connect APIs to auto ingest pricing.
        </Text>
        <Flex gap="3" align="center">
          <TextField.Root>
            <TextField.Input type="file" />
          </TextField.Root>
          <Button disabled={!selected}>Queue ingestion</Button>
        </Flex>
      </Card>
    </div>
  );
}
