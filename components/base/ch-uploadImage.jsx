import styled from "styled-components";
import {useRef} from 'react'
import Image from "next/image";
import Button from "@material-ui/core/Button";
import { myLoader } from "../../services/custom_loader";

function UploadImagesField({
  label = null,
  type,
  onChange,
  onBlur,
  placeholder = "",
  name,
  value,
  errorMessage,
  fileName,
  ...rest
}) {


    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
      };

      console.log('phto', Object.values(fileName)[1]);
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={label} className="mb-1">
          {label}
        </label>
      )}

      <div>
        <input 
          {...rest}
          type={type || "text"}
          name={name}
          value={value}
          ref={hiddenFileInput}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          style={{display:"none"}}
          accept="image/png, image/jpeg, image/jpg"
        />
        <div>

        </div>
        <div>
        <StyledDiv  onClick={handleClick} fileName={fileName} >
         {
            Object.values(fileName)[1] ? <>
                <Image src={fileName.src} className='profileImg' width="142px" height={'142px'} loader={myLoader} />
            </> : 
             <>
             <i className="fa fa-camera" style={{fontSize:"15px"}} > </i>  
                <div style={{padding:"5px"}}>
                {fileName?.src ? fileName.name : 'Add photo '}
               </div>
             </>
        }
        </StyledDiv>
        <StyledP>
          {fileName.name ? fileName.name : "" }
        </StyledP>
        </div>
        {fileName.src ? 
         <Button variant="outlined" size="small" onClick={handleClick} >
          Change photo
        </Button>: ""}
        
         {/* <StyledButton onClick={handleClick}><> 
         <i className="fa fa-camera" style={{fontSize:"20px"}} > </i>   
          <span style={{paddingLeft:"10px"}}> {fileName ? fileName : 'Upload Profile photo'}  </span></></StyledButton>  */}
      </div>

      {errorMessage && (
        <div className="text-sm text-red-500 mt-1">{errorMessage}</div>
      )}
    </div>
  );
}

const StyledDiv = styled.div`
  height: 142px;
  border: 1px solid ${(props) => (props.hasError ? "red" : "#ccc")};
  border-radius: 8px;
  width: 142px;
  display: flex;
  align-items: center;
  background: #E5E4E2;
  padding: ${(props) => (props.fileName.src ? "" : "25px")};
  line-height: 15px;
  cursor: pointer;
  position: relative
`;
const StyledP = styled.div`
  font-size: 12px;
  margin: 5px 0;
`;

export default UploadImagesField;
