import axios from 'axios';

const fetchAPI = async (dispatch, setLoading) => {
	try {
		const response = await axios.get('/.netlify/functions/trafficData');
		const markers = response.data.events.map(event => {
			return {
				id: event.id,
				type: event.event_type,
				incident_type: event.event_subtypes[0],
				headline: event.headline,
				created: event.created,
				coordinates: {
					latitude: event.geography.coordinates[1],
					longitude: event.geography.coordinates[0],
				},
				roads: {
					name: event.roads[0].name,
					direction: event.roads[0].direction,
				},
				isSelected: false,
			};
		});
		dispatch({ type: 'FETCH_DATA', payload: markers });
		setLoading(false);
	} catch (error) {
		console.log(error);
	}
};

export default fetchAPI;
