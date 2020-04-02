import React, { useContext } from 'react';
import { Context } from '../contexts/markersContext';
import { Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarCrash, faMapMarkerAlt, faHardHat } from '@fortawesome/free-solid-svg-icons';

const MapMarker = ({ mark }) => {
	const { markersDispatch } = useContext(Context);

	const icon = type => {
		switch (type) {
			case 'incident'.toUpperCase():
				return faCarCrash;
			case 'construction'.toUpperCase():
				return faHardHat;
			default:
				return faMapMarkerAlt;
		}
	};

	const handlePopUpOpen = () => {
		markersDispatch({
			type: 'OPEN_POPUP',
			payload: {
				latitude: mark.coordinates.latitude,
				longitude: mark.coordinates.longitude,
				headline: mark.headline,
			},
		});
	};

	const handleMouseOver = () => {
		markersDispatch({ type: 'HIGHLIGHT_MARKER', payload: mark.id });
	};

	const handleMouseOut = () => {
		markersDispatch({ type: 'DESELECT_MARKER', payload: mark.id });
	};

	return (
		<Marker
			latitude={mark.coordinates.latitude}
			longitude={mark.coordinates.longitude}
			offsetLeft={-20}
			offsetTop={-10}
			viewBox="0 0 24 24"
		>
			<FontAwesomeIcon
				icon={icon(mark.type)}
				color={mark.isSelected ? '#f70000' : '#0074d9'}
				size={'1x'}
				onClick={handlePopUpOpen}
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}
			/>
		</Marker>
	);
};

export default MapMarker;
