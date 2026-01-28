import type { Meta, StoryObj } from "@storybook/react"
import { TimeInput } from "../components/TimeInput"
import { useState } from "react"

const meta: Meta<typeof TimeInput> = {
  title: "Components/TimeInput",
  component: TimeInput,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof TimeInput>

export const StartTime: Story = {
  args: {
    label: "Start Time",
    value: "00:00",
  },
  render: (args) => {
    const [time, setTime] = useState(args.value)

    return (
      <TimeInput
        {...args}
        value={time}
        onChange={setTime}
      />
    )
  },
}

export const EndTime: Story = {
  args: {
    label: "End Time",
    value: "00:00",
  },
  render: (args) => {
    const [time, setTime] = useState(args.value)

    return (
      <TimeInput
        {...args}
        value={time}
        onChange={setTime}
      />
    )
  },
}
