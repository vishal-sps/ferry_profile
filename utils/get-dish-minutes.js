const getDishMinutes = (cookingInfo, dishCount = 0) => {
  if (!dishCount) return 0;
  const result = cookingInfo.find((item) => item.person == dishCount);
  if (!result) return 0;
  return result.timeInMinutes;
};

export default getDishMinutes;
