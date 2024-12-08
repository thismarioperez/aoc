import { runSolution } from "../utils.ts";
type Item = {
    result: number;
    inputs: number[];
};

const parseData = (data: string[]): Item[] => {
    return data.map((str) => {
        const [result, inputs] = str.split(": ").map((str, i) => {
            if (i === 0) {
                return parseInt(str);
            }

            return str.split(" ").map((s) => parseInt(s));
        });
        return { result: result as number, inputs: inputs as number[] };
    });
};

type Operator = "add" | "multiply" | "concat";
type Operation = (a: number, b: number) => number;

const OPERATIONS: Record<Operator, Operation> = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b,
    concat: (a, b) => parseInt(`${a}${b}`),
};

const operate = (operator: Operator, num1: number, num2: number): number => {
    return OPERATIONS[operator](num1, num2);
};

const reduceOperationsAndNumbers = (
    nums: number[],
    operators: Operator[]
): number => {
    if (nums.length === 0) {
        throw new Error("No numbers provided");
    }

    if (operators.length === 0) {
        throw new Error("No operators provided");
    }

    if (nums.length === 1) {
        return nums[0];
    }

    if (nums.length < operators.length) {
        throw new Error("Not enough numbers provided");
    }

    const result = nums.reduce((acc, num, i) => {
        if (i === 0) {
            return num;
        }

        const operator = operators[i - 1];
        return operate(operator, acc, num);
    }, 0);

    return result;
};

const generateAllPossibleOperations = (length: number): Operator[][] => {
    if (length === 0) {
        return [[]];
    }

    const recursiveGenerate = (
        currentCombo: Operator[] = [],
        remainingLength: number = length
    ) => {
        if (remainingLength === 0) {
            return [currentCombo];
        }

        const operators = Object.keys(OPERATIONS) as Operator[];
        const result: Operator[][] = [];

        for (let i = 0; i < operators.length; ++i) {
            const newCombo = [...currentCombo, operators[i]];
            result.push(...recursiveGenerate(newCombo, remainingLength - 1));
        }

        return result;
    };

    return recursiveGenerate();
};

const processItem = (item: Item): number => {
    const { result, inputs } = item;
    const operationCount = inputs.length - 1;
    const operators = generateAllPossibleOperations(operationCount);
    const results = operators
        .map((op) => reduceOperationsAndNumbers(inputs, op))
        .filter((r) => r === result);

    if (results.length === 0) {
        return 0;
    }

    // We only care that there is at least one valid result. We don't care if there are more
    return results[0];
};
/** provide your solution as the return of this function */
export async function day7b(data: string[]) {
    // console.log(parseData(data));
    const items = parseData(data);
    const result = items
        .map((item) => processItem(item))
        .reduce((acc, r) => acc + r, 0);
    return result;
}

await runSolution(day7b);
