import { useState } from "react"
import { CalendarGrid } from "./components/CalendarGrid"
import { TimeInput } from "./components/TimeInput"
import { combineDateAndTime } from "./Utils/dateUtils"
import { Presets } from "./components/Presets"

const MIN_DAY = 5
const MAX_DAY = 25
const BLACKOUT_DAYS = [10, 14, 21]
const MAX_RANGE_DAYS = 7


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

 const [error, setError] = useState<string | null>(null)



  function handleSelect(day: number) {
  setError(null)

  if (BLACKOUT_DAYS.includes(day)) {
    setError("This date is unavailable.")
    return
  }

  if (day < MIN_DAY || day > MAX_DAY) {
    alert("Selected date is outside allowed range")
    return
  }

  if (range.startDate === null || range.endDate !== null) {
    setRange({ ...range, startDate: day, endDate: null })
  } else {
    const start = range.startDate
    const end = day < start ? start : day
    const newStart = day < start ? day : start

    const duration = Math.abs(end - newStart) + 1

    if (duration > MAX_RANGE_DAYS) {
      alert(`Range cannot exceed ${MAX_RANGE_DAYS} days`)
      return
    }

    setRange({ ...range, startDate: newStart, endDate: end })
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

      <Presets
         onSelectRange={(start, end) =>
         setRange({ ...range, startDate: start, endDate: end })
  }
/>
    </div>

    {/* CALENDAR BELOW */}
    <CalendarGrid
            month={currentMonth}
            year={currentYear}
            range={{ start: range.startDate, end: range.endDate }}
            onSelectDate={handleSelect}
            minDay={MIN_DAY}
            maxDay={MAX_DAY}

    />
     {error && (
  <div className="mt-2 text-sm text-red-600 font-medium">{error}</div>
)}


     <div className="mt-4 text-xs text-gray-600">
          <div><strong>Start:</strong> {startDateTime?.toString() || "—"}</div>
          <div><strong>End:</strong> {endDateTime?.toString() || "—"}</div>
        </div>

  </div>
</div>

  )
}

export default App
