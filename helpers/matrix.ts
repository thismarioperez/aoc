export type Matrix<T> = T[][];

// direction vectors
export const MATRIX_DIRECTIONS = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
    [1, 1], // down right
    [1, -1], // down left
    [-1, 1], // up right
    [-1, -1], // up left
];

export const MATRIX_DIRECTIONS_MAP = {
    right: MATRIX_DIRECTIONS[0],
    left: MATRIX_DIRECTIONS[1],
    down: MATRIX_DIRECTIONS[2],
    up: MATRIX_DIRECTIONS[3],
    "down-right": MATRIX_DIRECTIONS[4],
    "down-left": MATRIX_DIRECTIONS[5],
    "up-right": MATRIX_DIRECTIONS[6],
    "up-left": MATRIX_DIRECTIONS[7],
};

/**
 * Searches for a given string in a specific direction within a matrix.
 *
 * @param matrix - A 2D array of strings representing the matrix to be searched.
 * @param searchStr - The string to search for within the matrix.
 * @param startRow - The starting row index of the search.
 * @param startCol - The starting column index of the search.
 * @param dx - The row direction of the search (1 for down, -1 for up).
 * @param dy - The column direction of the search (1 for right, -1 for left).
 * @returns true if the string is found in the matrix, false otherwise.
 */
export const searchInDirection = (
    matrix: Matrix<string>,
    searchStr: string,
    startRow: number,
    startCol: number,
    dx: number,
    dy: number
): boolean => {
    const rows = matrix.length;
    const cols = matrix[0].length;

    const endRow = startRow + (searchStr.length - 1) * dx;
    const endCol = startCol + (searchStr.length - 1) * dy;

    // check if search direction has enough space to search for the string
    const isEnoughSpace =
        endRow >= 0 && endRow < rows && endCol >= 0 && endCol < cols;

    if (!isEnoughSpace) {
        return false;
    }

    // search along the direction
    for (let i = 0; i < searchStr.length; i++) {
        const currentRow = startRow + i * dx;
        const currentCol = startCol + i * dy;

        if (matrix[currentRow][currentCol] !== searchStr[i]) {
            return false;
        }
    }

    return true;
};

export type MatrixPosition = {
    x: number;
    y: number;
};

/**
 * Rotate the given matrix clockwise by 90 degrees.
 * @param matrix The matrix to rotate.
 * @returns The rotated matrix.
 */
export const rotateMatrix = <T>(matrix: Matrix<T>): Matrix<T> => {
    if (matrix.length === 0) {
        return [];
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Create a new matrix with swapped rows and columns
    const rotatedMatrix: Matrix<T> = new Array(cols);

    // rotate the matrix
    for (let i = 0; i < cols; ++i) {
        for (let j = 0; j < rows; ++j) {
            rotatedMatrix[i][j] = matrix[j][i];
        }
    }

    return rotatedMatrix;
};

export const printMatrix = <T>(matrix: Matrix<T>): void => {
    console.log("\n");
    console.log(matrix.map((x) => x.join("")).join("\n"));
    console.log("\n");
};
