import { runSolution } from "../utils.ts";
import {
    searchMatrixForStringOccurences,
    type Matrix,
} from "../helpers/matrix.ts";

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
    console.log(data);

    // convert to matrix
    const matrix: Matrix<string> = data.map((x) => x.split(""));

    let count = 0;

    count += searchMatrixForStringOccurences(matrix, "XMAS");

    return count;
}

await runSolution(day4a);
