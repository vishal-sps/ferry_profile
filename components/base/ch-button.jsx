import React from "react";
import styled from "styled-components";

function ChButton({ children, onClick, disabled, hasIcon = true, ...rest }) {
  return (
    <Button {...rest} onClick={onClick} disabled={disabled}>
      {children}
      {hasIcon && (
        <svg
          id="Group_11691"
          data-name="Group 11691"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          className="ml-1"
        >
          <path
            id="Path_3033"
            data-name="Path 3033"
            d="M0,0H22V22H0Z"
            fill="none"
          />
          <line
            id="Line_147"
            data-name="Line 147"
            x2="12.833"
            transform="translate(4.583 11)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <line
            id="Line_148"
            data-name="Line 148"
            y1="5.5"
            x2="5.5"
            transform="translate(11.917 11)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <line
            id="Line_149"
            data-name="Line 149"
            x2="5.5"
            y2="5.5"
            transform="translate(11.917 5.5)"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      )}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  align-items: center;
  border-radius: 8px;
`;

export default ChButton;
