/* global gapi */
import React from 'react';
import ReactDOM from 'react-dom';





export class TableSheet extends React.Component
{
    constructor(){
        super();
        this.state={
            label: "Insert",
            rows:[],
            current:0
        }
        this.sheetRead=this.sheetRead.bind(this);
        this.update=this.update.bind(this);
        this.UpdateOrInsertRecord=this.UpdateOrInsertRecord.bind(this);
    }
    update(index){
        for(let  x in this.props.titles){
            ReactDOM.findDOMNode(this.refs["field"+x]).value=this.state.rows[index][x]
           
        }
        this.setState({label:"Update",current:index+2})
    }

    UpdateOrInsertRecord(){
    let   letters=["A","B","C","D","E","F","H","I","J","K","L","M","N","O","P","Q","S","T","U"
    ,"V","W","X","Y","Z"]
    let values=[];
    for(let  x in this.props.titles){
        values.push(ReactDOM.findDOMNode(this.refs["field"+x]).value)
    }
    

        gapi.client.sheets.spreadsheets.values.update({
            spreadsheetId: this.props.sheetid,
            range: "Sheet1!A"+this.state.current+":"+letters[this.props.titles.length-1]+this.state.current,
            valueInputOption: "RAW",
            resource: {values:[values]}
         }).then((response) => {
        
           alert("Inserted");
           for(let  x in this.props.titles){
            ReactDOM.findDOMNode(this.refs["field"+x]).value="";
            this.sheetRead();
            this.setState({label:"Insert"})
           }
         });
    }
    sheetRead(){
       
        gapi.client.sheets.spreadsheets.values.batchGet({
            spreadsheetId: this.props.sheetid,
            ranges: ["Sheet1!A2:F"],
          }).then((response)=> {
                console.log(response);
              //appendPre('No data found.');
              console.log(response.result.valueRanges[0].values)
             this.setState({rows:response.result.valueRanges[0].values,
                            current:response.result.valueRanges[0].values.length+2 })
            
          }, (response)=> {
            console.log(response)
          });
        }
    
    componentDidMount(){
         this.sheetRead();
    }
    render(){
        console.log(this.state.rows);

// Generating the table rows 
//First rendering this.state.rows will be empty so line 79 wont product anything
        let rows=this.state.rows.map((x,index)=><tr>
           {x.map(y=><td>{y}</td>)}
           <td><button onClick={()=>{this.update(index)}}>update</button></td>
        </tr>)
    let titles=this.props.titles.map(x=><th>{x}</th>)
        return(
        <div  id="table" style={{margin: "20px", width: "1200px",}}>
           <table className="table table-hover">
               <thead>
                   <tr>
                       {titles}
                   </tr>
               </thead>
               <tbody>
                     {rows}
                    <tr>
                     {
                         this.props.titles.map((x,index)=><td>
                                <input type="text" ref={"field"+index}/>
                         </td>)
                         
                     }
                      <td><button onClick={this.UpdateOrInsertRecord}>{this.state.label}</button></td>
                    </tr>
               </tbody>
           </table>
         </div>
        );
    }
}