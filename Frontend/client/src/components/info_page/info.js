import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {Grid,Col,Image,ButtonToolbar,DropdownButton, Dropdown, Jumbotron} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import './style.css';
import navigate from '../navbar/navigate'
import Navigate from '../navbar/navigate'
var token = localStorage.getItem('token');



//Define a Login Component
class SignUp extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            Student_id : "",
            pictures : [],
            firstName : "",
            lastName : "",
            email : "",
      citycountry : "",
          company : "",
           school : "",
         hometown : "",
         language : "",
           gender : "",
            phone : "",
            About : ""
        }
        this.onDrop = this.onDrop.bind(this);
        this.onChange = this.onChange.bind(this)


    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    

    
      onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit=(e)=>{
      var headers = new Headers();
      //prevent page from refresh
      e.preventDefault();
      const data = {
        Student_id : this.state.Student_id,
        Image : this.state.Image,
        email:this.state.email,
        firstName : this.state.firstName,
        lastName : this.state.lastName,
  citycountry : this.state.citycountry,
       school : this.state.school,
     language : this.state.language,
       gender : this.state.gender,
        phone : this.state.phone,
        About : this.state.About,
        token: token
      }
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      console.log(data);
      //make a post request with the user data
      axios.post('http://localhost:3001/updateProfile',data)
          .then(response => {
              console.log("Profile response alli..........",response.data.message);
              if(response.data.message === "Success"){
                  console.log("entered into success")
                
                  
              }else{
                  console.log("entered into failure")
                  this.setState({hasError : response})
              }
          }).catch(res=>{
              console.log(res.response);
          })
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        // if(cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }

        return(
            <div className='container' style={{paddingLeft:'150px'}}>
            <Navigate/>
            <nav />
            <Jumbotron>
            <ImageUploader
                withIcon={false}
                buttonText='Choose profile picture'
                onChange={this.onDrop}
                imgExtension={['.jpg ', '.gif ', '.png ', '.gif ']}
                maxFileSize={5242880}
                value={this.onChange}
            /></Jumbotron>
            <Jumbotron>
                    <div className="row">
                    <nav />
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}></form>
                    <div className="form-group">
                                <label htmlFor="last_name">Enter Student_id</label>
                                <input type="number"
                                    className="form-control"
                                    name="Student_id"
                                    placeholder="Student_id"
                                    value={this.state.Student_id}
                                    onChange={this.onChange}
                                />

                            <br></br>
                            <div className="form-group">
                                <label htmlFor="last_name">Enter email</label>
                                <input type="text"
                                    className="form-control"
                                    name="email"
                                    placeholder="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                </div>
                            </div>
<br></br>
                            
                            <div className="form-group">
                                <label htmlFor="first_name">Enter First Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.onChange}
                                />
                                                        <br></br>
                                                        <div className="form-group">
                                <label htmlFor="last_name">Enter Last Name</label>
                                <input type="text"
                                    className="form-control"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.onChange}
                                />
                                <br></br>

                            <div className="form-group">
                                <label htmlFor="email">Enter city and country</label>
                                <input type="text"
                                    className="form-control"
                                    name="citycountry"
                                    placeholder="city country "
                                    value={this.state.citycountry}
                                    onChange={this.onChange}
                                />
                                                        <br></br>

                            <div className="form-group">
                                <label htmlFor="password">Enter School</label>
                                <input type="text"
                                    className="form-control"
                                    name="school"
                                    placeholder="school"
                                    value={this.state.school}
                                    onChange={this.onChange}
                                />
                                                            <br></br>

                                <div className="form-group">
                                <label htmlFor="language">Enter Language</label>
                                <input type="text"
                                    className="form-control"
                                    name="language"
                                    placeholder="language"
                                    value={this.state.language}
                                    onChange={this.onChange}
                                />
                            <br></br>

                                <div className="form-group">
                                <label htmlFor="phone">Enter phone</label>
                                <input type="number"
                                    className="form-control"
                                    name="phone"
                                    placeholder="phone"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                />
                                                            <br></br>

                                <div className="form-group">
                                <label htmlFor="About">About</label>
                                <input type="text"
                                    className="form-control"
                                    name="About"
                                    placeholder="About Me"
                                    value={this.state.About}
                                    onChange={this.onChange}
                                />
                                                            <br></br>

                            </div>
                        
                            </div>
                            </div>

                            <div>
                            <label>Select gender</label>
                            <div onChange={this.onChange}>
        <input type="radio" value="MALE" name="gender"/> Male        <br></br>
        <input type="radio" value="FEMALE" name="gender"/> Female
      </div>

                  
<br></br>
<br></br>
</div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>
                                submit
                            </button>
                        </div>
                    </div>
                </div> 
</div>
            </div>
          </div>
          </Jumbotron>
            </div>
            
        )
    }
}
//export Login Component
export default SignUp;

