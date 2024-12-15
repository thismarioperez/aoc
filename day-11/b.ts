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

const processData = (data: number[], iterations: number): number[] => {
    const transform = (
        arr: number[],
        remainingIterations: number
    ): number[] => {
        if (remainingIterations === 0) {
            return arr;
        }

        const transformedArr: number[] = [];

        for (const value of arr) {
            if (value === 0) {
                // console.log(`${i} - rule 1`);
                transformedArr.push(1);
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

                transformedArr.push(left);
                transformedArr.push(right);
                // console.log(`${i} - rule 2`, {
                //     numArr,
                //     mid,
                //     left: numArr.slice(0, mid),
                //     right: numArr.slice(mid),
                // });
            } else {
                // console.log(`${i} - rule 3`);
                transformedArr.push(value * 2024);
            }
        }

        console.log(`iteration - ${iterations - remainingIterations + 1}`);
        return transform(transformedArr, remainingIterations - 1);
    };

    const result = transform(data, iterations);
    return result;
};

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
    const input = parseData(data);
    const result = processData(input, 75);
    console.log(result);
    const total = result.length;
    return total;
}

await runSolution(day11b);
