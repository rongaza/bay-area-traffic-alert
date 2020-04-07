import React, { useContext } from 'react';
import { Context } from '../contexts/markersContext';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarCrash, faMapMarkerAlt, faHardHat } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';

const TrafficDisplayList = ({ events }) => {
	return (
		<div id="traffic-display">
			<ul>
				{events.map((event) => (
					<EventItem event={event} key={event.id} />
				))}
			</ul>
		</div>
	);
};

export default TrafficDisplayList;

const EventItem = ({ event }) => {
	const { markersDispatch } = useContext(Context);

	const icon = (type) => {
		switch (type) {
			case 'incident'.toUpperCase():
				return faCarCrash;
			case 'construction'.toUpperCase():
				return faHardHat;
			default:
				return faMapMarkerAlt;
		}
	};

	const handleOnMouseOver = () => {
		markersDispatch({ type: 'HIGHLIGHT_MARKER', payload: event.id });
	};

	const handleMouseOut = () => {
		markersDispatch({ type: 'DESELECT_MARKER', payload: event.id });
	};

	return (
		<li>
			<Card className="event-item" onMouseOver={handleOnMouseOver} onMouseOut={handleMouseOut}>
				<Card.Body>
					<Card.Title className="align-text-top">
						<FontAwesomeIcon
							icon={icon(event.type)}
							color={'#E34F4F'}
							size={'1x'}
							style={{ marginRight: '5px' }}
						/>
						{event.incident_type}
					</Card.Title>
					<Card.Subtitle className="mb-2 text-muted font-weight-light">
						Reported @ {moment(event.created).format('h:mm a')}
					</Card.Subtitle>
					<Card.Text>{event.headline}</Card.Text>
				</Card.Body>
			</Card>
		</li>
	);
};
