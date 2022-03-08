import { useState, React } from 'react';
import axios from 'axios';

const Exchanges = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [ExchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);

    console.log(amount)
    const convert = () => {
        const options = {
            credentials: 'include',
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
              'x-rapidapi-key': 'f4cd937ae8msh74db90df8c4dc64p160a08jsn9c40a5f3d047'
            }
          };
          
          axios.request(options).then((response) => {
              console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
              setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
              setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
          }).catch((error) => {
              console.error(error);
          });
    }

    
    return (
        <div className="exchanges">
            <h2>Currency Converter</h2>

            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input type="number" name="currency-amount-1" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </td>
                        <td>
                            <select value={chosenPrimaryCurrency} name="currency-option-1" className="currency-options" onChange={(e) => setChosenPrimaryCurrency(e.target.value)}>
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input name="currency-amount-2" value={result} disabled={true} />
                        </td>
                        <td>
                            <select value={chosenSecondaryCurrency} name="currency-option-2" className="currency-options" onChange={(e) => setChosenSecondaryCurrency(e.target.value)}>
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Exchange Rate ({chosenPrimaryCurrency} to {chosenSecondaryCurrency}):</td>
                        <td>
                            <input name="currency-amount-2" value={ExchangeRate} disabled={true} />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button id="convert-button" onClick={convert}>Convert</button>
        </div>
    )
}

export default Exchanges
