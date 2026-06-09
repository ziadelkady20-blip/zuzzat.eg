/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-require-imports, react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";

jest.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require("react");
  const MP = new Set([
    "whileTap", "whileHover", "whileFocus", "whileInView", "whileDrag",
    "initial", "animate", "exit", "transition", "variants", "layout",
  ]);
  return {
    motion: new Proxy(
      {},
      {
        get: (_t: unknown, prop: string) =>
          R.forwardRef((props: Record<string, unknown>, ref: unknown) => {
            const filtered: Record<string, unknown> = {};
            for (const [k, v] of Object.entries(props)) {
              if (!MP.has(k)) filtered[k] = v;
            }
            return R.createElement(prop, { ...filtered, ref });
          }),
      }
    ),
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
      R.createElement(R.Fragment, null, children),
  };
});

import Badge from "@/components/ui/Badge";
import StatCard from "@/components/ui/StatCard";

// ── Badge ───────────────────────────────────────────────
describe("Badge", () => {
  it("renders children text", () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies gray variant by default", () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass("bg-gray-100");
  });

  it("applies blue variant classes", () => {
    const { container } = render(<Badge variant="blue">Info</Badge>);
    expect(container.firstChild).toHaveClass("text-[#1E3ABA]");
  });

  it("applies green variant classes", () => {
    const { container } = render(<Badge variant="green">OK</Badge>);
    expect(container.firstChild).toHaveClass("bg-green-50");
  });

  it("applies orange variant classes", () => {
    const { container } = render(<Badge variant="orange">Warn</Badge>);
    expect(container.firstChild).toHaveClass("bg-orange-50");
  });

  it("applies red variant classes", () => {
    const { container } = render(<Badge variant="red">Error</Badge>);
    expect(container.firstChild).toHaveClass("bg-red-50");
  });
});

// ── StatCard ────────────────────────────────────────────
describe("StatCard", () => {
  const props = {
    icon: "📦",
    iconBg: "#EEF1FF",
    value: "1,234",
    label: "Total Orders",
  };

  it("renders icon, value, and label", () => {
    render(<StatCard {...props} />);
    expect(screen.getByText("📦")).toBeInTheDocument();
    expect(screen.getByText("1,234")).toBeInTheDocument();
    expect(screen.getByText("Total Orders")).toBeInTheDocument();
  });

  it("renders change text when provided", () => {
    render(<StatCard {...props} change="+12%" changeType="up" />);
    expect(screen.getByText("+12%")).toBeInTheDocument();
    expect(screen.getByText("+12%")).toHaveClass("text-green-500");
  });

  it("renders down change with red styling", () => {
    render(<StatCard {...props} change="-5%" changeType="down" />);
    expect(screen.getByText("-5%")).toHaveClass("text-red-400");
  });

  it("does not render change when not provided", () => {
    const { container } = render(<StatCard {...props} />);
    const changeElements = container.querySelectorAll(".text-green-500, .text-red-400");
    expect(changeElements).toHaveLength(0);
  });
});
