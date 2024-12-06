import { runSolution } from "../utils.ts";
import { type Matrix } from "../helpers/matrix.ts";

type Position = [number, number];

const parseData = (data: string[]): Matrix<string> =>
    data.map((x) => x.split(""));

const DIRECTIONS = {
    UP: "^",
    RIGHT: ">",
    DOWN: "v",
    LEFT: "<",
};

const OBSTACLE = "#";
const VISITED = "X";

const validatePosition = (
    position: Position,
    matrix: Matrix<string>
): boolean => {
    const [row, col] = position;
    return (
        row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length
    );
};

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
    // console.log(data);
    const matrix = parseData(data);
    const rows = matrix.length;
    const cols = matrix[0].length;

    // console.log(matrix);

    let patrolling = true;
    let position: Position | null = null;
    let nextPosition: Position | null = null;
    let current: string = "";
    let next: string = "";

    // find start position
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (Object.values(DIRECTIONS).includes(matrix[i][j])) {
                position = [i, j];
            }
        }
    }

    console.log(position);

    while (patrolling) {
        // get current cell
        current = matrix[position[0]][position[1]];
        next = current;
        // console.log("\n");
        // console.log(matrix.map((x) => x.join("")).join("\n"));
        // console.log("\n");

        // handle movement
        switch (current) {
            case DIRECTIONS.UP: {
                nextPosition = [position[0] - 1, position[1]];
                if (
                    validatePosition(nextPosition, matrix) &&
                    matrix[nextPosition[0]][nextPosition[1]] === OBSTACLE
                ) {
                    // move right
                    nextPosition = [position[0], position[1] + 1];
                    next = DIRECTIONS.RIGHT;
                }
                break;
            }

            case DIRECTIONS.RIGHT: {
                nextPosition = [position[0], position[1] + 1];
                if (
                    validatePosition(nextPosition, matrix) &&
                    matrix[nextPosition[0]][nextPosition[1]] === OBSTACLE
                ) {
                    // move down
                    nextPosition = [position[0] + 1, position[1]];
                    next = DIRECTIONS.DOWN;
                }
                break;
            }
            case DIRECTIONS.DOWN: {
                nextPosition = [position[0] + 1, position[1]];
                if (
                    validatePosition(nextPosition, matrix) &&
                    matrix[nextPosition[0]][nextPosition[1]] === OBSTACLE
                ) {
                    // move left
                    nextPosition = [position[0], position[1] - 1];
                    next = DIRECTIONS.LEFT;
                }
                break;
            }
            case DIRECTIONS.LEFT: {
                nextPosition = [position[0], position[1] - 1];
                if (
                    validatePosition(nextPosition, matrix) &&
                    matrix[nextPosition[0]][nextPosition[1]] === OBSTACLE
                ) {
                    // move up
                    nextPosition = [position[0] - 1, position[1]];
                    next = DIRECTIONS.UP;
                }
                break;
            }
            default:
                break;
        }

        // update current cell
        matrix[position[0]][position[1]] = VISITED;

        // check if next is outside matrix and exit loop
        if (validatePosition(nextPosition, matrix)) {
            // update position
            position = nextPosition;
            // update next cell
            matrix[nextPosition[0]][nextPosition[1]] = next;
        } else {
            patrolling = false;
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
