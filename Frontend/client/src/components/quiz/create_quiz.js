import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import P_navigate from '../navbar/prof_nav';

class Quiz_c extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question : "",
            option1 : "",
             option2 : "",
          option3 : "",
           option4 : "",
           course_id: []
          }
        //this.onDrop = this.onDrop.bind(this);
        this.onChange = this.onChange.bind(this)
    }
    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    


    onSubmit=(e)=>{
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
          question : this.state.question,
          option1 : this.state.option1,
          option2:this.state.option2,
          option3 : this.state.option3,
    option4 : this.state.option4,
    course_id: this.state.course_id
        
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        console.log(data);
        //make a post request with the user data
        axios.post('http://localhost:3001/add_quiz',data)
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
                window.location.reload();

            })
      }

      cancelCourse = () => { 
        document.getElementById("create-course-form").reset();
      }
    render() { 
        return ( 
            <div style={{paddingLeft:'250px'}}>
                <P_navigate/>
                <Jumbotron>

            <div className="form-group">
            <label htmlFor="question">Enter the question</label>
            <input type="text"
                className="form-control"
                name="question"
                placeholder="question"
                value={this.state.question}
                onChange={this.onChange}
            />
            </div>
             <div  id ="create-course-form" className="form-group">
                                <label htmlFor="option1">Enter option 1</label>
                                <input type="text"
                                    className="form-control"
                                    name="option1"
                                    placeholder="option 1"
                                    value={this.state.option1}
                                    onChange={this.onChange}
                                />
                                </div>
                                <div  id ="create-course-form" className="form-group">
                                <label htmlFor="option2">Enter option 2</label>
                                <input type="text"
                                    className="form-control"
                                    name="option2"
                                    placeholder="option 2"
                                    value={this.state.option2}
                                    onChange={this.onChange}
                                />
                                </div>
                                <div id ="create-course-form" className="form-group">
                                <label htmlFor="option3">Enter option 3</label>
                                <input type="text"
                                    className="form-control"
                                    name="option3"
                                    placeholder="option 3"
                                    value={this.state.option3}
                                    onChange={this.onChange}
                                />
                                </div>
                                <div id ="create-course-form" className="form-group">
                                <label htmlFor="last_name">Enter option 3</label>
                                <input type="text"
                                    className="form-control"
                                    name="option4"
                                    placeholder="option 4"
                                    value={this.state.option4}
                                    onChange={this.onChange}
                                />
                                </div>
                                <button type="submit"
                                className="btn btn-lg btn-primary btn-block" onClick={this.onSubmit}>
                                 + Add questions
                            </button>
                                </Jumbotron>
                                
                                </div>
         );
    }
}
 
export default Quiz_c ;