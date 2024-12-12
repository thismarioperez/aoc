import { runSolution } from "../utils.ts";

type Byte = number | null;
type Disk = Byte[];
type Fragment = {
    id: Byte;
    length: number;
};
type FragmentList = Fragment[];

const parseData = (data: string[]): FragmentList => {
    return data[0].split("").reduce<FragmentList>((acc, char, i) => {
        acc.push({
            id: i % 2 === 0 ? i / 2 : null,
            length: Number(char),
        });
        return acc;
    }, []);
};

const defrag = (fragments: FragmentList): FragmentList => {
    for (const file of fragments.toReversed()) {
        // start with the last file
        if (file.id !== null) {
            // if it's actually a file start defragging from the original fragments order
            // need to find the first null with length greater than or equal to the length of the fragment
            const firstNullIndex = fragments.findIndex(
                (s) => s.id === null && s.length >= file.length
            );

            if (firstNullIndex === -1) {
                // if there are no nulls, we're done checking this file
                continue;
            }

            // if there's a null space big enough for the file, replace the nulls with the file
            if (firstNullIndex !== -1) {
                const currentSpaceFile = fragments[firstNullIndex];
                const currentFileIndex = fragments.findIndex(
                    (f) => f.id === file.id
                );

                if (currentFileIndex > firstNullIndex) {
                    // decrement the length of the space by the length of the file
                    currentSpaceFile.length -= file.length;

                    // replace the file with nulls
                    fragments.splice(currentFileIndex, 1, {
                        id: null,
                        length: file.length,
                    });

                    // insert the file at the current null position, but keep existing null intact, in case the file is smaller than the null
                    fragments.splice(firstNullIndex, 0, file);
                }
            }

            // remove empty nulls
            while (fragments.some((f) => f.id === null && f.length === 0)) {
                const emptyNullIndex = fragments.findIndex(
                    (f) => f.id === null && f.length === 0
                );
                fragments.splice(emptyNullIndex, 1);
            }
        }
    }

    return fragments;
};

const unpack = (fragments: FragmentList): Disk => {
    return fragments.reduce<Disk>((acc, fragment) => {
        for (let i = 0; i < fragment.length; ++i) {
            acc.push(fragment.id);
        }

        return acc;
    }, []);
};

const checksum = (disk: Disk): number => {
    return disk.reduce((acc, byte, idx) => {
        return (acc += (byte ?? 0) * idx);
    }, 0);
};
/** provide your solution as the return of this function */
export async function day9b(data: string[]) {
    const fragments = parseData(data);
    // console.log(fragments);
    const defragged = defrag(fragments);
    // console.log(defragged);
    const unpacked = unpack(defragged);
    // console.log(unpacked);
    const result = checksum(unpacked);
    return result;
}

await runSolution(day9b);
