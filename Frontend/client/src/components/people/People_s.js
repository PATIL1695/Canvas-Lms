import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate'
var token = localStorage.getItem('token');


class People_s extends React.Component {

        constructor(props) {
            super(props);
            this.state = {  
                display: [],
                course_id: '',
                course_name: ''

            }
        }

        componentDidMount() 
    {

        console.log("History data");
        if(this.props.location.state){
            console.log(this.props.location.state.c_id,"-------------")
        }
        const data = {
            course_id: this.props.location.state.c_id,
            course_name: this.props.location.state.c_name,
            token: token

        }
       
            axios.post('http://localhost:3001/People_student',data)
            .then(response =>{
                if(response.data.status == 200){
                    console.log("------------->",response.data.dataToDisp);
                    this.setState({
                        display: response.data.dataToDisp,
                        course_id: this.props.location.state.c_id
                    })
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }

    onPress = (e) =>{
        this.props.history.push('/sub_assign');
    }


  render() {
    var productResult = null;

    if (this.state.display != null) {
        console.log("Entered")
        productResult = this.state.display.map(display => {
    return (
        <div style={{paddingTop:'30px',paddingLeft:'40px'}}>
    
    <ListGroupItem>
           <b>Student ID:</b> {display.Student_id} <b>Student Name:</b> {display.firstName} {display.lastName}
            </ListGroupItem>

      
      </div>
    );
        })
    }

    return (
         <div style={{paddingTop:'30px',paddingLeft:'170px'}}>
                <Navigate></Navigate>

<Jumbotron  >
    <h2>Students Enrolled
        <br></br>
    Course Name: {this.props.location.state.c_name}
   
   </h2>
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

export default People_s