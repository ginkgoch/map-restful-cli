import { randomPointCommand } from "../../src/commands/randomPoint";

describe('command tests', () => {
    test('random point', () => {
        let result = randomPointCommand.action({ });
        expect(result).toBeTruthy();
    })
})
