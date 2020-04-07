import axios from 'axios';

const url = 'http://api.511.org/traffic/events?api_key=';
const token = process.env.TRAFFIC_DATA_TOKEN;

exports.handler = async function (event, context, callback) {
	const { httpMethod } = event;

	if (httpMethod === 'GET') {
		try {
			const response = await axios.get(`${url + token}`);
			return {
				statusCode: 200,
				body: response.data,
			};
		} catch (error) {
			throw new Error('error :', error);
		}
	}

	return { statusCode: 404 };
};
