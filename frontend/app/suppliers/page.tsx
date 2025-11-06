"use client";

import { useState } from "react";
import { Button, Card, Flex, Grid, Heading, Text, TextField, Badge } from "@radix-ui/themes";
import { CheckCircledIcon, UploadIcon, FileTextIcon, Link2Icon } from "@radix-ui/react-icons";

const suppliers = [
  { name: "Sam's Club", format: "csv", api: false, status: "active", lastSync: "2 hours ago", products: 342 },
  { name: "Costco", format: "pdf", api: false, status: "active", lastSync: "5 hours ago", products: 218 },
  { name: "Aldi", format: "xlsx", api: false, status: "pending", lastSync: "Never", products: 0 },
  { name: "Chef Store", format: "api", api: true, status: "active", lastSync: "30 minutes ago", products: 487 }
];

export default function SuppliersPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div className="page-header">
        <div className="page-title">Supplier Management</div>
        <div className="page-subtitle">
          Manage your supplier catalogs and automate pricing updates
        </div>
      </div>

      {/* Stats */}
      <Grid columns={{ initial: "1", sm: "3" }} gap="4">
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Active Suppliers
          </Text>
          <Heading size="6">4</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Total Products
          </Text>
          <Heading size="6">1,047</Heading>
        </Card>
        <Card className="stat-card">
          <Text size="2" color="gray" weight="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
            Last Sync
          </Text>
          <Heading size="6">30 min ago</Heading>
        </Card>
      </Grid>

      {/* Suppliers Grid */}
      <div>
        <Heading size="5" style={{ marginBottom: "1rem" }}>Your Suppliers</Heading>
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          {suppliers.map((supplier, idx) => (
            <Card
              key={supplier.name}
              className="stat-card animate-slide-in"
              style={{
                animationDelay: `${idx * 0.1}s`,
                cursor: "pointer",
                background: selected === supplier.name
                  ? "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)"
                  : "white",
                border: selected === supplier.name
                  ? "2px solid #667eea"
                  : "1px solid rgba(15, 23, 42, 0.05)"
              }}
              onClick={() => setSelected(supplier.name)}
            >
              <Flex direction="column" gap="3">
                <Flex justify="between" align="start">
                  <div>
                    <Heading size="4" style={{ marginBottom: "0.25rem" }}>{supplier.name}</Heading>
                    <Flex align="center" gap="2" style={{ marginTop: "0.5rem" }}>
                      <Badge
                        color={supplier.status === "active" ? "green" : "amber"}
                        size="1"
                      >
                        {supplier.status}
                      </Badge>
                      {supplier.api && (
                        <Badge color="blue" size="1">
                          <Link2Icon width={10} height={10} /> API
                        </Badge>
                      )}
                    </Flex>
                  </div>
                  {selected === supplier.name && (
                    <CheckCircledIcon style={{ width: 24, height: 24, color: "#667eea" }} />
                  )}
                </Flex>

                <div style={{
                  paddingTop: "0.75rem",
                  borderTop: "1px solid rgba(15, 23, 42, 0.05)"
                }}>
                  <Grid columns="2" gap="3">
                    <div>
                      <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                        Format
                      </Text>
                      <Text size="2" weight="medium">
                        {supplier.format.toUpperCase()}
                      </Text>
                    </div>
                    <div>
                      <Text size="1" color="gray" style={{ display: "block", marginBottom: "0.25rem" }}>
                        Products
                      </Text>
                      <Text size="2" weight="medium">
                        {supplier.products}
                      </Text>
                    </div>
                  </Grid>
                  <Text size="1" color="gray" style={{ display: "block", marginTop: "0.75rem" }}>
                    Last synced: {supplier.lastSync}
                  </Text>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>
      </div>

      {/* Upload Section */}
      <Card className="stat-card" style={{ background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)" }}>
        <Flex direction="column" gap="3">
          <div>
            <Flex align="center" gap="2" style={{ marginBottom: "0.5rem" }}>
              <UploadIcon style={{ width: 20, height: 20, color: "#667eea" }} />
              <Heading size="4">Upload Catalog</Heading>
            </Flex>
            <Text size="2" color="gray">
              Upload spreadsheets or PDFs to automatically ingest pricing data
            </Text>
          </div>

          <div style={{
            padding: "2rem",
            border: "2px dashed rgba(102, 126, 234, 0.3)",
            borderRadius: "12px",
            background: "white",
            textAlign: "center"
          }}>
            <FileTextIcon style={{ width: 32, height: 32, color: "#667eea", margin: "0 auto 0.5rem" }} />
            <Text size="2" color="gray" style={{ display: "block", marginBottom: "1rem" }}>
              Drag and drop files here or click to browse
            </Text>
            <Flex gap="3" justify="center" align="center">
              <TextField.Root style={{ minWidth: "300px" }}>
                <TextField.Input type="file" placeholder="Choose file..." />
              </TextField.Root>
              <Button
                disabled={!selected}
                size="3"
                style={{
                  background: selected ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : undefined,
                  cursor: selected ? "pointer" : "not-allowed"
                }}
              >
                <UploadIcon />
                Upload
              </Button>
            </Flex>
          </div>

          {selected && (
            <Text size="2" style={{ color: "#667eea" }}>
              Selected supplier: <strong>{selected}</strong>
            </Text>
          )}
        </Flex>
      </Card>
    </div>
  );
}
