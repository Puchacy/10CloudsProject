import React from 'react';
import gredient from './assets/img/gredient.png';
import './App.scss';
import FormComponent from './components/FormComponent';
import { CountryCodes } from './models/countryCodes';

const App = () => {
  const countryCodes: Array<CountryCodes> = [
    {
      country: "UK",
      code: "+ 44"
    },
    {
      country: "PL",
      code: "+ 48"
    },
    {
      country: "DE",
      code: "+ 49"
    }
  ];

  const months: Array<string> = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthsNumbers: Array<string> = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  return (
    <div className="App">
      <div className="gredient-container">
        <img src={gredient} alt="gradient" />
      </div>
      <FormComponent codes={countryCodes} months={months} monthsNum={monthsNumbers}/>
    </div>
  );
}

export default App;
