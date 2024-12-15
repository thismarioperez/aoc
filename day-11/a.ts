import { runSolution } from "../utils.ts";

const parseData = (data: string[]): number[] =>
    data[0].split(" ").map((s) => parseInt(s));

// Loop over list of "stones"
// For each stone, do the following;
// 1. If value is 0, replace it with 1
// 2. If the number contains an even number of digits,
//    replace it with 2 stones, splitting the digits in half.
//    Eg. 1234 => 12 34
//    If the right half contains only zeros, drop the extra zeros.
// 3. If no other rule applies, multiply the value by 2024

const processData = (data: number[]): number[] => {
    // buffer stores each index as an array of numbers.
    // this let's us split the current index into 2 numbers for rule 2
    const result: number[] = [];

    for (const value of data) {
        if (value === 0) {
            // console.log(`${i} - rule 1`);
            result.push(1);
        } else if (value.toString().length % 2 === 0) {
            // console.log(`${i} - rule 2`);
            const numString = value.toString();
            const numArr = numString.split("").map((s) => parseInt(s));
            const mid = Math.floor(numString.length / 2);
            const left = parseInt(
                numArr
                    .slice(0, mid)
                    .map((n) => n.toString())
                    .join("")
            );
            const right = parseInt(
                numArr
                    .slice(mid)
                    .map((n) => n.toString())
                    .join("")
            );

            result.push(left);
            result.push(right);
            // console.log(`${i} - rule 2`, {
            //     numArr,
            //     mid,
            //     left: numArr.slice(0, mid),
            //     right: numArr.slice(mid),
            // });
        } else {
            // console.log(`${i} - rule 3`);
            result.push(value * 2024);
        }
    }

    return result;
};

const iterate = (data, iterations: number) => {
    for (let i = 0; i < iterations; ++i) {
        console.log(`iteration - ${i + 1}`);
        data = processData(data);
    }

    return data;
};

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
    // console.log(data);
    const input = parseData(data);
    const result = iterate(input, 25);
    const total = result.length;
    return total;
}

await runSolution(day11a);
