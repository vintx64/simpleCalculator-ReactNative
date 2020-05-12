import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from "./style";
import InputButton from "./inputButton";
const clkButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  ['.', 0, '%', '+'],
  ['Clear','=']
];
export default class App extends Component {
  constructor(props){
    super(props);
    this.initState = {
      prvNum : 0,
      selectedSymbol : null,
      inputNum : 0
    }
    this.state = this.initState;
  }
  render() {
    return (

      <View style={styles.rootContainer}>
      <View style={styles.displayContainer}>
    <Text style={styles.displayText}>{this.state.inputNum}</Text>
      </View>
      <View style={styles.inputContainer}>
        {this.showClkButtons()}
      </View>
    </View>
    )
  
  }  
//using simple for loop
    showClkButtons(){
     let views = [];
      for (let nativeRow = 0; nativeRow < clkButtons.length; nativeRow++) {
            let newRow = clkButtons[nativeRow];
            let inputRows = [];//a3ml array w kol atturate 7ot feh row gdid mn btnClk array
            for (let items = 0; items < newRow.length; items++) {
            let inputItems=newRow[items]; //a3ml arr w kol atturiate 7ot f l row l wa7d items
            inputRows.push(<InputButton btnTxt={inputItems} 
              onPress={this.onInputBtnPress.bind(this , inputItems)}
              key={nativeRow + '-'+ items}/>)
            }  
          views.push(<View style={styles.inputRow} key={"newRow" + nativeRow}>{inputRows}</View>)   
      }
      return views;
    }
//using map
/* 
showClkButtonsUsingMap(){
      let views = clkButtons.map((row , index)=>{
        let inputRow = row.map((btnValue  , item)=>{
          return <InputButton 
          onPress={this.onInputBtnPress.bind(this , btnValue)}
          value={btnValue}
          key={'button -' + item} />
          
        });
        return <View style={styles.inputRow} key={"row" + index}>{inputRow}</View>
      });
        return views;
    }
*/
    //Buttons Actions
    onInputBtnPress(input){
      switch (typeof input){
        case 'number' : return this.onHandleNumberInput(input);
        default : return this.onHandleStringInput(input);
      }
    }
    onHandleNumberInput(num){
      let currentNum = (this.state.inputNum * 10) + num;
      this.setState({
        inputNum : currentNum
      })
    }
    onHandleStringInput(str){
        switch(str){
          case '/':
          case '*':
          case '+':
          case '-':
          case '%':
            this.setState({
              selectedSymbol : str,
              prvNum : this.state.inputNum,
              inputNum:0
            })
          case '=':
            let prvNum =this.state.prvNum;
            let symbol = this.state.selectedSymbol;
            let currentInputNum =this.state.inputNum;
            if (!symbol) return;
            this.setState({
              selectedSymbol:null,
              prvNum:0,
              inputNum: eval( prvNum + symbol + currentInputNum)
            });
            break;
          case 'Clear':
            this.setState({inputNum:0})
            break;
        }
    }
}



