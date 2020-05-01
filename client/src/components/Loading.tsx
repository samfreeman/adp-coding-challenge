
import React, { Component } from 'react'
import { style } from 'typestyle'


const loading = style({
	$debugName: 'loading',
	fontSize: '1.3em'
})


export class Loading extends Component<{ text: string }> {
	render() {
		return <div className={loading}>{this.props.text}</div>
	}
}
