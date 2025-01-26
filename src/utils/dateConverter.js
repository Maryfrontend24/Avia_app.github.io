const dateConverter = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;

  if (hours === 0 && remainMinutes === 0) {
    return '00м';
  }

  let result = '';

  if (hours > 0) {
    result += `${hours}ч `;
  }

  if (remainMinutes > 0 || hours === 0) {
    result += `${remainMinutes}м`;
  }

  return result.trim();
};

export default dateConverter;

console.log(dateConverter(184));
