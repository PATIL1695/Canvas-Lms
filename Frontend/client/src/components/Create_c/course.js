import React, { Component } from 'react'
import { register } from '../userfun/UserFunctions'
import Navbar from '../navbar/Navbar'
import Axios from 'axios';
import P_Navigate from '../navbar/prof_nav'
var token = localStorage.getItem('token');



class course extends Component {
    constructor() {
        super()
        this.state = {
            course_id: '',
            course_name: '',
            course_dept: '',
            course_desc: '',
            course_room: '',
            course_cap: '',
            waitlist: '',
            term: ''
        }

        this.onChange = this.onChange.bind(this)
        this.create = this.create.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    

        
        create =(e) => {

            const course = {

                course_id: this.state.course_id,
                course_name: this.state.course_name,
                course_dept: this.state.course_dept,
                course_desc: this.state.course_desc,
                course_room: this.state.course_room,
                course_cap: this.state.course_cap,
                waitlist: this.state.waitlist,
                term: this.state.term,
                token: token
            
            }
            e.preventDefault();
            Axios.defaults.withCredentials = true;
            console.log(course);
            Axios.post('http://localhost:3001/create/course',course)
            .then(Response=>{
                this.setState({error:""})
                console.log("status code : ",Response.status);
                this.props.history.push('/prof_profile');
                window.location.reload();


            })
            .catch(Response=>{
                this.setState({Error: Response.data})
//console.log("not created",JSON.stringify(this.state.Error.msg))
        this.props.history.push('/prof_profile');
        window.location.reload();

            })
        }

        

    render () {
        return (
            <div className="container" >
            <P_Navigate/>
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Add courses</h1>
                            <div className="form-group">
                                <label htmlFor="course_id">course_id</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_id"
                                    placeholder="Enter course id"
                                    value={this.state.course_id}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course_name">course_name</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_name"
                                    placeholder="Enter course Name"
                                    value={this.state.course_name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="course_dept">Dept</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_dept"
                                    placeholder="Enter dept"
                                    value={this.state.course_dept}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">descrpition</label>
                                <input type="text"
                                    className="form-control"
                                    name="course_desc"
                                    placeholder="Enter description"
                                    value={this.state.course_desc}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="room no">Room no</label>
                                <input type="number"
                                    className="form-control"
                                    name="course_room"
                                    placeholder="Enter room no"
                                    value={this.state.course_room}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="class capacity">capacity</label>
                                <input type="number"
                                    className="form-control"
                                    name="course_cap"
                                    placeholder="Enter class capacity"
                                    value={this.state.course_cap}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="waitlist">waitlist</label>
                                <input type="number"
                                    className="form-control"
                                    name="waitlist"
                                    placeholder="Enter waitlist capacity"
                                    value={this.state.waitlist}
                                    onChange={this.onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">term</label>
                                <input type="text"
                                    className="form-control"
                                    name="term"
                                    placeholder="Enter term"
                                    value={this.state.term}
                                    onChange={this.onChange}
                                />
                            </div>
                            <button type="submit"
                                className="btn btn-lg btn-primary btn-block" onClick={this.create}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default course