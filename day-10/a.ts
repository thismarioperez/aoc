import { runSolution } from "../utils.ts";
import { type Matrix } from "../helpers/matrix.ts";

type Position = {
    x: number;
    y: number;
};

type PathPosition = Position & {
    value: number;
};

type Direction = "up" | "down" | "left" | "right";

const MAX = 9;

const DIRECTIONS: Record<Direction, Position> = {
    up: {
        x: 0,
        y: -1,
    },
    right: {
        x: 1,
        y: 0,
    },
    down: {
        x: 0,
        y: 1,
    },
    left: {
        x: -1,
        y: 0,
    },
} as const;

const parseData = (data: string[]): Matrix<number> => {
    return data.map((s) => s.split("").map((sn) => parseInt(sn)));
};

// traverse a matrix from lowest to highest value
const findStartPositions = (m: Matrix<number>): Position[] => {
    const positions: Position[] = [];

    for (let row = 0; row < m.length; ++row) {
        for (let col = 0; col < m[0].length; ++col) {
            if (m[row][col] === 0) {
                positions.push({
                    x: col,
                    y: row,
                });
            }
        }
    }

    return positions;
};

const createVisitedKey = (pos: Position): string => {
    return `row:${pos.y},col:${pos.x}`;
};

const traverse = (
    m: Matrix<number>,
    startPosition: Position,
    endValue: number
): PathPosition[][] => {
    // recursive walk each direction until reaching max val or hitting a wall
    const rows = m.length;
    const cols = m[0].length;

    // track paths using an arr of positions and a set of visited keys
    const paths: PathPosition[][] = [];
    const visited = new Set<string>();

    const isValidMove = (pos: Position, prev: Position): boolean => {
        const { x, y } = pos;

        if (
            // check if move is within matrix bounds
            x >= 0 &&
            x < cols &&
            y >= 0 &&
            y < rows &&
            // check if the cell value is exactly previous value + 1
            m[y][x] === m[prev.y][prev.x] + 1
        ) {
            return true;
        }

        return false;
    };

    const depthFirstSearch = (
        currentPos: Position,
        currentPath: PathPosition[]
    ): void => {
        const currentVal = m[currentPos.y][currentPos.x];

        // check if visited
        const currentKey = createVisitedKey(currentPos);
        if (visited.has(currentKey)) return;

        // save visited cell
        visited.add(currentKey);
        currentPath.push({ ...currentPos, value: currentVal });

        // check if we're done
        if (currentVal === endValue) {
            paths.push([...currentPath]);
        }

        for (const { x: dx, y: dy } of Object.values(DIRECTIONS)) {
            const newPos = {
                x: currentPos.x + dx,
                y: currentPos.y + dy,
            };

            if (isValidMove(newPos, currentPos)) {
                // recurse
                depthFirstSearch(newPos, currentPath);
            }
        }

        // backtrack
        currentPath.pop();
        visited.delete(currentKey);
    };

    depthFirstSearch(startPosition, []);

    return paths;
};

const removeDuplicatePaths = (paths: PathPosition[][]): PathPosition[][] => {
    const uniqueCoords = new Set<string>();
    return paths.filter((path) => {
        const target = path.find((obj) => obj.value === MAX);

        if (!target) return false;

        const key = `${target.y},${target.x}`;

        // if this path hasn't been set, add it
        if (!uniqueCoords.has(key)) {
            uniqueCoords.add(key);
            return true;
        }

        return false;
    });
};

// each "step" is incremented by 1 from the previous
// traversal can only be done up, down, left, or right. No diagonal traversal
// a "trailhead" will always start at a height of 0
// a trailhead score is the number of paths that lead to a maximum height of 9
// return the sum of all trailhead scores

// const placeNodes = (m: Matrix<string>, positions: PathPosition[]) => {
//     const _m = m.map((row) => [...row]);
//     positions.forEach((pos) => {
//         _m[pos.y][pos.x] = pos.value.toString();
//     });

//     return _m;
// };

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
    // console.log(parseData(data));
    const matrix = parseData(data);
    const startPositions = findStartPositions(matrix);
    const score = startPositions
        .map((pos) => {
            const paths = traverse(matrix, pos, MAX);
            // dedup paths that have repeated endpoints
            const dedupedPaths = removeDuplicatePaths(paths);

            return dedupedPaths.length;
        })
        .reduce((acc, _score) => (acc += _score), 0);

    console.log(score);
    return score;
}

await runSolution(day10a);
