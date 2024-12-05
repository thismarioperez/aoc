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

const updateTotal = (total: number, pages: number[]) => {
    // find the middle number
    const middleIndex = Math.floor(pages.length / 2);
    const middlePg = pages[middleIndex];
    return total + middlePg;
};

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
    // console.log(data);
    const [rules, updates] = formatData(data);

    let validRules: string[] = [];
    let pages: number[] = [];
    let total = 0;

    updates.forEach((update) => {
        pages = update.split(",").map((x) => parseInt(x));
        validRules = filterRules(rules, update);

        // determine if update is valid
        if (testPages(validRules, pages)) {
            total = updateTotal(total, pages);
        }
    });

    return total;
}

await runSolution(day5a);
