import { solve1, solve2 } from "./solve.js";

const input = await Deno.readTextFile("./input.txt");

Deno.bench("solve1", () => {
  solve1(input);
});
Deno.bench("solve2", () => {
  solve2(input);
});
