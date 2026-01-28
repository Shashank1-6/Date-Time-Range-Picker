import { useState } from "react"
import { CalendarGrid } from "./components/CalendarGrid"

type Range = {
  start: number | null
  end: number | null
}

function App() {
  const today = new Date()

  const [range, setRange] = useState<Range>({
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CalendarGrid
        month={today.getMonth()}
        year={today.getFullYear()}
        range={range}
        onSelectDate={handleSelect}
      />
    </div>
  )
}

export default App
