import { WeatherTodayWind } from '../wind/Wind';
import { WeatherTodayClouds } from '../clouds/Clouds';
import { WeatherTodayFeellsLike } from '../feeling/Feeling';
import { WeatherTodayVisibility } from '../visibility/Visibility';
import { WeatherTodayHumidity } from '../humidity/Humidity';
import { WeatherTodayGroundPressure } from '../groundPressure/GroundPressure';
import { WeatherTodaySeaLevel } from '../sea/Sea';
import { WeatherTodayRise } from '../sunrise/Sunrise';
import { WeatherTodaySunset } from '../sunset/Sunset';
import getWeatherIcon from '../utils/WeatherIcons';
import './WeatherModal.css';

function WeatherModal({ isOpen, onClose, dayData, date }) {
    if (!isOpen) return null;
    const mainData = dayData[0];
    const currentHour = new Date().getHours();
    const next24Hours = dayData.filter((item, index) => index < 8);


    const tempMin = Math.min(...next24Hours.map(hour => hour.main.temp_min));
    const tempMax = Math.max(...next24Hours.map(hour => hour.main.temp_max));

    if (!mainData) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className='modal'>
                    <div className="modal-header">
                        <button className="modal-close" onClick={onClose}>×</button>
                        <h2>{new Date(date).toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}</h2>
                    </div>
                    <div className="current-weather">
                        <div className="current-weather__main">
                            <div className="current-weather__temp-container">
                                <img
                                    src={getWeatherIcon(mainData.weather[0].id)}
                                    alt="Weather Icon"
                                    className="current-weather__icon"
                                />
                                <span className="current-weather__temp">
                                    {Math.round(tempMin)}° / {Math.round(tempMax)}°
                                </span>
                            </div>
                            <div className="current-weather__details">
                                <p>Humedad: {mainData.main.humidity}%</p>
                                <p>Viento: {Math.round(mainData.wind.speed * 3.6)} km/h</p>
                            </div>
                        </div>
                    </div>
                    <div className="section-title">Próximas 24 horas</div>
                    <div className="hourly-forecast">
                        {next24Hours.map((period) => {
                            const date = new Date(period.dt * 1000);
                            const hour = date.getHours();
                            return (
                                <div key={period.dt} className="hourly-item">
                                    <div className="hourly-time">
                                        {hour === currentHour ? 'Ahora' : `${hour}:00`}
                                    </div>
                                    <img
                                        src={getWeatherIcon(period.weather[0].id)}
                                        alt="Weather Icon"
                                        className="hourly-weather-icon"
                                    />
                                    <div className="hourly-temp">
                                        {Math.round(period.main.temp)}°
                                    </div>
                                    {period.pop > 0 && (
                                        <div className="hourly-pop">
                                            {Math.round(period.pop * 100)}%
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="weather-metrics-single">
                        <WeatherTodayWind currentWeather={mainData} />
                    </div>
                    <div className="weather-metrics-container">
                        <WeatherTodayClouds currentWeather={mainData} />
                        <WeatherTodayHumidity currentWeather={mainData} />
                    </div>
                    <div className="weather-metrics-container">
                        <WeatherTodayFeellsLike currentWeather={mainData} />
                        <WeatherTodayVisibility currentWeather={mainData} />
                    </div>
                    <div className="weather-metrics-container">
                        <WeatherTodayGroundPressure currentWeather={mainData} />
                        <WeatherTodaySeaLevel currentWeather={mainData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WeatherModal;