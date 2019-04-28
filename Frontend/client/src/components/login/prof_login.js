import React, { Component } from 'react'
import { login } from '../userfun/UserFunctions'
import Navbar from '../navbar/Navbar'
import img from "./img.png"
import { Jumbotron } from 'react-bootstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';





class Prof_Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            hasError : "",
            loginSuc : "",
            authFlag: false

        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            email: this.state.email,
            password: this.state.password
        }
    
            axios.post('http://localhost:3001/prof/login', {
            email: user.email,
            password: user.password
        })
        
        .then(res => {
            if(res.data.token !== undefined){
                //console.log('token+++++',res.data.token);
                toast.success('upload success')

                console.log('token+++++',res.data.token);
            localStorage.setItem('token', res.data.token);

               this.props.history.push('/prof_profile');
               window.location.reload()


             }else{
            alert("No such user found OR wrong password")

                //console.log("here....",res.data.token);
                this.props.history.push(`/prof_login`)
             }
        
            
        })
    }

    render () {
        let redirectVar = null;
            redirectVar = <Redirect to= "/Profile"/>
        return (
            <div class="container">
            <Navbar />
            <img src={img} alt="img"style={{ position: 'relative'}}/>

                <div class="login-form">
                    <div class="col-md-6 mt-5 mx-auto">
                        <form  onSubmit={this.onSubmit}>
                            <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
                            <div class="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input onChange={this.onChange} type="email"  class="form-control" name="email" placeholder="Enter Email" required />
                            </div>
                            <div class="form-group">
                                <label htmlFor="password">Password</label>
                                <input  onChange={this.onChange} type="password" class="form-control" name="password" placeholder="Enter Password" required />
                            </div>
                            <button type="submit"
                                class="btn btn-lg btn-primary btn-block">
                                Sign in
                            </button>
                            </form>

                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Prof_Login