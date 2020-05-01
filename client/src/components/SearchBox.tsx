
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { style } from 'typestyle'

import { DTO } from '../api/CompanyApi'
import { companyService } from '../services/CompanyService'

const searchBox = style({
	//border: 'solid black 2px'
})

const searchControl = style({
	marginTop: '.5em'
})


@observer
export class SearchBox extends Component {
	@observable searchArgs: DTO.SearchArgs

	constructor(props: any) {
		super(props)
		this.searchArgs = { ...companyService.searchArgs }
	}

	render() {
		return (
			<div className={searchBox}>
				<div className={searchControl}>
					<input
						type='text'
						name='term'
						id='term'
						placeholder='Search term, for example "food" or "restaurants"...'
						value={this.searchArgs.term}
						onChange={e =>
							this.searchArgs.term = e.currentTarget.value
						}
					/>
				</div>
				<div className={searchControl}>
					<input
						type='text'
						name='location'
						id='location'
						placeholder='Location, for example "New York City", "NYC", "350 5th Ave, New York, NY 10118"...'
						value={this.searchArgs.location}
						onChange={e =>
							this.searchArgs.location = e.currentTarget.value
						}
					/>
				</div>
				<div className={searchControl}>
					<button
						type='button'
						onClick={_ => companyService.search(this.searchArgs)}>
						Search
				</button>
				</div>
			</div>
		)
	}
}
