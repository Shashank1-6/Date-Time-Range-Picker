import type { Meta, StoryObj } from "@storybook/react"
import { CalendarGrid } from "../components/CalendarGrid"
import { useState } from "react"

const meta: Meta<typeof CalendarGrid> = {
  title: "Components/CalendarGrid",
  component: CalendarGrid,
  argTypes: {
    month: { control: { type: "number", min: 0, max: 11 } },
    year: { control: "number" },
  },
}

export default meta

type Story = StoryObj<typeof CalendarGrid>

export const Default: Story = {
  args: { month: 0, year: 2026 },
  render: (args) => {
    const [range, setRange] = useState<{ start: number | null; end: number | null }>({
      start: null,
      end: null,
    })

    function handleSelect(day: number) {
      if (range.start === null || range.end !== null) {
        setRange({ start: day, end: null })
      } else {
        if (day < range.start) setRange({ start: day, end: range.start })
        else setRange({ start: range.start, end: day })
      }
    }

    return (
      <CalendarGrid
        {...args}
        range={range}
        onSelectDate={handleSelect}
      />
    )
  },
}


export const RangeSelection: Story = {
  args: { month: 0, year: 2026 },
  render: (args) => {
    const [range, setRange] = useState<{ start: number | null; end: number | null }>({
      start: null,
      end: null,
    })

    function handleSelect(day: number) {
      if (range.start === null || range.end !== null) {
        setRange({ start: day, end: null })
      } else {
        if (day < range.start) setRange({ start: day, end: range.start })
        else setRange({ start: range.start, end: day })
      }
    }

    return (
      <CalendarGrid
        {...args}
        range={range}
        onSelectDate={handleSelect}
      />
    )
  },
}
