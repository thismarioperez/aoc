import { runSolution } from "../utils.ts";
import { type Matrix, MATRIX_DIRECTIONS } from "../helpers/matrix.ts";

type Position = [number, number];

const parseData = (data: string[]): Matrix<string> =>
    data.map((x) => x.split(""));

const DIRECTIONS = {
    UP: "^",
    RIGHT: ">",
    DOWN: "v",
    LEFT: "<",
};

const MATRIX_DIRECTIONS_MAP = {
    [DIRECTIONS.RIGHT]: MATRIX_DIRECTIONS[0],
    [DIRECTIONS.LEFT]: MATRIX_DIRECTIONS[1],
    [DIRECTIONS.DOWN]: MATRIX_DIRECTIONS[2],
    [DIRECTIONS.UP]: MATRIX_DIRECTIONS[3],
};

const OBSTACLE = "#";
const OBSTACLE_VISITED = "O";

const isValidPosition = (
    position: Position,
    matrix: Matrix<string>
): boolean => {
    const [row, col] = position;
    return (
        row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
    );
};

const isObstacle = (position: Position, matrix: Matrix<string>): boolean => {
    const [row, col] = position;
    return (
        OBSTACLE === matrix[row][col] || OBSTACLE_VISITED === matrix[row][col]
    );
};

const rotateDirection = (direction: string): string => {
    switch (direction) {
        case DIRECTIONS.UP:
            return DIRECTIONS.RIGHT;
        case DIRECTIONS.RIGHT:
            return DIRECTIONS.DOWN;
        case DIRECTIONS.DOWN:
            return DIRECTIONS.LEFT;
        case DIRECTIONS.LEFT:
            return DIRECTIONS.UP;
        default:
            return direction;
    }
};

const getDirectionPosition = (matrix: Matrix<string>): Position | null => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    let position: Position | null = null;
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (Object.values(DIRECTIONS).includes(matrix[i][j])) {
                position = [i, j];
            }
        }
    }

    return position as Position | null;
};

const addObstruction = (position, matrix): Matrix<string> => {
    const m = matrix.map((row) => [...row]);
    m[position[0]][position[1]] = OBSTACLE_VISITED;
    return m;
};

const isLoop = (matrix: Matrix<string>): boolean => {
    const m = matrix.map((row) => [...row]);
    const visited = new Set<string>();

    const startPosition = getDirectionPosition(m);
    let row = startPosition[0];
    let col = startPosition[1];
    let direction = m[row][col];

    visited.add(`${row},${col},${direction}`);

    while (true) {
        const [dr, dc] = MATRIX_DIRECTIONS_MAP[direction];
        const nextRow = row + dr;
        const nextCol = col + dc;

        // check if next position is inside the matrix
        if (!isValidPosition([nextRow, nextCol], m)) {
            return false;
        }

        if (isObstacle([nextRow, nextCol], m)) {
            // turn right
            direction = rotateDirection(direction);
        } else {
            // move
            row = nextRow;
            col = nextCol;
        }

        const key = `${row},${col},${direction}`;
        if (visited.has(key)) {
            return true;
        } else {
            visited.add(key);
        }
    }
};

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
    const matrix = parseData(data);

    const startPosition = getDirectionPosition(matrix);
    let validObstructionCount = 0;

    for (let row = 0; row < matrix.length; ++row) {
        for (let col = 0; col < matrix[row].length; ++col) {
            // skip start position and existing obstacles
            if (
                isObstacle([row, col], matrix) ||
                (row === startPosition[0] && col === startPosition[1])
            ) {
                continue;
            } else if (isLoop(addObstruction([row, col], [...matrix]))) {
                validObstructionCount++;
            }
        }
    }

    return validObstructionCount;
}

await runSolution(day6b);
