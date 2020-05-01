
import React, { Component } from 'react'
import { style } from 'typestyle'


const problem = style({
	$debugName: 'problem',
	fontSize: '1.3em',
	color: 'var(--red-700)'
})

export class Problem extends Component<{ text: string }> {
	render() {
		return <div className={problem}>{this.props.text}</div>
	}
}
