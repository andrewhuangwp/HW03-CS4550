// Returns true if input is valid. Input has to be four unique digits.
export function validateInput(guess) {
  if (guess.length !== 4) {
    return false;
  }
  let used = [];
  for (let i = 0; i < 4; i++) {
    let digit = parseInt(guess.charAt(i));
    if (isNaN(digit) || used.includes(digit)) {
      return false;
    }
    used.push(digit);
  }
  return true;
}

// Determine how many characters are correct and in right index.
export function countBulls(guess, secret) {
  let count = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) === secret.charAt(i)) {
      count++;
    }
  }
  return count;
}

// Determine how many characters are correct and in wrong index.
export function countCows(guess, secret) {
  let count = 0;
  for (let i = 0; i < guess.length; i++) {
    let digit = guess.charAt(i);
    if (secret.indexOf(digit) !== -1 && secret.indexOf(digit) !== i) {
      count++;
    }
  }
  return count;
}
