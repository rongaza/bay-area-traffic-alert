import React, { useContext } from 'react';
import { Context } from '../contexts/markersContext';
import { Popup } from 'react-map-gl';

const MarkerPopUp = () => {
	const { markersState, markersDispatch } = useContext(Context);

	return (
		<Popup
			tipSize={10}
			anchor="top"
			latitude={markersState.popUp.latitude}
			longitude={markersState.popUp.longitude}
			closeOnClick={true}
			onClose={() => markersDispatch({ type: 'CLOSE_POPUP' })}
			maxWidth={'200px'}
		>
			<div style={{ width: '200px' }}>{markersState.popUp.headline}</div>
		</Popup>
	);
};

export default MarkerPopUp;
