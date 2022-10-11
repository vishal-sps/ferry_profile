import styled from "styled-components";

function ChTextField({
  label = null,
  type,
  onChange,
  onBlur,
  placeholder = "",
  name,
  value,
  errorMessage,
  ...rest
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="mb-1">
          {label}
        </label>
      )}

      <div>
        <StyledInput
          {...rest}
          type={type || "text"}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input"
        />
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
      )}
    </div>
  );
}

const StyledInput = styled.input`
  border-color:${(props) => (props.hasError ? "red" : "#E5E5E5")};
`;

export default ChTextField;
