
import React, { Component } from 'react'


export class Heading extends Component<{text: string}> {
	render() {
		return <h1>{this.props.text}</h1>
	}
}
