
import { observable, computed } from 'mobx'

import * as DTO from '../api/DTO'


export class Element<DTO extends DTO.BaseDTO> {
	@observable private _data: DTO;

	constructor(data: DTO) {
		this._data = data
	}

	@computed get data(): DTO { return this._data }
	@computed get id(): string { return this.data.id }
}
