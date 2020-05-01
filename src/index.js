/* global gapi */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  '../node_modules/bootstrap/dist/js/bootstrap.min';
import  '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function check(){
  if(gapi.client.sheets){
    
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root')
    );
       stop();

    }
  }

  const fun= setInterval(check,1000);
  
  function stop(){
    clearInterval(fun);
  }


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
