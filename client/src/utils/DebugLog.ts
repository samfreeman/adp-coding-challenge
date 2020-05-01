
export class DebugLog {
	constructor(public prefix: string, public enabled: boolean = true) {

	}

	write = (...args: any[]) => {
		if (this.enabled)
			console.log(this.prefix, ...args)
	}
}
