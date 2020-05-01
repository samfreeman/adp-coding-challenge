
import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { style } from 'typestyle'

import { companyService } from '../services/CompanyService'
import { Company } from './Company'
import { Loading } from './Loading'
import { Problem } from './Problem'


const companiesClass = style({
})


@observer
export class Companies extends Component {
	render() {
		const {loading, problem, companies} = companyService
		if (loading)
			return <Loading text='Loading...' />
		if (problem)
			return <Problem text={problem} />
		return (
			<div className={companiesClass}>
				{companies.map(c =>
					<Company key={c.id} company={c}	/>)
				}
			</div>
		)
	}
}
