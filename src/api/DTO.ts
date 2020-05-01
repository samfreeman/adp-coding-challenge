

export type BaseDTO = {
	id: string
}


export type Review = BaseDTO & {
	text: string
	reviewer: string
}


export type Company = BaseDTO & {
	name: string
	rating: string
	street: string
	city: string
	state: string
	zip: string
	review?: Review
}


export type SearchArgs = {
	term: string
	location: string
}
