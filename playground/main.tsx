// playground/main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "../packages/flux-ui/src";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Flux UI Playground
      </h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Variants
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Sizes
        </h2>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          States
        </h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button isLoading>Loading...</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h2
          style={{
            fontSize: "1.125rem",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Click Test
        </h2>
        <Button onClick={() => alert("Clicked!")}>Click Me</Button>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
