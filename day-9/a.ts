import { runSolution } from "../utils.ts";

type Byte = number | null;
type Disk = Byte[];

const parseData = (data: string[]): Disk => {
    return data[0].split("").reduce((acc, char, i) => {
        // push values as many times as the given char represents
        for (let j = 0; j < Number(char); ++j) {
            if (i % 2 === 0) {
                // we're in a file block
                // the id is the current index divided by 2, since spaces exist in between file blocks
                acc.push(i / 2);
            } else {
                // we're in a space block
                acc.push(null);
            }
        }
        return acc;
    }, []);
};

const defrag = (disk: Disk): Disk => {
    const defragged = disk.reduce<Disk>((acc) => {
        // find the first null
        const firstNullIndex = acc.indexOf(null);

        // if there are no nulls, we're done
        if (firstNullIndex === -1) {
            return acc;
        }

        // if there are nulls, replace the first one with the last non-null
        if (firstNullIndex !== -1) {
            let j = acc.length - 1;
            while (acc[j] === null) {
                j -= 1;
            }
            acc[firstNullIndex] = acc[j]; // swap the first null with the last non-null
            acc = acc.slice(0, j); // shorten the array to the last non-null
        }

        return acc;
    }, disk);

    return new Array(disk.length)
        .fill(null)
        .map((_, i) => (i < defragged.length ? defragged[i] : null));
};

const checksum = (disk: Disk): number => {
    return disk.reduce((acc, byte, idx) => {
        if (byte !== null) {
            acc += byte * idx;
        }
        return acc;
    }, 0);
};

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
    const disk = parseData(data);
    console.log(disk);
    const defragged = defrag(disk);
    console.log(defragged);
    const result = checksum(defrag(parseData(data)));
    return result;
}

await runSolution(day9a);
