
import { observable, computed, action } from 'mobx'

import * as DTO from '../api/DTO'
import { Element } from './Element'
import { Review } from './Review'


export class Company extends Element<DTO.Company> {
	@observable private _review: Review | undefined
	@observable private _reviewLoading: boolean

	constructor(data: DTO.Company) {
		super(data)
		this._review = undefined
		this._reviewLoading = true
	}

	@computed get name(): string { return this.data.name }
	@computed get rating(): string { return this.data.rating }
	@computed get street(): string { return this.data.street }
	@computed get city(): string { return this.data.city }
	@computed get state(): string { return this.data.state }
	@computed get zip(): string { return this.data.zip }
	@computed get review(): Review | undefined { return this._review }
	@computed get reviewLoading(): boolean { return this._reviewLoading }

	@action setReview = (review: DTO.Review | undefined): void => {
		this._review = review
			? new Review(review)
			: new Review({ id: '', text: '', reviewer: '' })
		this._reviewLoading = false
	}
}
