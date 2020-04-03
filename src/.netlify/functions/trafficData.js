import axios from 'axios';

const url = 'http://api.511.org/traffic/events?api_key=';
const { TRAFFIC_DATA_TOKEN } = process.env;

exports.handler = async function(event, context, callback) {
	console.log(TRAFFIC_DATA_TOKEN);
	const { httpMethod } = event;

	if (httpMethod === 'GET') {
		try {
			const response = await axios.get(`${url}${process.env.REACT_APP_TRAFFIC_DATA_TOKEN}`);
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
