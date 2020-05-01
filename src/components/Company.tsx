
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { style } from 'typestyle'

import * as Model from '../models/Company'
import { Review } from './Review'


const companyName = style({
	$debugName: 'companyName',
	marginTop: '.4em',
	backgroundColor: '#333333',
	fontSize: '1.2em'
})

const companyRating = style({
	$debugName: 'companyRating',
	$nest: {
		'&::before': {
			content: `'Rating: '`
		}
	}
})

const companyLocation = style({
	$debugName: 'companyLocation',
	fontStyle: 'italic'
})

const companyAddress = style({
	$debugName: 'companyAddress'
})

const companyCity = style({
	$debugName: 'companyCity'
})

const companyState = style({
	$debugName: 'companyState'
})

const companyZip = style({
	$debugName: 'companyZip'
})


@observer
export class Company extends Component<{company: Model.Company}> {
	render() {
		const { company } = this.props
		return (
			<div>
				<div className={companyName}>{company.name}</div>
				<div className={companyRating}>{company.rating}</div>
				<div className={companyLocation}>
					<div className={companyAddress}>{company.street}</div>
					<div className={companyCity}>{company.city}</div>
					<div className={companyState}>{company.state}</div>
					<div className={companyZip}>{company.zip}</div>
				</div>
				<Review 
					review={company.review} 
					loading={company.reviewLoading}
				/>
			</div>
		)
	}
}
