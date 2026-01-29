import type { Meta, StoryObj } from "@storybook/react"
import { CalendarGrid } from "../components/CalendarGrid"

const meta: Meta<typeof CalendarGrid> = {
  title: "Components/CalendarGrid",
  component: CalendarGrid,
  argTypes: {
    month: { control: { type: "number", min: 0, max: 11 } },
    year: { control: "number" },
    range: { control: "object" },
    onSelectDate: { action: "date-clicked" },
  },
}

export default meta
type Story = StoryObj<typeof CalendarGrid>

// 🔹 DEFAULT VIEW
export const Default: Story = {
  args: {
    month: 0,
    year: 2026,
    range: { start: null, end: null },
  },
}

// 🔹 RANGE PREVIEW
export const WithRange: Story = {
  args: {
    month: 0,
    year: 2026,
    range: { start: 5, end: 12 },
  },
}
