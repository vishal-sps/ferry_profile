// import useOrderProgress from "../../../custom-hooks/use-order-progess";

import OrderProgressItem from "./order-progress-item";

function OrderProgress({ step, updateStep, hasCompletedStep , handleCartBelow150Mins }) {
  //const { hasCompletedStep, step, updateStep } = useOrderProgress();

  return (
    <div className="flex md:items-center justify-center mb-12 md:mb-20">
      <OrderProgressItem
        isActive={step == 0}
        isComplete={true}
        onClick={() => updateStep(0)}
        name="Cart"
        number="1"
      />

      <div
        className={`border-t-2 w-full border-dashed ${
          hasCompletedStep(1) ? "border-red-500" : ""
        } md:mt-0 mt-3 md:ml-2 md:mr-2 ml-2`}
      ></div>

      <OrderProgressItem
        isActive={step == 1}
        isComplete={hasCompletedStep(2)}
        // onClick={() => updateStep(1)}
        onClick={() => handleCartBelow150Mins(true)}

        name="Address"
        number="2"
      />

      <div
        className={`border-t-2 w-full border-dashed ${
          hasCompletedStep(2) ? "border-red-500":""
        } md:mt-0 mt-3 md:ml-2 md:mr-2`}
      ></div>

      <OrderProgressItem
        isActive={step == 2}
        isComplete={hasCompletedStep(3)}
        onClick={() => updateStep(2)}
        name="Payments"
        number="3"
      />
    </div>
  );
}

export default OrderProgress;
