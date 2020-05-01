
import express, { Request, Response } from 'express'
import cors from 'cors'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'


const app = express()
const port = 8080
const apiRoot = 'https://api.yelp.com/v3/businesses'

const createConfig = (req: Request): AxiosRequestConfig => {
	const result = {
		params: req.query,
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Authorization': req.headers.authorization
		}
	}
	return result
}

const sendResponse = <T>(res: Response<any>, response: AxiosResponse<T>): void => {
	res.status(response.status).send(response.data)
}

const sendErrorResponse = (res: Response<any>, msg: any): void => {
	res.status(400).send(msg)
}

const forwardGetRequest = (address: string, req: Request, res: Response<any>): void => {
	const config = createConfig(req)
	console.log(">> get", address, config)
	api.get(address, config)
		.then(response => {
			console.log('<< Response', response.status, response.data)
			sendResponse(res, response)
		})
		.catch(reason => {
			console.log('<< Error', reason)
			sendErrorResponse(res, reason)
		})
}

const api = axios.create()

app.options('*', cors())

app.get('/businesses/search', cors(), (req, res) =>
	forwardGetRequest(`${apiRoot}/search`, req, res))

app.get('/businesses/:id/reviews', cors(), (req, res, next) =>
	forwardGetRequest(`${apiRoot}/${req.params.id}/reviews`, req, res))

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`);
})
