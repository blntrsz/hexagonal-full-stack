function getRandomNumber(min = 500, max = 2000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function wait() {
  return new Promise(resolve => setTimeout(resolve, getRandomNumber()))
}

