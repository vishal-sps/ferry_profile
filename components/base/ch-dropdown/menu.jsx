import React from "react";
import styled, { keyframes } from "styled-components";

function menu({ options, handleOnClick }) {
  return (
    <StyledSection style={{ width }}>
      {options.map((option) => (
        <StyledList
          tabIndex={option._id}
          key={option._id}
          onClick={() => handleOnClick(option._id)}
        >
          {option.name}
          <span style={{ fontSize: "10px" }}>
            {" "}
            {option.type ? `(${option.type})` : ""}
          </span>
        </StyledList>
      ))}
    </StyledSection>
  );
}

const menuAnimation = keyframes`
    from {
      transform: translate3d(0, 30px, 0);
    }
    to {
      transform: translate3d(0, 20px, 0);
    }
  `;

const StyledSection = styled.div`
  border-radius: 5px;
  z-index: 0;
  margin-top: 0.25rem;
  position: absolute;
  top: 50px;
  max-height: 256px;
  overflow-y: auto;
  padding-left: 18px;
  padding-right: 18px;
  background: #ffffff;
  box-shadow: 0px 1px 2px rgba(45, 49, 66, 0.06), 0px 1px 3px rgba(8, 7, 8, 0.1);
  animation: ${menuAnimation} 0.3s ease forwards;
`;

const StyledList = styled.div`
  padding: 5px;
  &:hover {
    color: #ffffff;
    background: #e23744;
    cursor: pointer;
  }
`;

export default menu;
