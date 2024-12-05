import { runSolution } from "../utils.ts";

const formatData = (data: string[]): [string[], string[]] => {
    const gapIndex = data.findIndex((x) => x === "");
    const rules = data.slice(0, gapIndex);
    const updates = data.slice(gapIndex + 1, data.length);

    return [rules, updates];
};

const filterRules = (rules: string[], update: string): string[] => {
    let pgs = [];

    return rules.filter((rule) => {
        pgs = rule.split("|");

        return pgs.every((x) => update.includes(x));
    });
};

const testPages = (rules: string[], pages: number[]): boolean => {
    let pgs = [];

    return rules.every((rule) => {
        pgs = rule.split("|").map((x) => parseInt(x));

        return pages.indexOf(pgs[0]) < pages.indexOf(pgs[1]);
    });
};

function sortPages(rules: Map<number, Set<number>>) {
    return (a, b) => {
        // swap b <-> a
        if (rules.has(a) && rules.get(a).has(b)) {
            return -1;
        }

        // swap a <-> b
        if (rules.has(b) && rules.get(b).has(a)) {
            return 1;
        }

        // default do nothing
        return 0;
    };
}

const updateTotal = (total: number, pages: number[]) => {
    // find the middle number
    const middleIndex = Math.floor(pages.length / 2);
    const middlePg = pages[middleIndex];
    return total + middlePg;
};

const calcTotal = (updates: string[]) => {
    return updates.reduce((acc, update) => {
        const nums = update.split(",").map((x) => parseInt(x));

        return updateTotal(acc, nums);
    }, 0);
};

/** provide your solution as the return of this function */
export async function day5b(data: string[]) {
    // console.log(data);
    const [rules, updates] = formatData(data);

    // create a rules map where the key is a number that must occur
    // BEFORE any value in the stored set
    const rulesMap = new Map<number, Set<number>>();
    rules.forEach((rule) => {
        const [a, b] = rule.split("|").map(Number);
        if (!rulesMap.has(a)) {
            rulesMap.set(a, new Set());
        }
        rulesMap.get(a).add(b); // add the new "AFTER" value
    });

    let validRules: string[] = [];
    let invalidUpdates: string[] = [];
    let pages: number[] = [];
    let total = 0;

    updates.forEach((update) => {
        pages = update.split(",").map((x) => parseInt(x));
        validRules = filterRules(rules, update);

        // determine if update is valid
        if (!testPages(validRules, pages)) {
            invalidUpdates.push(update);
        }
    });

    // console.log("unsorted", invalidUpdates);

    invalidUpdates = invalidUpdates.map((update) => {
        const pages = update.split(",").map((x) => parseInt(x));
        const sortedPages = [...pages];
        sortedPages.sort(sortPages(rulesMap));

        return sortedPages.join(",");
    });

    // console.log("sorted", invalidUpdates);

    total = calcTotal(invalidUpdates);

    return total;
}

await runSolution(day5b);
