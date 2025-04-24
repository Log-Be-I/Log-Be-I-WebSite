export default function Dropdown({
  name,
  options,
  value,
  onChange,
  placeholder,
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded h-10 px-4 text-base"
    >
      <option value="">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
