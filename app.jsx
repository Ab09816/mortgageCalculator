import React from 'react';

export default class App extends React.Component {
    // set the state object for the components and binding functions to UI
    constructor(props) {
        super(props);
        this.state = {
          balance: 0,
          rate: 0,
          term: 15
        };
        //bind JS functions to UI
        this.handleBalanceChange = this.handleBalanceChange.bind(this);
        this.handleRateChange = this.handleRateChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //set state 
    handleBalanceChange(event) {
        this.setState({balance: event.target.value});
    }
    handleRateChange(event) {
        this.setState({rate: event.target.value});
    }
    handleTermChange(event) {
        this.setState({term: event.target.value});
    }
    //call on button click
    handleSubmit(event) {
        console.log(this.state)
        this.calculate(this.state.balance, this.state.rate, this.state.term);
        event.preventDefault();
    }
    //calculate the mortgage payment per formula
    calculate(balance, rate, term){        
        let r = rate / 12 / 100;
        let n = term * 12;  
        console.log(r);
        console.log(n);
        let onePlusRtoN = (1+r)**n;
        console.log(onePlusRtoN);
        let m = balance * r * onePlusRtoN / (onePlusRtoN - 1);
        //looks up output element and sets payment rounded with $
        document.getElementById("output").innerHTML = "$" + m.toFixed(2) + " is your payment";
    }
    // shows react component on screen
    render() {
        return (
        <div className='container'>
              <form onSubmit={this.handleSubmit} className="form-horizontal">
                <div className="form-group">
                <div className="col-xs-3"></div>
                    <div className="col-xs-9">
                     <h3>Mortgage Calculator</h3>
                     <hr/>
                    </div>
                </div>
                <div className="form-group">
                  <label htmlFor="balance" className="col-xs-3 control-label">
                    Loan Balance
                  </label>
                  <div className="col-xs-9">
                    <input type="text" className="form-control" id="balance" name="balance" type="number" value={this.state.balance} onChange={this.handleBalanceChange} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="rate" className="col-xs-3 control-label">
                    Interest Rate (%)
                  </label>
                  <div className="col-xs-9">
                      <input type="text" className="form-control" id="rate" name="rate" type="number" step="0.01" value={this.state.rate} onChange={this.handleRateChange} />
                  </div>
                </div>
                <div className="form-group">
                    <label htmlFor="term" className="col-xs-3 control-label">Loan Term (years)</label>
                    <div className="col-xs-9">
                        <select className="form-control" id="term" name="term" value={this.state.term} onChange={this.handleTermChange}>
                      <option value="15">15</option>
                      <option value="30">30</option>
                    </select>
                    </div>
               </div> 
                <div className="form-group">
                  <div className="col-xs-offset-3 col-xs-9">
                    <button type="submit" className="btn btn-primary" name="submit" id="submit">
                      Submit
                    </button>
                  </div>
                </div>
                <div name="output" id="output" className="col-xs-offset-3 col-xs-9 well">
                </div>
              </form>
          </div>    

        );
    }
}
