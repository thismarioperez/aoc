import { runSolution } from "../utils.ts";
import {
    type Matrix,
    MATRIX_DIRECTIONS_MAP,
    searchInDirection,
} from "../helpers/matrix.ts";

const DOWN_RIGHT = MATRIX_DIRECTIONS_MAP["down-right"];
const DOWN_LEFT = MATRIX_DIRECTIONS_MAP["down-left"];
const UP_RIGHT = MATRIX_DIRECTIONS_MAP["up-right"];
const UP_LEFT = MATRIX_DIRECTIONS_MAP["up-left"];

const searchForXMAS = (matrix: Matrix<string>): number => {
    let count = 0;
    const searchStr = "MAS";
    const searchOffset = searchStr.length - 1;
    const rows = matrix.length;
    const cols = matrix[0].length;

    // loop over each starting point
    for (let startRow = 0; startRow < rows; ++startRow) {
        for (let startCol = 0; startCol < cols; ++startCol) {
            // out of bounds check
            if (
                startRow + searchOffset >= rows ||
                startCol + searchOffset >= cols
            ) {
                continue; // skip this iteration
            }

            // test each diagonal direction
            if (
                /**
                 * search for
                 * [M, ., M],
                 * [., A, .],
                 * [S, ., S]
                 */
                (searchInDirection(
                    matrix,
                    searchStr,
                    startRow,
                    startCol,
                    DOWN_RIGHT[0],
                    DOWN_RIGHT[1]
                ) &&
                    searchInDirection(
                        matrix,
                        searchStr,
                        startRow,
                        startCol + searchOffset,
                        DOWN_LEFT[0],
                        DOWN_LEFT[1]
                    )) ||
                /**
                 * search for
                 * [M, ., S],
                 * [., A, .],
                 * [M, ., S]
                 */
                (searchInDirection(
                    matrix,
                    searchStr,
                    startRow,
                    startCol,
                    DOWN_RIGHT[0],
                    DOWN_RIGHT[1]
                ) &&
                    searchInDirection(
                        matrix,
                        searchStr,
                        startRow + searchOffset,
                        startCol,
                        UP_RIGHT[0],
                        UP_RIGHT[1]
                    )) ||
                /**
                 * search for
                 * [S, ., S],
                 * [., A, .],
                 * [M, ., M]
                 */
                (searchInDirection(
                    matrix,
                    searchStr,
                    startRow + searchOffset,
                    startCol + searchOffset,
                    UP_LEFT[0],
                    UP_LEFT[1]
                ) &&
                    searchInDirection(
                        matrix,
                        searchStr,
                        startRow + searchOffset,
                        startCol,
                        UP_RIGHT[0],
                        UP_RIGHT[1]
                    )) ||
                /**
                 * search for
                 * [S, ., M],
                 * [., A, .],
                 * [S, ., M]
                 */
                (searchInDirection(
                    matrix,
                    searchStr,
                    startRow + searchOffset,
                    startCol + searchOffset,
                    UP_LEFT[0],
                    UP_LEFT[1]
                ) &&
                    searchInDirection(
                        matrix,
                        searchStr,
                        startRow,
                        startCol + searchOffset,
                        DOWN_LEFT[0],
                        DOWN_LEFT[1]
                    ))
            ) {
                count += 1;
            }
        }
    }

    return count;
};

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
    console.log(data);

    // convert data to matrix
    const matrix: Matrix<string> = data.map((str) => [...str.split("")]);

    const count = searchForXMAS(matrix);

    return count;
}

await runSolution(day4b);
