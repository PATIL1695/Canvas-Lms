import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron, Badge } from 'reactstrap'
import navigate from '../navbar/navigate'
import Navigate from '../navbar/prof_nav'
import img from './img.jpeg'
var token = localStorage.getItem('token');


class show extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            profiles: []
        }
    }
    // onChange (e) {
    //     this.setState({ [e.target.name]: e.target.value })
    // }


    componentDidMount() 
    {
       
            axios.post('http://localhost:3001/show',{token: token})
            .then(response =>{
                if(response.data.status == 200){
                    //console.log("------------->",response.data.dataToDisp);
                    //var display = Array.from(response.data.dataToDisp);
                    //console.log("------------->",display);


                    this.setState({
                        profiles: [response.data.result]
                    })
                    console.log("------------->",this.state.profiles);

                }
            });
    }

    
    render() { 

        var productResult = null;

        if (this.state.profiles != null) {
            //console.log("Entered",this.state.profiles)
            //this.state.profiles = Array.from(this.state.profiles);
            //console.log("Entered++++",this.state.profiles)

            productResult = this.state.profiles.map(profiles => {
                return (
                    <div className="form" style={{paddingLeft:'150px'}}  key={profiles.Student_id} >
                    <Navigate/>
                        <div className="form">
                        
                            <h4><b>First Name: {profiles.firstName}</b></h4>
                            <br></br>
                            <h4><b>Last Name: {profiles.lastName}</b></h4>
                            <br></br>
                            <h4><b>Email: {profiles.email}</b></h4>
                            <br></br>
                            <h4><b>Professor ID: {profiles.Student_id}</b></h4>
                            <br></br>
                            <h4><b>City and Country: {profiles.citycountry}</b></h4>
                            <br></br>
                            <h4><b>Company: {profiles.school}</b></h4>
                            <br></br>
                            <h4><b>Phone Number: {profiles.phone}</b></h4>
                            <br></br>
                            <h4><b>About: {profiles.About}</b> </h4>                           
                             <br></br>
                            <h4><b>Gender: {profiles.gender}</b></h4>
                            <br></br>
                            <h4><b>Type: {profiles.typeOfPerson}</b></h4>
                        </div>

                    </div>
                )
            })
        }
        return (
            <div className="mt-5">
            <h1><b><u><Badge color="secondary">Profile Information</Badge></u></b></h1>

            <Jumbotron align="left" style={{paddingLeft:'200px'}}>
            <img src={img} alt="img"style={{ float: 'right'}}/>

                <div className="container ">
                    {productResult}
                </div>
                </Jumbotron>
                
            </div>
         );
    }
}
 
export default show;