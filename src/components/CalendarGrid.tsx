type Range = {
  start: number | null
  end: number | null
}

type Props = {
  month: number
  year: number
  range: Range
  onSelectDate: (day: number) => void
  minDay?: number
  maxDay?: number
  blackoutDays?: number[]

}

export function CalendarGrid({ month, year, range, onSelectDate, minDay, maxDay, blackoutDays }: Props) {
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDay = new Date(year, month, 1).getDay()

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div>
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDay }).map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {daysArray.map(day => {
          const isStart = range.start === day
          const isEnd = range.end === day
          const inRange =
            range.start !== null &&
            range.end !== null &&
            day > range.start &&
            day < range.end

          const MAX_RANGE_DAYS = 7  
          const wouldExceed =
            range.start !== null &&
            range.end === null &&
            Math.abs(day - range.start) + 1 > MAX_RANGE_DAYS
          
          const isBlackout = blackoutDays?.includes(day)
          const isDisabled =isBlackout || (minDay !== undefined && day < minDay) || (maxDay !== undefined && day > maxDay)

          return (
            <button
              key={day}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelectDate(day)}
              className={`p-2 rounded text-center
                   ${isDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed" :
                   isBlackout ? "bg-black text-white cursor-not-allowed" :
                   wouldExceed ? "bg-red-100 text-red-400 cursor-not-allowed" :
                   isStart || isEnd ? "bg-blue-600 text-white" :
                   inRange ? "bg-blue-200"  :
                "bg-blue-100"}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
