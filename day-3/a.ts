import { runSolution } from "../utils.ts";

const COMMAND_EXPRESSION = /mul\(\d{1,3},\d{1,3}\)/g;
const INPUTS_EXPRESSION = /\d{1,3}/g;

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
    // console.log(data);

    const commands = data.join("").match(COMMAND_EXPRESSION);

    // console.log(commands);

    let inputs = [];
    const total = commands.reduce((acc, command) => {
        inputs = command.match(INPUTS_EXPRESSION);
        inputs = inputs.map((str) => parseInt(str));

        // console.log(inputs);

        return (acc += inputs[0] * inputs[1]);
    }, 0);

    return total;
}

await runSolution(day3a);
