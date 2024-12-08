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
const VISITED = "X";

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
    return OBSTACLE === matrix[row][col];
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

const getNextPositionFromDirection = (
    position: Position,
    direction: string,
    matrix: Matrix<string>
): Position | null => {
    const [row, col] = position;
    const [dx, dy] = MATRIX_DIRECTIONS_MAP[direction];

    if (!isValidPosition([row + dx, col + dy], matrix)) {
        return null;
    }

    return [row + dx, col + dy];
};

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
    const matrix = parseData(data);

    // console.log(matrix);

    let position: Position | null = null;
    let nextPosition: Position | null = null;
    let current: string = "";
    let next: string = "";

    // find start position
    position = getDirectionPosition(matrix);

    // console.log(position);

    while (position !== null) {
        // console.log("\n");
        // console.log(matrix.map((x) => x.join("")).join("\n"));
        // console.log("\n");

        // handle movement
        current = matrix[position[0]][position[1]];
        nextPosition = getNextPositionFromDirection(position, current, matrix);

        if (nextPosition && isObstacle(nextPosition, matrix)) {
            console.log("rotating");
            // rotate if blocked by obstacle
            next = rotateDirection(current);
            nextPosition = getNextPositionFromDirection(position, next, matrix);
            console.log("rotated nextPosition", nextPosition);
        } else {
            next = current;
        }

        // update current cell
        matrix[position[0]][position[1]] = VISITED;

        // update position
        position = nextPosition;

        if (position) {
            // update next cell
            matrix[position[0]][position[1]] = next;
        }
    }

    const visited = matrix.reduce((acc, row) => {
        const count = row.reduce((_acc, cell) => {
            if (cell === VISITED) _acc += 1;
            return _acc;
        }, 0);
        return (acc += count);
    }, 0);

    return visited;
}

await runSolution(day6a);
