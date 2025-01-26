const stopsToString = (arr) => {
  if (arr.length === 0) {
    return '';
  }
  return arr.join(', ');
};

export default stopsToString;
