import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate';
var token = localStorage.getItem('token');


class Amazon extends Component {
  constructor () {
    super();
    this.state = {
      file: null,
      course_id:'',
            course_name: ''
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(this.props.location.state.Assignment_description)
    // console.log(`lastModified - ${this.state.file[0].lastModified}`);
    
    formData.append('file', this.state.file[0]);
    formData.set('ID', this.state.file[0].lastModified);
    axios.post(`http://localhost:3001/upload`,formData,{
      headers: {
       'Content-Type': 'multipart/form-data',
      course_id: this.props.location.state.c_id,
      course_name: this.props.location.state.c_name,
      assignment_topic: this.props.location.state.Assignment_description,
      "Authorization": token

       }
    }).then(response => {
      // handle your response;
    }).catch(error => {
        console.log("Problem submitting New Post", error);

      // handle your error
    });
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
    console.log(`State - ${this.state}`)
  }

  render () {
    return (
  <div style={{paddingLeft:'250px'}}>
                            <br></br>
                            <br></br>


            <Jumbotron>
                <br></br>
                <br></br>
                <Navigate/>
      <form onSubmit={this.submitFile}>
        <h1>Submit Assignment</h1>
        <input type="file" name="file" onChange={this.handleFileUpload} />
        <button className="btn btn-success"type="submit">Upload</button>
      </form>
      </Jumbotron>
      </div>
   )
  }
}
export default Amazon;
