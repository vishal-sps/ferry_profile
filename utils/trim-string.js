const trimString = (value, maxStringLength) =>
  value.length > maxStringLength
    ? `${value.substring(0, maxStringLength)}...`
    : value;

export default trimString;
