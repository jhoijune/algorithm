/*
Write a palindrome matching function, which ignores characters other than English alphabet and
digits. String "Madam, I'm Adam." should return true.
*/

const ex06 = (str: string): boolean => {
  const trimmed = str.replace(/[^0-9a-zA-Z]/gi, '');
  const stack = [];
  const size = trimmed.length;
  let index = 0;
  for (; index < Math.floor(size / 2); index++) {
    const char = trimmed[index].toLowerCase();
    stack.push(char);
  }
  index = Math.ceil(size / 2);
  for (; index < size; index++) {
    const popped = stack.pop()!;
    const char = trimmed[index].toLowerCase();
    if (popped !== char) {
      return false;
    }
  }
  return true;
};

(() => {
  console.log(ex06("Madam, I'm Adam."));
})();
