export default function TextInput({ label, value, type, onChange, name }) {
  return (
    <div className=" mb-4">
      <label className="capitalize text-2xl font-serif" htmlFor={name}>
        {label}:
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="border-b border-slate-900 p-2 rounded w-full hover:bg-slate-500 focus:bg-slate-700"
      />
    </div>
  );
}
