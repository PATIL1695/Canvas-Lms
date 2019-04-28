import axios from 'axios'
import { Alert } from 'react-alert'





export const register = newUser => {
    console.log("Register function called");
    return axios
        .post('http://localhost:3001/student/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            //console.log("Registered",res.data.user.email)
            if(res.data.user.email.length > 0){
            alert("not able to register already exisits")
            }
           // alert("sucessfully registered")
        
        })
        .catch(err => {
            console.log(err)
            //alert("not able to register")
        })
}

export const prof_register = newUser => {
    console.log("Register function called");
    return axios
        .post('http://localhost:3001/prof/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then(res => {
            //console.log("Registered")
            if(res.data.user.email.length > 0){
                alert("not able to register already exisits")
                }
                //alert("sucessfully registered")
        })
        .catch(err => {
            console.log(err)
        })
}

export const prof_login = user => {
    console.log("Login method");
    
    return axios
        .post('http://localhost:3001/prof/login', {
            email: user.email,
            password: user.password
        })
        
        .then(res => {
            if(res.status === 200){
                this.setState({
                    authFlag : true
                })
            }else{
                this.setState({
                    authFlag : false
                })
            }
            console.log(res.data.status);
            console.log("logged in")
        })
        .catch(err => {
            console.log(err)
            alert("not able to signin")

        })
}

export const login = user => {
    console.log("Login method");
    
    return axios
        .post('http://localhost:3001/student/login', {
            email: user.email,
            password: user.password
        })
        
        .then(res => {
            if(res.status === 200){
               //this.props.history.push('/Profile');

            }else{
                this.setState({
                    authFlag : false
                })
            
            
               alert("incorrect email")
            //this.props.history.push('/login');
            }

            if(res.data.status === 400)
            {
            alert("not able to signin enter correct credentials")
            //this.props.push('/login');
            }
            
            
            console.log(res.data.status);
            console.log("logged in")
            


        })

        .catch(err => {
            if(user.email.length == 0 || user.password.length == 0 ){
                alert("pls enter email and password");
            }
            
            //this.props.push('/login');
            console.log(err)
        
        })
    
}