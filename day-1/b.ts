import { runSolution } from "../utils.ts";

function countOccurencies<T>(needle: T, arr: T[]): number {
    let count = 0;

    arr.forEach((item) => {
        if (item === needle) {
            count += 1;
        }
    });

    return count;
}

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
    console.log(data);

    //shape the data correctly
    const list1 = data.map((x) => parseInt(x.split("   ")[0]));
    const list2 = data.map((x) => parseInt(x.split("   ")[1]));

    // count occurences of list1 items in list2
    const list1SetArr = Array.from(new Set(list1)); // use set to calc frequency without repeating
    const frequencyMap = [...list1SetArr].reduce((acc, num) => {
        acc.set(num, countOccurencies(num, list2));
        return acc;
    }, new Map());

    // calc similarity score for each item in list1
    const similarity = list1.reduce(
        (acc, num) => (acc += num * frequencyMap.get(num)),
        0
    );

    return similarity;
}

await runSolution(day1b);
