import { useState } from "react"
import { CalendarGrid } from "./components/CalendarGrid"
import { TimeInput } from "./components/TimeInput"

type DateTimeRange = {
  startDate: number | null
  endDate: number | null
  startTime: string
  endTime: string
}


function App() {
  const today = new Date()

  const [range, setRange] = useState<DateTimeRange>({
  startDate: null,
  endDate: null,
  startTime: "09:00",
  endTime: "17:00",
})


  function handleSelect(day: number) {
  if (range.startDate === null || range.endDate !== null) {
    setRange({ ...range, startDate: day, endDate: null })
  } else {
    if (day < range.startDate)
      setRange({ ...range, startDate: day, endDate: range.startDate })
    else
      setRange({ ...range, endDate: day })
  }
}


  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="p-6 bg-white rounded-xl shadow-md w-96">

    {/* TIME INPUTS AT TOP */}
    <div className="mb-4 flex gap-4 justify-between">
      <TimeInput
        label="Start Time"
        value={range.startTime}
        onChange={(val) => setRange({ ...range, startTime: val })}
      />

      <TimeInput
        label="End Time"
        value={range.endTime}
        onChange={(val) => setRange({ ...range, endTime: val })}
      />
    </div>

    {/* CALENDAR BELOW */}
    <CalendarGrid
      month={today.getMonth()}
      year={today.getFullYear()}
      range={{ start: range.startDate, end: range.endDate }}
      onSelectDate={handleSelect}
    />

  </div>
</div>

  )
}

export default App
