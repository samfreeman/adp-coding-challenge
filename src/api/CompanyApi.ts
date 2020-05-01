
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import * as DTO from './DTO'
import { DebugLog } from '../utils/DebugLog'


const rootUrl = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses'

type JsonData = { [key: string]: any }
type SearchResult = { businesses: JsonData[] }
type ReviewsResult = { reviews: JsonData[] }


const log = new DebugLog('** CompanyAPI:', true)

export class CompanyAPI {
	private api: AxiosInstance
	private apiKey: string

	constructor(apiKey: string) {
		this.api = axios.create({ baseURL: rootUrl })
		this.apiKey = apiKey
	}

	search = (args: DTO.SearchArgs): Promise<DTO.Company[]> => {
		const address = `${rootUrl}/search`
			+ `?term=${encodeURIComponent(args.term)}`
			+ `&location=${encodeURIComponent(args.location)}`
		log.write('GET', address)
		return new Promise((resolve, reject) => {
			this.api.get<SearchResult>(address, this.config)
				.then(response => {
					log.write('Response', response)
					resolve(response.data.businesses.map(c => ({
						id: c.id,
						name: c.name,
						rating: c.rating,
						street: c.location.address1,
						city: c.location.city,
						state: c.location.state,
						zip: c.location.zip
					})))
				})
				.catch(e => reject(e))
		})
	}

	getReview = (companyId: string): Promise<DTO.Review> => {
		const address = `${rootUrl}/${companyId}/reviews`
		log.write('GET', address)
		return new Promise((resolve, reject) => {
			this.api.get<ReviewsResult>(address, this.config)
				.then(response => {
					log.write('Response', response)
					resolve(response.data.reviews.map(r => ({
						id: r.id,
						text: r.text,
						reviewer: r.user.name
					}))[0])
				})
				.catch(e => reject(e))
		})
	}

	private get config(): AxiosRequestConfig {
		return {
			headers: {
				//'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Authorization': `Bearer ${this.apiKey}`
			}
		}
	}
}

export { DTO }
