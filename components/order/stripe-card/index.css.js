import styled from "styled-components";

export default styled.div`
  .credit-card {
    border: 1px solid #eee;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.02);
    padding: 10px 8px 12px;
    border-radius: 8px;
    font-size: 16px;
    height: 42px;

    &.StripeElement--focus {
      box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.02);
    }
  }
`;