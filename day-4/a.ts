import { runSolution } from "../utils.ts";
import {
    type Matrix,
    MATRIX_DIRECTIONS,
    searchInDirection,
} from "../helpers/matrix.ts";

export const searchForXMAS = (matrix: Matrix<string>): number => {
    const searchStr = "XMAS";
    const rows = matrix.length;
    const cols = matrix[0].length;

    let count = 0;

    // Search from each starting position in the matrix
    for (let startRow = 0; startRow < rows; ++startRow) {
        for (let startCol = 0; startCol < cols; ++startCol) {
            // loop through each direction
            for (const [dx, dy] of MATRIX_DIRECTIONS) {
                if (
                    searchInDirection(
                        matrix,
                        searchStr,
                        startRow,
                        startCol,
                        dx,
                        dy
                    )
                ) {
                    count += 1;
                }
            }
        }
    }

    return count;
};

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
    console.log(data);

    // convert to matrix
    const matrix: Matrix<string> = data.map((x) => x.split(""));

    let count = 0;

    count += searchForXMAS(matrix);

    return count;
}

await runSolution(day4a);
