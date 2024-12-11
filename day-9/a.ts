import { runSolution } from "../utils.ts";

type FreeSpace = ".";
type FileId = number;
type Block = string;

const FREE_SPACE: FreeSpace = ".";

const parseData = (data: string[]): number[] => {
    return data[0].split("").map((x) => parseInt(x));
};

const isEven = (x: number) => x % 2 == 0;

const unpackData = (data: number[]): Block[] => {
    let id: FileId | null = null;
    return data.reduce((acc, num, idx) => {
        const space = new Array(num);
        if (idx === 0 || isEven(idx)) {
            id = idx / 2;
            space.fill(id.toString());
        } else {
            space.fill(FREE_SPACE);
        }
        return new Array<Block>().concat(acc, space);
    }, []);
};

const moveMemoryBlocks = (memoryMap: Block[]): Block[] => {
    const ret: Block[] = memoryMap;
    let block: Block | null = null;
    let nextFreeSpaceIndex: number = -1;
    for (let i = memoryMap.length - 1; i >= 1; --i) {
        block = memoryMap[i];

        if (block === FREE_SPACE) {
            // skip
            continue;
        }

        nextFreeSpaceIndex = memoryMap.indexOf(FREE_SPACE);
        // console.log("block is number", block);
        // console.log("next free space index", nextFreeSpaceIndex);

        if (nextFreeSpaceIndex === -1 || nextFreeSpaceIndex > i) {
            break;
        }

        ret[i] = FREE_SPACE;
        ret[nextFreeSpaceIndex] = block;
        // console.log(ret.join(""));
    }

    return ret;
};
/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
    const memoryMap = parseData(data);
    const unpacked = unpackData(memoryMap);
    const result = moveMemoryBlocks(unpacked);
    const checksum = result.reduce((acc, block, idx) => {
        if (block === FREE_SPACE) {
            return acc;
        }
        return (acc += parseInt(block) * idx);
    }, 0);
    return checksum;
}

await runSolution(day9a);
