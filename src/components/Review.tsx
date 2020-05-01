
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { style } from 'typestyle'

import * as Model from '../models/Review'
import { Loading } from './Loading'


const reviewClass = style({
	$debugName: 'review',
	backgroundColor: '#666666',
	marginLeft: '.4em',
	padding: '.2em'
})

const reviewText = style({
	$debugName: 'reviewText'
})

const reviewer = style({
	$debugName: 'reviewer',
	$nest: {
		'&::before': {
			content: `'  -- '`
		}
	}
})


@observer
export class Review extends Component<{ 
	review: Model.Review | undefined,
	loading: boolean
}> {
	render() {
		const { review, loading } = this.props
		return (
			<div className={reviewClass}>
				{loading &&
					<Loading text='Loading review...' />
				}
				{review && !review.review &&
					<div className={reviewText}>No reviews</div>
				}
				{review && review.review &&
					<>
					<div className={reviewText}>{review.review}</div>
					<div className={reviewer}>{review.reviewer}</div>
					</>
				}
			</div>
		)
	}
}
