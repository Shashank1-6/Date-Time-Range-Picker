import { useState } from "react"

function App() {
  const today = new Date()

  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const startDay = new Date(currentYear, currentMonth, 1).getDay()

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ]

  function goToPreviousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(prev => prev - 1)
    } else {
      setCurrentMonth(prev => prev - 1)
    }
  }

  function goToNextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(prev => prev + 1)
    } else {
      setCurrentMonth(prev => prev + 1)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md w-80">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={goToPreviousMonth}>◀</button>
          <h2 className="font-bold">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={goToNextMonth}>▶</button>
        </div>

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 text-center font-semibold mb-2">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={"empty-" + i}></div>
          ))}

          {daysArray.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`p-2 rounded text-center
                ${selectedDate === day ? "bg-blue-500 text-white" : "bg-blue-100"}`}
            >
              {day}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App
