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

      {/* Upload Section */}
      <Card
        className="stat-card"
        style={{
          background: "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)",
          border: "2px solid rgba(102, 126, 234, 0.1)"
        }}
      >
        <Flex direction="column" gap="4">
          <Flex justify="between" align="start">
            <div>
              <Flex align="center" gap="2" style={{ marginBottom: "0.5rem" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <UploadIcon style={{ width: 20, height: 20, color: "white" }} />
                </div>
                <Heading size="5" style={{ fontWeight: 600 }}>Upload Supplier Catalog</Heading>
              </Flex>
              <Text size="2" color="gray">
                Drag and drop spreadsheets or PDFs to automatically ingest pricing data. Supports CSV, XLSX, and PDF formats.
              </Text>
            </div>
          </Flex>

          <div style={{
            padding: "1.5rem",
            border: "2px dashed rgba(102, 126, 234, 0.3)",
            borderRadius: "12px",
            background: "white",
            transition: "all 0.3s ease"
          }}>
            <Flex gap="3" align="center" wrap="wrap">
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                <FileTextIcon style={{ width: 24, height: 24, color: "#667eea" }} />
              </div>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <Text size="2" weight="medium" style={{ display: "block", marginBottom: "0.25rem" }}>
                  Drop files here or click to browse
                </Text>
                <Text size="1" color="gray">
                  Supports CSV, XLSX, and PDF formats
                </Text>
              </div>
              <Flex gap="2" align="center">
                <TextField.Root style={{ minWidth: "250px" }}>
                  <TextField.Input type="file" placeholder="Choose file..." />
                </TextField.Root>
                <Button
                  disabled={!selected}
                  size="2"
                  style={{
                    background: selected ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : undefined,
                    cursor: selected ? "pointer" : "not-allowed",
                    fontWeight: 600
                  }}
                >
                  <UploadIcon width={14} height={14} />
                  Upload
                </Button>
              </Flex>
            </Flex>
          </div>

          {selected ? (
            <Flex
              align="center"
              gap="2"
              style={{
                padding: "1rem 1.25rem",
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(102, 126, 234, 0.2)"
              }}
            >
              <CheckCircledIcon style={{ width: 18, height: 18, color: "#667eea" }} />
              <Text size="2" style={{ color: "#667eea", fontWeight: 500 }}>
                Ready to upload to: <strong>{selected}</strong>
              </Text>
            </Flex>
          ) : (
            <Flex
              align="center"
              gap="2"
              style={{
                padding: "1rem 1.25rem",
                background: "rgba(100, 116, 139, 0.05)",
                borderRadius: "12px",
                border: "1px solid rgba(100, 116, 139, 0.1)"
              }}
            >
              <Text size="2" color="gray">
                Please select a supplier below before uploading
              </Text>
            </Flex>
          )}
        </Flex>
      </Card>

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
    </div>
  );
}
