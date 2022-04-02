import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [merchants, setMerchants] = useState(false);

  useEffect(() => {
    getMerchant();
  }, []);

  function getMerchant() {
    fetch('http://localhost:3001')
        .then(response => {
          return response.text();
        })
        .then(data => {
          setMerchants(data);
        });
  }

  function createMerchant() {
    let name = prompt('Enter merchant name');
    let email = prompt('Enter merchant email');

    fetch('http://localhost:3001/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email}),
    })
        .then(response => {
          return response.text();
        })
        .then(data => {
          alert(data);
          getMerchant();
        });
  }

  function deleteMerchant() {
    let id = prompt('Enter merchant id');

    fetch(`http://localhost:3001/merchants/${id}`, {
      method: 'DELETE',
    })
        .then(response => {
          return response.text();
        })
        .then(data => {
          alert(data);
          getMerchant();
        });
  }

  return (
      <div className="App-header">
        {merchants ? merchants : 'There is no merchant data available'}
        <br /><br />
        <div>
          <button className="App-button" onClick={createMerchant}>Add</button>
          <button className="App-button" onClick={deleteMerchant}>Delete</button>
        </div>
      </div>
  );
}

export default App;
