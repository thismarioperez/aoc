import { runSolution } from "../utils.ts";
import {
    type Matrix,
    type MatrixPosition,
    printMatrix,
} from "../helpers/matrix.ts";

type Position = MatrixPosition;
type Region = Position[];

const parseData = (data: string[]): Matrix<string> => {
    return data.map((str) => str.split(""));
};

type Flower = Map<string, Position>;
type Flowers = Map<string, Flower>;
const findFlowers = (m: Matrix<string>): Flowers => {
    const flowers: Flowers = new Map();
    const rows = m.length;
    const cols = m[0].length;

    let cell = "";
    let cellPos: Position = { x: 0, y: 0 };
    let key = "";
    let flower: Flower = new Map();
    for (let y = 0; y < rows; ++y) {
        for (let x = 0; x < cols; ++x) {
            cell = m[y][x];
            cellPos = { x, y };
            key = `${cell}-${y}-${x}`;

            if (!flowers.has(cell)) {
                flower = new Map();
                flower.set(key, cellPos);
                flowers.set(cell, flower);
            } else {
                flower = flowers.get(cell);
                flower.set(key, cellPos);
                flowers.set(cell, flower);
            }
        }
    }

    return flowers;
};

const areAdjecent = (pos1: Position, pos2: Position): boolean => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;

    if (
        (dx === 1 && dy === 0) ||
        (dx === -1 && dy === 0) ||
        (dx === 0 && dy === 1) ||
        (dx === 0 && dy === -1)
    ) {
        return true;
    }

    return false;
};

const createVisitedKey = (pos: Position): string => {
    return `y:${pos.y},x:${pos.x}`;
};

const findRegions = (flower: Flower): Region[] => {
    const regions: Region[] = [];
    const visited: Set<string> = new Set();

    const checkForAdjacentPositions = (
        pos: Position,
        region: Region
    ): Region => {
        const key = createVisitedKey(pos);
        visited.add(key);

        // check if this position is already in the region,
        // if not, add it
        if (!region.includes(pos)) {
            region.push(pos);
        }

        for (const adjPos of flower.values()) {
            const adjKey = createVisitedKey(adjPos);
            if (visited.has(adjKey)) {
                continue;
            }
            if (areAdjecent(pos, adjPos)) {
                region.push(adjPos);
                visited.add(adjKey);
                checkForAdjacentPositions(adjPos, region);
            }
        }

        return region;
    };

    for (const pos of flower.values()) {
        const key = createVisitedKey(pos);
        if (visited.has(key)) {
            continue;
        }

        const region = checkForAdjacentPositions(pos, []);

        regions.push(region);
    }

    return regions;
};

const findAllRegions = (flowers: Flowers): Map<string, Region[]> => {
    const regions: Map<string, Region[]> = new Map();

    for (const [flowerType, flower] of flowers) {
        regions.set(flowerType, findRegions(flower));
    }

    return regions;
};

const measureRegion = (region: Region): [number, number] => {
    let area = 0;
    let perimeter = 0;

    for (const pos of region) {
        area += 1;
        perimeter += 4;
        for (const adjPos of region) {
            if (areAdjecent(pos, adjPos)) {
                perimeter -= 1;
            }
        }
    }

    return [area, perimeter];
};

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
    const input = parseData(data);
    // console.log(input);
    printMatrix(input);
    const flowers = findFlowers(input);
    // console.log("\nFlower Positions:");
    console.log(flowers);
    const regions = findAllRegions(flowers);
    // console.log("\nFlower Regions:");
    const total = regions.entries().reduce((acc, [, regions]) => {
        acc += regions.reduce((acc, r) => {
            const [area, perimeter] = measureRegion(r);
            return (acc += area * perimeter);
        }, 0);
        return acc;
    }, 0);
    return total;
}

await runSolution(day12a);
