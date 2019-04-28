import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import axios from 'axios';
import Navigate from '../navbar/navigate';

class  Quiz extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            display: []
         }
    }
    componentDidMount() 
    {
       
            axios.get('http://localhost:3001/show_quiz')
            .then(response =>{
                if(response.data.status == 200){
                    console.log("------------->",response.data.dataToDisp);
                    this.setState({
                        display: response.data.dataToDisp
                    })
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }

    onSubmit = (e) =>{
        this.props.history.push('/Profile');
    }
    render() { 

        var productResult = null;

        if (this.state.display != null) {
            console.log("Entered")
            productResult = this.state.display.map(display => {
        return ( 
            <div>
                <Jumbotron>
                <h4>->{display.question}</h4>
                <input type="radio" name="option1" value="option1"/>{display.option1} <br/>
                <br></br>
  <input type="radio" name="option2" value="option2"/>{display.option2}<br/>
  <br></br>
  <input type="radio" name="option3" value="option3"/>{display.option3} <br/> 
  <br></br>
  <input type="radio" name="option4" value="option4"/>{display.option4} <br/>  
 
  </Jumbotron>
            </div>

)
})
}
return(
    <div className="mt-5" style={{paddingLeft:'250px'}}>
    <Navigate/>
            <h1><b><u color="secondary">Quizz</u></b></h1>
            <Jumbotron align="left" style={{paddingLeft:'200px'}}>
                <div className="container ">
                    {productResult}
                </div>
                <button type="submit"
                                className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>
                                Submit Quiz
                            </button>
                </Jumbotron>
                
            </div>
        );
    }
}
 
export default Quiz ;