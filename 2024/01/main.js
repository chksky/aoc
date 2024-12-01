import { solve } from "./solve.js";

const input = await Deno.readTextFile("./input.txt");

console.log(solve(input));
