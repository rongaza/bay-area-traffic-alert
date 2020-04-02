const viewportReducer = (state, action) => {
	switch (action.type) {
		case 'SET_VIEWPORT':
			return { ...action.payload };
		case 'SET_FOCUS':
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};

export default viewportReducer;
