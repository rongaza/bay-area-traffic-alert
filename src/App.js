import React, { useState, useReducer, useEffect } from 'react';
import MapGL, { NavigationControl } from 'react-map-gl';
import MapMarker from './components/MapMarker';
import MarkerPopUp from './components/MarkerPopUp';
import NavBar from './components/NavBar';
import TrafficDisplayList from './components/TrafficDisplayList';

import viewportReducer from './reducers/viewportReducer';
import markerReducer from './reducers/markerReducer';
import { Provider } from './contexts/markersContext';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import fetchAPI from './api/fetchAPI';
// const { MAPBOX_TOKEN } = process.env;
// console.log(process.env);
function App() {
	const [viewportState, viewportDispatch] = useReducer(viewportReducer, {
		latitude: 37.8044,
		longitude: -122.2712,
		zoom: 9,
	});
	const [markersState, markersDispatch] = useReducer(markerReducer, {
		markers: [],
		popUp: { showPopUp: false, popUpInfo: {} },
	});
	const [toggleSidebar, setToggleSidebar] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	const navStyle = {
		position: 'absolute',
		top: 36,
		left: 0,
		padding: '10px',
	};

	const handleToggleSidebar = e => {
		setToggleSidebar(toggleSidebar => setToggleSidebar(!toggleSidebar));
	};

	useEffect(() => {
		fetchAPI(markersDispatch, setIsLoading);
	}, []);

	return (
		<Provider value={{ markersState, markersDispatch }}>
			<NavBar />
			<div className="main">
				<div id="map">
					<MapGL
						{...viewportState}
						width={'100%'}
						height={'100%'}
						mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
						mapStyle="mapbox://styles/mapbox/light-v9"
						onViewportChange={viewportState =>
							viewportDispatch({
								type: 'SET_VIEWPORT',
								payload: viewportState,
							})
						}
					>
						{!isLoading &&
							markersState.markers.map(mark => {
								return <MapMarker mark={mark} key={mark.id} />;
							})}

						{markersState.popUp.show && <MarkerPopUp />}

						<div style={navStyle}>
							<NavigationControl />
						</div>
						<Button
							id="sidebar-btn"
							className="ml-auto"
							onClick={handleToggleSidebar}
						>
							<FontAwesomeIcon
								icon={
									toggleSidebar
										? faAngleDoubleRight
										: faAngleDoubleLeft
								}
							/>
						</Button>
					</MapGL>
				</div>

				<div id={toggleSidebar ? 'sidebar' : 'sidebar-closed'}>
					<TrafficDisplayList events={markersState.markers} />
				</div>
			</div>
		</Provider>
	);
}

export default App;
