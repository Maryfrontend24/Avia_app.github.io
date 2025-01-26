import ticketLogo2 from '/src/assets/ticketLogo2.svg';
import React from 'react';
import dateConverter from '/src/utils/dateConverter.js';
import stopsToString from '/src/utils/stopsToString.js';
import formatedPrice from '/src/utils/formatedPrice.js';
import { DateTime } from 'luxon';
import transformStops from '/src/utils/transformStops.js';
import round from '/src/assets/round.png';

const Ticket = ({ ticket }) => {
  const { price, carrier, segments } = ticket;
  const [thereFly, backFly] = segments;

  function formatFlyTime(dateUts, duration) {
    const outTime = DateTime.fromISO(dateUts);
    const arrivalTime = outTime.plus({ minutes: duration });
    const outTimeFormat = outTime.toFormat('HH:mm');
    const arrivalFormat = arrivalTime.toFormat('HH:mm');

    return `${outTimeFormat} – ${arrivalFormat}`;
  }

  return (
    <li className="ticket">
      <header className="ticket-header">
        <div className="ticket-header__price">{formatedPrice(price)}</div>
        <div className="ticket-header__logo">
          <div className="ticket-carrier"> {carrier}</div>
          <img src={ticketLogo2} alt="Avia name" />
        </div>
      </header>
      <ul className="info-wrapper">
        <li className="info">
          <div className="info__time">
            <p className="info--text-light">
              {thereFly.origin} - {thereFly.destination}
            </p>
            <p>{formatFlyTime(thereFly.date, thereFly.duration)}</p>
          </div>
          <div className="info__total-hours info__total-hours--up">
            <p className="info--text-light">В пути</p>
            <p>{dateConverter(thereFly.duration)}</p>
            <img
              style={{
                width: '32px',
              }}
              src={round}
            />
          </div>
          <div className="info__total-transfers">
            <p className="info--text-light">
              {' '}
              {transformStops(thereFly.stops.length)}
            </p>
            <p>{stopsToString(thereFly.stops)} </p>
          </div>
        </li>
        <li className="info">
          <div className="info__time">
            <p className="info--text-light">
              {backFly.origin} - {backFly.destination}
            </p>
            <p>{formatFlyTime(backFly.date, backFly.duration)}</p>
          </div>
          <div className="info__total-hours info__total-hours--down">
            <p className="info--text-light">В пути</p>
            <p>{dateConverter(backFly.duration)}</p>
            <img
              className="img"
              style={{
                width: '42px',
              }}
              src={round}
            />
          </div>
          <div className="info__total-transfers">
            <p className="info--text-light">
              {transformStops(backFly.stops.length)}
            </p>
            <p>{stopsToString(backFly.stops)}</p>
          </div>
        </li>
      </ul>
    </li>
  );
};
export default Ticket;
