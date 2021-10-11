export const formatNumberSum = (element, sum) => {
  let totalValue = Number(element.textContent.replaceAll(",", ""));
  totalValue += sum;
  element.innerText = new Intl.NumberFormat("en-US").format(totalValue);
};

export const formatNumberRest = (element, rest) => {
  let totalValue = Number(element.textContent.replaceAll(",", ""));
  totalValue -= rest;
  element.innerText = new Intl.NumberFormat("en-US").format(totalValue);
};

export const formatNumberUs = (text) => {
  let num = Number(text.replaceAll(",", ""));
  if (isNaN(num)) return 0;
  num = num > 999999999 ? 999999 : num;
  return new Intl.NumberFormat("en-US").format(num);
};
