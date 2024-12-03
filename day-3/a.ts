import { runSolution } from "../utils.ts";

const MUL_EXPRESSION = /mul\(\d{1,3},\d{1,3}\)/g;
const INPUTS_EXPRESSION = /\d{1,3}/g;

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
    // console.log(data);

    const commands = data.join("").match(MUL_EXPRESSION);

    // console.log(commands);

    let inputs = [];
    let total = 0;

    for (const command of commands) {
        inputs = command.match(INPUTS_EXPRESSION);
        inputs = inputs.map((str) => parseInt(str));

        total += inputs[0] * inputs[1];
    }

    return total;
}

await runSolution(day3a);
