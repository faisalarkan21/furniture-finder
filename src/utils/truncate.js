function truncate(input = '', maxChar = 0) {
  if (input.length > 5) {
    return `${input.substring(0, maxChar)}... (Read More)`;
  }
  return input;
}

export default truncate;
