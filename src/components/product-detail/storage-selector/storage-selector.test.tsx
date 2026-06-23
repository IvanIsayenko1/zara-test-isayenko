import { afterEach, describe, expect, it, vi } from "vitest";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import StorageSelector from "./storage-selector";

const options = ["256 GB", "512 GB", "1 TB"] as const;

describe("StorageSelector", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the title and storage options", () => {
    render(<StorageSelector title="Storage" options={options} value={null} onSelect={vi.fn()} />);

    expect(screen.getByText("Storage")).toBeInTheDocument();
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("selects an option and calls onSelect", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <StorageSelector title="Storage" options={options} value={null} onSelect={onSelect} />
    );

    fireEvent.click(screen.getByText("512 GB"));

    expect(onSelect).toHaveBeenCalledWith("512 GB");
    expect(container.querySelectorAll(".storage-selector__option")[1]).toHaveClass(
      "storage-selector__option--selected"
    );
  });

  it("marks the initial value as selected", () => {
    const { container } = render(
      <StorageSelector title="Storage" options={options} value="1 TB" onSelect={vi.fn()} />
    );

    expect(container.querySelectorAll(".storage-selector__option")[2]).toHaveClass(
      "storage-selector__option--selected"
    );
  });
});
