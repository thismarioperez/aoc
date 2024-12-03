import { runSolution } from "../utils.ts";

type Level = number;
type Report = Level[];

const detectSafe = (report: Report): boolean => {
    let safe = true;
    let increasing: null | boolean = null;
    let difference = 0;
    let currentLevel = 0;
    let nextLevel = 0;

    for (let i = 0; i < report.length - 1; i++) {
        if (!safe) {
            break;
        }

        currentLevel = report[i];
        nextLevel = report[i + 1];

        // safe means the following:
        // levels are all increasing or all decreasing
        if (increasing === null) {
            increasing = currentLevel < nextLevel;
        } else if (increasing && currentLevel > nextLevel) {
            safe = false;
        } else if (!increasing && currentLevel < nextLevel) {
            safe = false;
        }

        // levels at least 1 apart, but no more than 3 apart
        difference = Math.abs(currentLevel - nextLevel);
        if (difference > 3 || difference < 1) {
            safe = false;
        }
    }

    return safe;
};

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
    console.log(data);

    const reports: Report[] = data.reduce(
        (acc, string) => [...acc, string.split(" ").map((s) => parseInt(s))],
        []
    );

    const safeReportIndexes = reports.reduce((acc, report, idx) => {
        if (detectSafe(report)) {
            acc = [...acc, idx];
        }

        return acc;
    }, []);

    return safeReportIndexes.length;
}

await runSolution(day2a);
