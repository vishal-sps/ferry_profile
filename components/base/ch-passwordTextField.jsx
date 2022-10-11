import styled from "styled-components";
import {useState} from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

function ChPasswordTextField({
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

    const [toggle, setToggle] = useState(true)

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
          type={!toggle?'text':'password'}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          className="form-input"
         
        />
        { <span className="eye" style={{marginLeft:"-30px", cursor:"pointer"}} onClick={()=>setToggle(!toggle)}><i className={toggle ?`bi bi-eye-fill` : `bi bi-eye-slash-fill`}></i></span> }
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

export default ChPasswordTextField;