import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import P_Navigate from '../navbar/prof_nav'
import axios from 'axios';
var token = localStorage.getItem('token');



class Add_announce extends Component {
    constructor(props) {
        super(props);
        this.state={
            Announce_topic:'',
            Announce_descp:'',
            course_id:'',
            course_name: ''
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault();
      const data1 = {
        Announce_topic : this.state.Announce_topic,
        Announce_descp:this.state.Announce_descp,
        course_id:this.props.location.state.c_id,
        course_name: this.props.location.state.c_name,
        token:token

      }
      //set the with credentials to true
      axios.defaults.withCredentials = true
      console.log(data1);
      //make a post request with the user data1
      axios.post('http://localhost:3001/add_announce',data1)
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
          this.props.history.push('/prof_Profile')
          //this.setState({response})

    }
    render() { 
        return ( 
            
<div style={{paddingLeft:'170px',paddingTop:'20px'}}>
<P_Navigate></P_Navigate>
    <Jumbotron >
    <h2>{this.props.location.state.c_id} - {this.props.location.state.c_name}</h2>

    <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    name="Announce_topic"
                                    placeholder="Announcement topic"
                                    value={this.state.Announce_topic}
                                    onChange={this.onChange}
                                />
                                </div>
            <form method="post">
<textarea name="Announce_descp" id="comments" style={{width:'96%',height:'90px',
backgroundcolor:'gold',color:'olive',border:'none',padding:'2%',
font:'22px/30px'}} placeholder="Publish Announcement Here"
value={this.state.Announce_descp}
onChange={this.onChange}>

</textarea>
</form>
<br></br>
<button onClick={this.onSubmit} className='btn btn-success' type="button" value="Submit" style={{float:'right'}}>Publish</button>
</Jumbotron>
</div>
         );
    }
}
 
export default Add_announce;