
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import { style } from 'typestyle'

import { companyService } from '../services/CompanyService'


const login = style({
	//border: 'solid black 2px'
})

const loginControl = style({
	marginTop: '.5em'
})


@observer
export class Login extends Component {
	@observable apiKey: string

	constructor(props: any) {
		super(props)
		this.apiKey = companyService.apiKey
	}

	render() {
		return (
			<div className={login}>
				<div className={loginControl}>
					<input
						type='text'
						name='apiKey'
						id='apiKey'
						placeholder='Please enter your Yelp Fusion API Key...'
						value={this.apiKey}
						onChange={e =>
							this.apiKey = e.currentTarget.value
						}
					/>
				</div>
				<div className={loginControl}>
					<button
						type='button'
						onClick={_ => companyService.login(this.apiKey)}>
						Go
				</button>
				</div>
			</div>
		)
	}
}
