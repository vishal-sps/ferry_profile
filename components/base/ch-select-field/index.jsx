import Down from "./down.svg";

function ChSelectField({
  options = [],
  defaultOption = { name: "Select", value: "" },
  onChange,
  value,
  className,
  name,
  id,
}) {
  return (
    <div className="relative h-full">
      <select
        className={`md:text-base text-sm focus:outline-none appearance-none bg-white w-full h-full px-5 ${className}`}
        onChange={onChange}
        value={value}
        id={id}
        name={name}
      >
        <option disabled value="">
          {defaultOption.name || "Select"}
        </option>

        {options.length &&
          options.map(({ value, name }, index) => (
            <option value={value} key={index}>
              {name}
            </option>
          ))}
      </select>
      <Down className="absolute right-5 top-1/2 transform -translate-y-1/2" />
    </div>
  );
}

export default ChSelectField;
