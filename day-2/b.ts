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

const detectSafeWithDampener = (report: Report): boolean => {
    let safe = detectSafe(report);
    let dampedReport = [];

    // if report is already safe, short circuit here
    if (safe) {
        return safe;
    }

    // check if report could be safe by omitting each index
    for (let i = 0; i < report.length; ++i) {
        // short circuit if a previously false value is now true
        if (safe) {
            break;
        }

        dampedReport = Array.from(report);
        dampedReport.splice(i, 1);

        safe = detectSafe(dampedReport);
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
        if (detectSafeWithDampener(report)) {
            acc = [...acc, idx];
        }

        return acc;
    }, []);

    return safeReportIndexes.length;
}

await runSolution(day2a);
