import React,{useState} from 'react';
import './App.css';
import {TableSheet} from './Components/TableSheet';

const App=()=>{
 
   return(
      <div>
         <div id="header">
           
            <TableSheet titles={["Date","EventTitle","Name","Email","Phone","Referrel"]}
             sheetid="FILL_UR_SHEET_ID">
              
            </TableSheet>
         </div>
      </div>
    );
  }
 
export default App;
