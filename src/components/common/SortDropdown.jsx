export default function SortDropdown({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="border rounded h-10 px-4 text-base"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
