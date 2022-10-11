import Check from "./check.svg";

function OrderProgressItem({ number, name, isActive, isComplete,isVisted, onClick }) {
  return (
    <button
      className={`flex md:flex-row flex-col items-center font-semibold md:text-base text-sm ${
        isComplete ? "cursor-pointer" : "cursor-not-allowed"
      }`}
      disabled={!isComplete}
      onClick={onClick}
    >

      <div
        className={`${
          isActive 
            ? "bg-red-500 text-white" : isComplete ? "border-primary border-2"
            : "bg-gray-100 text-gray-400"
        } md:h-10 h-8 md:w-10 w-8 rounded-full flex items-center justify-center md:mr-2 md:mb-0 mb-1`}
      >
        {isComplete ? <Check className={`${isActive ? 'icon-white':""}`} /> : number}
      </div>
      <span className="font-semibold text-xs md:text-sm">{name}</span>
      
    </button>
  );
}

export default OrderProgressItem;
