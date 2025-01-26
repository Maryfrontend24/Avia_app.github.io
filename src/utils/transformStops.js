function transformStops(count) {
  if (count === 0) {
    return 'Без пересадок';
  }

  const lastDigit = count % 10;
  const lastDigits2 = count % 100;

  let suffix;
  if (lastDigit === 1 && lastDigits2 !== 11) {
    suffix = 'пересадка';
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    (lastDigits2 < 10 || lastDigits2 >= 20)
  ) {
    suffix = 'пересадки';
  } else {
    suffix = 'пересадок';
  }

  return `${count} ${suffix}`;
}

export default transformStops;
