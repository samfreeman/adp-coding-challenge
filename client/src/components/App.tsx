
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { style } from 'typestyle'

import { Heading } from './Heading'
import { SearchBox } from './SearchBox'
import { Companies } from './Companies'
import { companyService } from '../services/CompanyService'
import { Login } from './Login'


const app = style({
	$debugName: 'app',
	maxWidth: '450px'
})


@observer
export class App extends Component {
	render() {
		return (
			<div className={app}>
				{companyService.isAnonymous &&
					<>
						<Heading text='Yelp Fusion API Key' />
						<Login />
					</>
				}
				{!companyService.isAnonymous &&
					<>
						<Heading text='Search Companies' />
						<SearchBox />
						<Companies />
					</>
				}
			</div>
		)
	}
}
