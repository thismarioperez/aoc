import { runSolution } from "../utils.ts";
import { type Matrix, printMatrix, MatrixPosition } from "../helpers/matrix.ts";

type Antenna = MatrixPosition & {
    value: string;
};

const parseData = (data: string[]): Matrix<string> => {
    const matrix = data.map((str) => [...str.split("")]);
    return matrix;
};

const placeNodes = (m: Matrix<string>, positions: MatrixPosition[]) => {
    const _m = m.map((row) => [...row]);
    positions.forEach((pos) => {
        if (!_m[pos.y][pos.x].match(/[0-9a-zA-Z]/)) {
            _m[pos.y][pos.x] = "#";
        }
    });

    return _m;
};

const isAntenna = (m: Matrix<string>, position: MatrixPosition): boolean => {
    return m[position.y][position.x].match(/[0-9a-zA-Z]/) !== null;
};

const findAntennas = (m): Antenna[] => {
    const rows = m.length;
    const cols = m[0].length;
    const antennas = [];
    for (let row = 0; row < rows; ++row) {
        for (let col = 0; col < cols; ++col) {
            if (isAntenna(m, { x: col, y: row })) {
                antennas.push({ x: col, y: row, value: m[row][col] });
            }
        }
    }
    return antennas;
};

const detectNodeInDirection = (
    m: Matrix<string>,
    position: MatrixPosition,
    distance: MatrixPosition
) => {
    const rows = m.length;
    const cols = m[0].length;
    const endRow = position.y + distance.y;
    const endCol = position.x + distance.x;

    // check if search direction has enough space to search for a node
    const isEnoughSpace =
        endRow >= 0 && endRow < rows && endCol >= 0 && endCol < cols;

    if (!isEnoughSpace) {
        return false;
    }

    if (m[endRow][endCol].match(/./)) {
        return true;
    }

    return false;
};

/** provide your solution as the return of this function */
export async function day8b(data: string[]) {
    const m = parseData(data);
    const antinodes: Set<string> = new Set();

    // printMatrix(m);

    // Search for each "antenna" in the matrix
    const antennas = findAntennas(m);
    // console.log(antennas);

    // Create a map of "antenna" grouped by their value
    const antennaMap = new Map<string, Set<Antenna>>();
    const antennaValues = Array.from(new Set(antennas.map((a) => a.value)));

    antennaValues.forEach((value) => {
        antennaMap.set(value, new Set());
    });

    antennas.forEach((a) => {
        antennaMap.get(a.value).add(a);
    });

    // console.log(antennaMap);

    // Loop through each "antenna" group
    antennaMap.entries().forEach(([, antennas]) => {
        Array.from(antennas).forEach((a, aidx, group) => {
            // Include antenna as an antinode
            antinodes.add(JSON.stringify({ x: a.x, y: a.y }));

            // Omit the selected "antenna"
            const filteredGroup = group.filter((_, idx) => idx !== aidx);
            filteredGroup.forEach((b) => {
                // Find the distance between each like "antenna"
                const distance: MatrixPosition = {
                    x: b.x - a.x,
                    y: b.y - a.y,
                };
                const node = {
                    x: b.x,
                    y: b.y,
                };

                while (true) {
                    const isNodeInDirection = detectNodeInDirection(
                        m,
                        node,
                        distance
                    );

                    // Add antinode to the set if node is found in direction
                    if (isNodeInDirection) {
                        const potentialNode = {
                            x: node.x + distance.x,
                            y: node.y + distance.y,
                        };
                        antinodes.add(JSON.stringify(potentialNode));
                        node.x = potentialNode.x;
                        node.y = potentialNode.y;
                    } else {
                        break;
                    }
                }
            });
        });
    });

    printMatrix(
        placeNodes(
            m,
            Array.from(antinodes).map((str) => JSON.parse(str))
        )
    );
    const count = antinodes.size;

    return count;
}

await runSolution(day8b);
