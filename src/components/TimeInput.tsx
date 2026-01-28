type Props = {
  label: string
  value: string
  onChange: (val: string) => void
}

export function TimeInput({ label, value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded px-2 py-1"
      />
    </div>
  )
}
