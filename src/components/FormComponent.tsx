import React, { FC, useState } from "react";
import './FormComponent.scss';
import layer from '../assets/img/Layer.png';
import lines from '../assets/img/LINES.png';
import arrow from '../assets/img/arrow.png';
import { CountryCodes } from '../models/countryCodes';

interface Props {
    codes: Array<CountryCodes>;
    months: Array<string>;
    monthsNum: Array<string>;
}

const FormComponent: FC<Props>  = props => {
    const [activeYes, setActiveYes] = useState(false);
    const [activeNo, setActiveNo] = useState(false);
    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [number, setNumber] = useState("");
    const [numberValid, setNumberValid] = useState(false);
    const [radioValid, setRadioValid] = useState(false);
    const [day, setDay] = useState("0");
    const [month, setMonth] = useState("1");
    const [year, setYear] = useState("0");
    const [dateValid, setdateValid] = useState(false);
    const [checkValid, setCheckValid] = useState(false);

    const toggleActiveYes = () => {
        setActiveYes(true);
        setActiveNo(false);
    };
    const toggleActiveNo = () => {
        setActiveYes(false);
        setActiveNo(true);
    };

    const checkValidation = () => {
        setCheckValid(true);
        const nameRegExp = /^[a-zA-Z\s]*$/;
        const numRegExp = /^\d{9}$/;

        name.trim().length > 2 && nameRegExp.test(name.trim()) ? setNameValid(true) : setNameValid(false);
        number.trim().length === 9 && numRegExp.test(number.trim()) ? setNumberValid(true) : setNumberValid(false);
        activeYes || activeNo ? setRadioValid(true) : setRadioValid(false);

        const date = new Date(year + "/" + month + "/" + day);
        const startDate = new Date("1920/01/01");
        const endDate = new Date();
        date instanceof Date && 
        !isNaN(date.valueOf()) && 
        date >= startDate && 
        date <= endDate &&
        endDate.getFullYear() - parseInt(year) > 18 ? setdateValid(true) : setdateValid(false);
    };

    return (
        <div className="form">
            <header className="form__header">
                Your account
            </header>
            <div className="form__container">
                <div className="form__leftBox">
                    <img src={layer} className="form__layer" alt="layer" />
                    <img src={lines} className="form__lines" alt="lines" />
                </div>
                <div className="form__personal--container">
                    <div className="form__personal--header">
                        Provide personal information so that we can create a new account for you.
                    </div>
                    <div className="form__group">
                        <label htmlFor="name" className="form__label">Your name</label>
                        <input 
                            type="text"
                            className={`form__input ${!nameValid && checkValid ? "form__input--error" : ""}`}
                            placeholder="Your name"
                            id="name"
                            onChange={e => setName(e.target.value)}/>
                        {!nameValid && checkValid ? (
                            <p className="form__label--error">Your name should have a minimum 3 characters</p>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="form__group">
                        <label htmlFor="mobile" className="form__label">Mobile</label>
                        <div className="form__group--mobile">
                            <select className="form__select" id="mobile-select">
                                {props.codes.map((el, index) => {
                                    return <option key={index} value={el.country}>{el.code} ({el.country})</option>
                                })}
                            </select>
                            <span className="form__triangle"></span>
                            <div>
                            <input 
                                type="text"
                                className={`form__input ${!numberValid && checkValid ? "form__input--error" : ""}`}
                                placeholder="Your number"
                                id="mobile"
                                maxLength={9}
                                onChange={e => setNumber(e.target.value)}/>
                            {!numberValid && checkValid ? (
                                 <p className="form__label--error">Your number should have 9 digits</p>
                            ) : (
                                <div></div>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="form__group">
                        <label htmlFor="radio" className="form__label">Can you play chess</label>
                        <div className={`form__group--radio ${activeYes ? "form__group--radio-active" : ""}`}>
                            <label htmlFor="radio-yes" className="form__label--radio" onClick={toggleActiveYes}>
                                Yes
                                <input type="radio" className="form__select--radio" id="radio-yes" name="chess"/>
                                <span className="form__select--button"></span>
                            </label>
                        </div>
                        <div 
                            className={`form__group--radio ${activeNo ? "form__group--radio-active" : ""}`}>
                            <label htmlFor="radio-no" className="form__label--radio" onClick={toggleActiveNo}>
                                No
                                <input type="radio" className="form__select--radio" id="radio-no" name="chess"/>
                                <span className="form__select--button"></span>
                            </label>
                        </div>
                        {!radioValid && checkValid ? (
                            <p className="form__label--error">This field is mandatory</p>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="form__group">
                        <label className="form__label">Date of birth</label>
                        <div className="form__group--birth">
                            <input 
                                type="text" 
                                className={`form__input form__input--day ${!dateValid && checkValid ? "form__input--day-error" : ""}`}
                                id="day" 
                                placeholder="01"
                                maxLength={2}
                                onChange={e => setDay(e.target.value)}/>
                            <span className="form__break"></span>
                            <select 
                                className={`form__select form__select--month ${!dateValid && checkValid ? "form__select--month-error" : ""}`}
                                id="mobile-select"
                                onChange={e => setMonth(e.target.value)}>
                                {props.months.map((el, index) => {
                                    return <option key={index} value={index + 1}>{el}</option>
                                })}
                            </select>
                            <select 
                                className={`form__select form__select--monthNum ${!dateValid && checkValid ? "form__select--monthNum-error" : ""}`}
                                id="mobile-select">
                                {props.monthsNum.map((el, index) => {
                                    return <option key={index} value={index + 1}>{el}</option>
                                })}
                            </select>
                            <span className="form__triangle form__triangle--month"></span>
                            <span className="form__break"></span>
                            <input 
                                type="text" 
                                className={`form__input form__input--year ${!dateValid && checkValid ? "form__input--year-error" : ""}`}
                                id="year"
                                placeholder="1990"
                                maxLength={4}
                                onChange={e => setYear(e.target.value)}/>
                        </div>
                        {!dateValid && checkValid ? (
                            <p className="form__label--error">Invalid date</p>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className="form__button--container">
                        <button className="form__button" onClick={checkValidation}>CONTINUE</button>
                        <div className="form__arrow">
                            <img src={arrow} className="form__arrow--img" alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;