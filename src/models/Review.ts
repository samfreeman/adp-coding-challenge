
import { computed } from 'mobx'

import * as DTO from '../api/DTO'
import { Element } from './Element'


export class Review extends Element<DTO.Review> {
	constructor(data: DTO.Review) {
		super(data)
	}

	@computed get review() { return this.data.text }
	@computed get reviewer() { return this.data.reviewer }
}
