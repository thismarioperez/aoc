import { runSolution } from "../utils.ts";

const MUL_EXPRESSION = /mul\(\d{1,3},\d{1,3}\)/g;
const INPUTS_EXPRESSION = /\d{1,3}/g;
const DO_EXPRESSION = /do\(\)/g;
const DONT_EXPRESSION = /don'?t\(\)/g;

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
    console.log(data);
    const dataString = data.join("");
    // capture each command in an array to iterate over
    const commands = dataString.match(
        new RegExp(
            `${MUL_EXPRESSION.source}|${DO_EXPRESSION.source}|${DONT_EXPRESSION.source}`,
            "g"
        )
    );

    // console.log(commands);

    let inputs = [];
    let mulEnabled = true; // mul is enabled by default
    let total = 0;

    for (const command of commands) {
        if (command.match(DONT_EXPRESSION)) {
            mulEnabled = false;
        } else if (command.match(DO_EXPRESSION)) {
            mulEnabled = true;
        } else if (command.match(MUL_EXPRESSION) && mulEnabled) {
            inputs = command.match(INPUTS_EXPRESSION);
            inputs = inputs.map((str) => parseInt(str));
            total += inputs[0] * inputs[1];
        }
    }

    return total;
}

await runSolution(day3b);
