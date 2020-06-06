const copy = (value: any) => {
  if (
    typeof value === 'number' ||
    typeof value === 'string' ||
    typeof value === 'boolean'
  ) {
    return value;
  }
  return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
};

export default copy;
export { copy };
