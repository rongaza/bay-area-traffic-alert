const markerReducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_DATA':
			return {
				...state,
				markers: [...action.payload],
			};
		case 'HIGHLIGHT_MARKER':
			let highLightID = action.payload;
			let updatedMarkers = state.markers.map(mark => {
				if (mark.id === highLightID) {
					return {
						...mark,
						isSelected: true,
					};
				} else {
					return mark;
				}
			});
			return {
				...state,
				markers: updatedMarkers,
			};

		case 'DESELECT_MARKER':
			let markers = state.markers.map(mark => {
				if (mark.isSelected === true) {
					return {
						...mark,
						isSelected: false,
					};
				} else {
					return mark;
				}
			});

			return {
				...state,
				markers,
			};
		case 'OPEN_POPUP':
			return {
				...state,
				popUp: {
					show: true,
					latitude: action.payload.latitude,
					longitude: action.payload.longitude,
					headline: action.payload.headline,
				},
			};
		case 'CLOSE_POPUP':
			return {
				...state,
				popUp: {
					show: false,
				},
			};
		case 'FILTER_MARKERS':
			return {
				...state,
				markers: action.payload,
			};

		default:
			return state;
	}
};

export default markerReducer;
