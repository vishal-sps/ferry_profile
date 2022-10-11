function CartButton({ count, onClick, hasExceeded }) {
  if (count)
    return (
      <div className="flex">
        <span className="flex flex-row-reverse items-center h-10 w-auto border border-2 border-gray-300 px-2 font-medium rounded-lg">
          <button
            className={`text-3xl font-light ${
              hasExceeded ? "cursor-not-allowed text-gray-200" : "text-primary"
            }`}
            onClick={() => onClick("INCREMENT")}
            disabled={hasExceeded}
          >
            {"+"}
          </button>
          <h6 className="px-8 h6">
          {count}
          </h6>
          <button
            className="text-3xl font-light text-primary"
            onClick={() => onClick("DECREMENT")}
          >
            {"-"}
          </button>
        </span>
      </div>
    );

  return (
    <button
      className="h-10 border border-black px-7 font-medium rounded-lg"
      onClick={() => onClick("ADD")}
    >
      <span className="font-semibold text-red-600">+</span> ADD
    </button>
  );
}

export default CartButton;
