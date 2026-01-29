import type { Meta, StoryObj } from "@storybook/react"
import { TimeInput } from "../components/TimeInput"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" }, // logs in Actions tab
  },
}

export default meta
type Story = StoryObj<typeof TimeInput>

// 🔹 START TIME
export const StartTime: Story = {
  args: {
    label: "Start Time",
    value: "09:00",
  },
}

// 🔹 END TIME
export const EndTime: Story = {
  args: {
    label: "End Time",
    value: "17:00",
  },
}

// 🔹 RANGE DEMO
export const CombinedDateTimeRange: Story = {
  render: (args) => {
    const start = args.value || "09:00"
    const end = "17:00"

    const baseDateStart = new Date(2026, 0, 10)
    const baseDateEnd = new Date(2026, 0, 15)

    const startDateTime = new Date(
      baseDateStart.getFullYear(),
      baseDateStart.getMonth(),
      baseDateStart.getDate(),
      ...start.split(":").map(Number)
    )

    const endDateTime = new Date(
      baseDateEnd.getFullYear(),
      baseDateEnd.getMonth(),
      baseDateEnd.getDate(),
      ...end.split(":").map(Number)
    )

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <TimeInput {...args} />
          <TimeInput label="End Time" value={end} onChange={() => {}} />
        </div>

        <div className="text-sm text-gray-600">
          <div><strong>Start:</strong> {startDateTime.toString()}</div>
          <div><strong>End:</strong> {endDateTime.toString()}</div>
        </div>
      </div>
    )
  },
  args: {
    label: "Start Time",
    value: "09:00",
  },
}
