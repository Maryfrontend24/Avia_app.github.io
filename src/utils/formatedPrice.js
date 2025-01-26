const formatedPrice = (number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumSignificantDigits: 5,
  }).format(number);
};

export default formatedPrice;
