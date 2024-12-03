import { runSolution } from "../utils.ts";

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
    console.log(data);
    //shape the data correctly
    const list1 = data.map((x) => parseInt(x.split("   ")[0]));
    const list2 = data.map((x) => parseInt(x.split("   ")[1]));

    // sort lists in asscending order
    list1.sort((a, b) => a - b);
    list2.sort((a, b) => a - b);

    // get the distances between each array item
    let b = 0;
    const distances = list1.map((a, idx) => {
        b = list2[idx];

        return Math.abs(a - b);
    });

    // sum
    const totalDistance = distances.reduce(
        (acc, current) => (acc += current),
        0
    );

    return totalDistance;
}

await runSolution(day1a);
