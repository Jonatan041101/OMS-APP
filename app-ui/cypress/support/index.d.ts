declare namespace Cypress {
	interface Chainable {
		getBySel(
			selector: string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			args?: any,
		): Chainable<JQuery<HTMLElement>>;
		getBySelLike(
			selector: string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			args?: any,
		): Chainable<JQuery<HTMLElement>>;
		orderCard(
			card: JQuery<HTMLElement>,
			client:string,
			item:string,
			status:string
		):void ;
		formFieldInput(
			selector: string,
			label:string,
			placeholder:string,
		):void ;
		formFieldSelect(
			selector: string,
			label:string,
			placeholder:string,
		):void ;
		formWriteInput(
			selector: string,
			write:string,
		):void ;
		orderUpdate():void
	}
}
