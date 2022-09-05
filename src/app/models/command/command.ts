export class Command<A> {
	constructor(public readonly name: string, public readonly args: A) {}

	processCommand() {
		throw new Error('`processCommand` must be implemented!');
	}
}
