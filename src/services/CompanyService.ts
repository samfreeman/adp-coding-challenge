
import { observable, action, computed } from 'mobx'

import { DTO, CompanyAPI } from '../api/CompanyApi'
import { Company } from '../models/Company'
import { DebugLog } from '../utils/DebugLog';
import { Review } from '../models/Review';


const log = new DebugLog('** CompanyService:', true)

class CompanyService {
	@observable private _searchArgs: DTO.SearchArgs;
	@observable private _companies: Company[]
	@observable private _loading: boolean
	@observable private _problem: string
	@observable private _apiKey: string
	@observable private api?: CompanyAPI

	constructor() {
		this._searchArgs = { term: '', location: '' }
		this._companies = []
		this._loading = false
		this._problem = ''
		this._apiKey = sessionStorage.getItem('apiKey') || ''
		if (this.apiKey)
			this.api = new CompanyAPI(this.apiKey)
	}

	@computed get isAnonymous(): boolean { return !this.api }
	@computed get apiKey(): string { return this._apiKey }
	@action login = (apiKey: string): void => {
		sessionStorage.setItem('apiKey', apiKey)
		this._apiKey = apiKey
		if (this._apiKey)
			this.api = new CompanyAPI(this._apiKey)
	}

	@computed get loading(): boolean { return this._loading }
	@computed get problem(): string { return this._problem }

	@computed get searchArgs(): DTO.SearchArgs { return this._searchArgs }
	@computed get companies(): Company[] { return this._companies }

	@action search = (args: DTO.SearchArgs): void => {
		if (this.isAnonymous) {
			this.reportProblem('Yelp fusion api key needed.')
			return
		}
		if (!args.term && !args.location) {
			this.reportProblem('Please enter some search criteria.')
			return
		}
		this._searchArgs = { ...args }
		this.loadCompanies()
	}

	@action private loadCompanies = async (): Promise<void> => {
		if (!this.api)
			return
		log.write(
			`Searching for companies with`,
			`{term: '${this.searchArgs.term}',`,
			`location: '${this.searchArgs.location}'}`)
		this._companies.splice(0)
		if (!this.searchArgs.term && !this.searchArgs.location)
			return
		this._loading = true
		try {
			var data = await this.api.search(this.searchArgs)
			this._companies.push(...data.map(c => new Company(c)))
			this.loadReviews()
		}
		catch (x) {
			this.reportProblem(x.toString())
		}
		finally {
			this._loading = false
		}
	}

	@action private loadReviews = async (): Promise<void> => {
		if (!this.api)
			return
		this._companies.forEach(async c => {
			let data: DTO.Review | undefined
			try{
				data = await this.api?.getReview(c.id) || undefined
				c.setReview(data)
			}
			catch{
				c.setReview(undefined)
			}
		})
	}

	@action private reportProblem = (problem: string) => {
		this._problem = problem
		setTimeout(() => this._problem = '', 7000)
	}
}

export const companyService = new CompanyService()
