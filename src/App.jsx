import React from 'react';
import logo from '/src/assets/Logo.png';
import ticketLogo from '/src/assets/ticket-logo.svg';
import './main.css'




const App = () => {
    return (

        <div className="App">
            <div className="wrapper">
                <header className='header-logo'>
                    <img src={ logo } alt='logo'></img>
                </header>
                <div className='main'>
                    <div className="transfer-filter">
                        <h3 className='transfer-filter__title'>Количество пересадок</h3>
                        <form className='checkbox-container'>
                            <input type="checkbox" className="custom-checkbox" id="done-1" name="happy" value="yes"/>
                            <label htmlFor="done-1">Все</label>
                            <input type="checkbox" className="custom-checkbox" id="done-2" name="happy" value="yes"/>
                            <label htmlFor="done-2">Без пересадок</label>
                            <input type="checkbox" className="custom-checkbox" id="done-3" name="happy" value="yes"/>
                            <label htmlFor="done-3">1 пересадка</label>
                            <input type="checkbox" className="custom-checkbox" id="done-4" name="happy" value="yes"/>
                            <label htmlFor="done-4">2 пересадки</label>
                            <input type="checkbox" className="custom-checkbox" id="done-5" name="happy" value="yes"/>
                            <label htmlFor="done-5">3 пересадки</label>
                        </form>
                    </div>
                    <div className="price-filters">
                        <div className='price-filter price-filter__cheap price-filter__cheap--active'>Самый дешевый</div>
                        <div className='price-filter price-filter__fastest'>Самый быстрый</div>
                        <div className='price-filter price-filter__optimal'>Оптимальный</div>
                    </div>
                    <ul className='tickets-list'>
                        <li className='ticket'>
                       <header className='ticket-header'>
                           <div className='ticket-header__price'>13 400 Р</div>
                           <div className='ticket-header__logo'>
                               <img src={ticketLogo} alt="Airlines name"/>
                           </div>
                       </header>
                            <ul className='info-wrapper'>
                                <li className='info'>
                                    <div className='info__time'>
                                        <p className='info--text-light'>MOW – HKT</p>
                                        <p>10:45 – 08:00</p>
                                    </div>
                                    <div className='info__total-hours'>
                                        <p className='info--text-light'>В пути</p>
                                        <p>21ч 15м</p>
                                    </div>
                                    <div className='info__total-transfers'>
                                        <p className='info--text-light'>2 пересадки</p>
                                        <p>HKG, JNB</p>
                                    </div>
                                </li>
                                <li className='info'>
                                    <div className='info__time'>
                                        <p className='info--text-light'>MOW – HKT</p>
                                        <p>20:05 – 04:40</p>
                                    </div>
                                    <div className='info__total-hours'>
                                        <p className='info--text-light'>В пути</p>
                                        <p>19ч 10м</p>
                                    </div>
                                    <div className='info__total-transfers'>
                                        <p className='info--text-light'>1 пересадкa</p>
                                        <p>JNB</p>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <footer>

                </footer>
            </div>
        </div>
    )
}
export default App;