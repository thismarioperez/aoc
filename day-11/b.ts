import { runSolution } from "../utils.ts";

const parseData = (data: string[]): number[] =>
    data[0].trim().split(" ").map(Number);

// Loop over list of "stones"
// For each stone, do the following;
// 1. If value is 0, replace it with 1
// 2. If the number contains an even number of digits,
//    replace it with 2 stones, splitting the digits in half.
//    Eg. 1234 => 12 34
//    If the right half contains only zeros, drop the extra zeros.
// 3. If no other rule applies, multiply the value by 2024

// Memory can't process stones individually.
// Since stones don't change index, we can can count them within their group
// starting from the first iteration of a stone.

const cache = new Map<string, number>();

// this will recursive walk the depth of a stone and return the count of stones
// that were created
const blink = (stone: number, iteration): number => {
    const key = `${stone}--${iteration}`;

    if (cache.has(key)) {
        return cache.get(key);
    }

    if (iteration === 0) {
        return 1;
    }

    let count = 0;

    // count the number of new stones for each blink rule
    if (stone === 0) {
        // walk the tree of stones from a root of 1
        count = blink(1, iteration - 1);
    } else if (stone.toString().length % 2 === 0) {
        // walk the tree of stones from the new left and right stones
        const mid = Math.floor(stone.toString().length / 2);
        const left = parseInt(stone.toString().slice(0, mid));
        const right = parseInt(stone.toString().slice(mid));

        count = blink(left, iteration - 1) + blink(right, iteration - 1);
    } else {
        // walk the tree of stones from a root of the stone * 2024
        count = blink(stone * 2024, iteration - 1);
    }

    // save to cache
    cache.set(key, count);

    return count;
};

/** provide your solution as the return of this function */

const ITERATIONS = 75;
export async function day11b(data: string[]) {
    const input = parseData(data);
    console.log(input);
    let total = 0;

    for (const stone of input) {
        total += blink(stone, ITERATIONS);
    }

    return total;
}

await runSolution(day11b);
