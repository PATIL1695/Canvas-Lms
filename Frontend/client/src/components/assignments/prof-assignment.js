import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import P_Navigate from '../navbar/prof_nav'
import { Accordion, AccordionItem } from 'react-light-accordion';
//import 'react-light-accordion/demo/css/index.css';
import React, { Component } from 'react';
//import logger from 'logging-library';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error'; 
import { Document, Page } from 'react-pdf';

var token = localStorage.getItem('token');



class All_submissions extends React.Component {

        constructor(props) {
            super(props);
            this.state = {  
                display: [],
                numPages: null,

               pageNumber: 1,
               Assign_grade: ''
                
                


            }
            this.onSubmit = this.onSubmit.bind(this);
            this.onChange = this.onChange.bind(this);


        }
        
        onDocumentLoadSuccess = ({ numPages }) => {
            this.setState({ numPages });
          }
        

        componentDidMount() 
       {

       const data = {
          course_id: this.props.location.state.c_id
        }
        //console.log("History data",this.props.location.state.c_id); 
            axios.post('http://localhost:3001/get-files',data)
            .then(response =>{
                if(response.data.status == 200){
                    console.log("------------->",response.data.result);
                    this.setState({
                        display: response.data.result
                    })
                }
            });
    }
    

    componentWillMount(){}

    onPress = (param,Url,e) =>{
        e.preventDefault();
        //const file = 'http://example.com/image.png'
        //const type = 'png'
        //console.log("Param received",param)
        this.props.history.push({
            pathname : "/show_assign",
            state : {
                user : param,
                Url: Url
            }
        });

        
        
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (param,name) {
       // e.preventDefault();
      const data1 = {
        Assign_grade : this.state.Assign_grade,
        token: token,
        course_id: this.props.location.state.c_id,
        Assignment_topic: this.props.location.state.Assignment_topic,
        Assignment_Url: param,
        User: name

      }
      //set the with credentials to true
      //axios.defaults.withCredentials = true;
      console.log('@@@@@@@@@@@@',data1);
      //make a post request with the user data1
      axios.post('http://localhost:3001/assignment/grade',data1)
          .then(response => {
              console.log("Profile response alli..........",response.data1.message);
              if(response.data1.message === "Success"){
                  console.log("entered into success")
                  
              }else{
                  console.log("entered into failure")
                  this.setState({hasError : response})
              }
          }).catch(res=>{
              console.log(res.response);
          })
          //this.props.history.push('/prof_Profile')
          //window.location.reload();


    }


  render() {
    var productResult = null;
    const { pageNumber, numPages } = this.state;

    
    if (this.state.display != null) {
        console.log("Entered")
        productResult = this.state.display.map(display => {
      return(
        <div style={{paddingTop:'30px',paddingLeft:'70px'}}>
    
        <Accordion atomic={true}>
    
    <AccordionItem title={ `${display.User}-----------------graded score ${display.Assign_grade}`}>
    <b>graded score: {display.Assign_grade}</b>
   <textarea placeholder = "Enter the grade" name='Assign_grade' onChange={this.onChange} value={this.state.Assign_grade}></textarea>
   <button onClick={()=>this.onSubmit(display.Url,display.User)} className='btn btn-success' type="button" value="Submit">Grade</button>

    </AccordionItem>
    <button type="button" class="btn btn-primary" style={{position:'relative', float:'right'}} onClick={(e)=>this.onPress(display.User,display.Url,e)}> + View Assignment </button>

    </Accordion>
          
          </div>
      ) 
    })
}


return (
    <div style={{paddingTop:'30px',paddingLeft:'170px'}}>
           <P_Navigate></P_Navigate>

<Jumbotron>
<h2>{this.props.location.state.c_id}-Assignments</h2>
<br></br>
<br></br>
 <ListGroup></ListGroup>
       <div className="container ">
           {productResult}
       </div>
   
       </Jumbotron>
       
   </div>
);
}
}

    

export default All_submissions