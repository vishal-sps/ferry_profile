import styled from "styled-components";

function GridToScroll({ children, gridCols, gapX, gapXSm = 4, gapY }) {
  return (
    <Wrapper
      className={`flex md:grid md:grid-cols-${gridCols} ${
        gapX ? `md:gap-x-${gapX} gap-x-${gapXSm}` : ""
      } ${gapY ? `gap-y-${gapY}` : ""}`}
    >
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  overflow-x: auto;

  @media screen and (min-width: 768px) {
    overflow-x: unset;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  -webkit-overflow-scrolling: touch;
`;

export default GridToScroll;
