const parse = (input) => {
  return input.split(/\n/).map((r) => {
    const parts = r.split(": ");
    const target = Number(parts[0]);
    const numbers = parts[1].split(" ").map(Number);
    return { target, numbers };
  });
};

const genCombinations = (operators, targetLength) => {
  if (targetLength == 1) return [...operators];

  const combinations = [];

  for (const operator of operators) {
    for (const smCombination of genCombinations(operators, targetLength - 1)) {
      combinations.push([operator, ...smCombination]);
    }
  }

  return combinations;
};

const evaluate = (numbers, operators) => {
  let left = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    const right = numbers[i];
    const operator = operators[i - 1];

    if (operator == "*") left = left * right;
    else if (operator == "+") left = left + right;
    else left = Number(`${left}${right}`);
  }

  return left;
};

const canBeTrue = (target, numbers, operators) => {
  const combinations = genCombinations(operators, numbers.length - 1);

  for (const combination of combinations) {
    if (evaluate(numbers, combination) === target) return true;
  }

  return false;
};

export const solve1 = (input) => {
  const rows = parse(input);

  let sum = 0;
  for (const row of rows) {
    if (canBeTrue(row.target, row.numbers, ["+", "*"])) sum += row.target;
  }
  return sum;
};

export const solve2 = (input) => {
  const rows = parse(input);

  let sum = 0;
  for (const row of rows) {
    if (canBeTrue(row.target, row.numbers, ["+", "*", "||"])) sum += row.target;
  }
  return sum;
};
