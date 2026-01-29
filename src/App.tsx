import { useState } from "react"
import { CalendarGrid } from "./components/CalendarGrid"
import { TimeInput } from "./components/TimeInput"
import { combineDateAndTime } from "./Utils/dateUtils"

type DateTimeRange = {
  startDate: number | null
  endDate: number | null
  startTime: string
  endTime: string
}



function App() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const [range, setRange] = useState<DateTimeRange>({
  startDate: null,
  endDate: null,
  startTime: "00:00",
  endTime: "00:00",
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

const startDateTime =
  range.startDate !== null
    ? combineDateAndTime(today.getFullYear(), today.getMonth(), range.startDate, range.startTime)
    : null

const endDateTime =
  range.endDate !== null
    ? combineDateAndTime(today.getFullYear(), today.getMonth(), range.endDate, range.endTime)
    : null



  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="p-6 bg-white rounded-xl shadow-md w-96">

    {/* TIME INPUTS */}
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
      month={currentMonth}
      year={currentYear}
      range={{ start: range.startDate, end: range.endDate }}
      onSelectDate={handleSelect}
    />

     <div className="mt-4 text-xs text-gray-600">
          <div><strong>Start:</strong> {startDateTime?.toString() || "—"}</div>
          <div><strong>End:</strong> {endDateTime?.toString() || "—"}</div>
        </div>

  </div>
</div>

  )
}

export default App
