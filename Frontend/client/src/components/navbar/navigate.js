import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import logo from './img.png';
//import logo from './img.jpg'; // with import
import './style.css';
import './style3.css';

import { Link, withRouter } from 'react-router-dom'
var token = localStorage.getItem('token');



//import Sidebar from "react-sidebar";
//const mql = window.matchMedia(`(min-width: 800px)`);




class Navigate extends Component {
    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: []
        }

    }

    

    enroll = (e) =>{
        e.preventDefault();
        this.props.history.push("/Products");

    }
    profile = (e) =>{
        e.preventDefault();
        this.props.history.push("/info");

    }
    show = (e) =>{
        e.preventDefault();
        this.props.history.push("/show");


    }
    dashboard = (e) =>{
        e.preventDefault();
        this.props.history.push("/profile");

    }
    people = (param,name,e) =>{
        e.preventDefault();
        console.log("Param received",param)
        this.props.history.push({
            pathname : "/People_student",
            state : {
                c_id : param,
                c_name: name
            }
        });
    }
    courses = (e) =>{
        e.preventDefault();
        this.props.history.push("/course");

    }
    assignment = (param,name,e) =>{ 
        e.preventDefault();
        console.log("Param received",param)
        this.props.history.push({
            pathname : "/stud_assign",
            state : {
                c_id : param,
                c_name: name
            }
        });

    }

    quiz = (e) =>{
        e.preventDefault();
        this.props.history.push('/stud_quiz')
    }

    announcements = (param,name,e) =>{
        e.preventDefault();
        console.log("Param received",param)
        this.props.history.push({
            pathname : "/Stud_announce",
            state : {
                c_id : param,
                c_name: name
            }
        });

    }
    logout = (e) =>{
        e.preventDefault();
        localStorage.clear();

        axios.post('http://localhost:3001/logout')
        .then(response=>{
            if(response.status === 200){
                localStorage.clear();

                this.props.history.push('/')
            }
        })
    }





    componentDidMount(){
        var token = localStorage.getItem('token');

        console.log('Component Did Mount Navigate');
        axios.post('http://localhost:3001/all/subjects',{token: token})
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: [... response.data.dataToDisp]

                    })
                }
            });
    }
    onPress = (e) => {
        console.log("======>");
       
        console.log('Component Did Mount of Products Main');
        axios.post('http://localhost:3001/all/subjects',{
            
            token:token
        })
            .then(response =>{
                if(response.status === 200){
                    console.log('@@@@@@@@@@@@@@@@@@',response.data); 
                    this.setState({
                        products: [... response.data.dataToDisp]
                        
                    })
                }
            });
    }

    
    render() { 
        

        var productResult = null;
        var productResult1 = null;
        var productResult2 = null;
        var productResult3 = null;
        var productResult4 = null;
        var productResult5 = null;





        console.log("_--------", this.state.products.length);


        if (this.state.products.length> 0) {
            //let count=0;
            console.log("========",this.state.products)
            productResult = this.state.products.map(products => {
        return (
                <li><a  >courses-{products.course_id}- {products.course_name}</a></li>
            )
           
    })
    productResult1 = this.state.products.map(products => {
        return (
                <li><a onClick ={(e)=>this.assignment(products.course_id,products.course_name,e)} >Assignments-{products.course_id}- {products.course_name}</a></li>
            )
        })

        productResult2 = this.state.products.map(products => {
            return (
                    <li><a onClick ={this.quiz} > Quizzes-{products.course_id}- {products.course_name}</a></li>
                )
            })

            productResult3 = this.state.products.map(products => {
                return (
                        <li><a onClick ={this.assignment} > files-{products.course_id}- {products.course_name}</a></li>
                    )
                })

                productResult4 = this.state.products.map(products => {
                    return (
                            <li><a onClick ={(e)=>this.people(products.course_id,products.course_name,e)} > People-{products.course_id}- {products.course_name}</a></li>
                        )
                    })
                    productResult5 = this.state.products.map(products => {
                        return (
                                <li><a onClick ={(e)=>this.announcements(products.course_id,products.course_name,e)} > People-{products.course_id}- {products.course_name}</a></li>
                            )
                        })
}
return(
    <div class="nav-side-menu">
        <a class="navbar-brand" href="/">
      <div class="logo-image">
            <img src={logo} class="img-fluid"/>
      </div>
</a>


    <li data-toggle="collapse"  class="collapsed">
                <a onClick={this.dashboard}><i class="fa fa-gift fa-lg"></i> Dashboard <span class="arrow"></span></a>
    </li>
            

            <li data-toggle="collapse" data-target="#products" class="collapsed ">
                <a href="#"><i class="fa fa-gift fa-lg"></i> Profile <span class="arrow"></span></a>
            </li>
            <ul class = "active" class="sub-menu collapse" id="products">
                <li class="active"><a onClick={this.profile}>Create or Update Profile</a></li>
                <li class="active"><a onClick={this.show}>View Profile</a></li>
            </ul>
            
    
    <li class="active" data-toggle="collapse" data-target="#product" class="collapsed">
                <a><i class="fa fa-gift fa-lg"></i> courses <span class="arrow"></span></a>
            </li>
            <ul class="active" class="sub-menu collapse" id="product">
               {productResult}
            </ul>

            <li class="active" data-toggle="collapse" data-target="#product1" class="collapsed" onClick = {this.onPress}>
                <a><i class="fa fa-gift fa-lg" ></i> Assignments <span class="arrow"></span></a>
            </li>
            <ul  class="active" class="sub-menu collapse" id="product1">
               {productResult1}
            </ul>

            <li class="active" data-toggle="collapse" data-target="#product2" class="collapsed" onClick = {this.onPress}>
                <a><i class="fa fa-gift fa-lg"></i> Quizzes <span class="arrow"></span></a>
            </li>
            <ul class="active" class="sub-menu collapse" id="product2">
               {productResult2}
            </ul>
            <li class="active" data-toggle="collapse" data-target="#product5" class="collapsed" onClick = {this.onPress}>
                <a><i class="fa fa-gift fa-lg"></i> Announcements<span class="arrow"></span></a>
            </li>
            <ul class="active" class="sub-menu collapse" id="product5">
               {productResult5}
            </ul>
            <li class="active" data-toggle="collapse" data-target="#product4" class="collapsed" onClick = {this.onPress}>
                    <a ><i class="fa fa-car fa-lg" ></i> People<span class="arrow"></span></a>
                </li>
                <ul class="active" class="sub-menu collapse" id="product4">
                   {productResult4}
                </ul>

            <li class="active" data-toggle="collapse" data-target="#product3" class="collapsed" onClick = {this.onPress}>
                <a><i class="fa fa-gift fa-lg"></i> Files <span class="arrow"></span></a>
            </li>
            <ul  class="active" class="sub-menu collapse" id="product3">
               {productResult3}
            </ul>


            <li class="active" data-toggle="collapse" data-target="#new" class="collapsed">
                <a onClick={this.enroll}><i class="fa fa-car fa-lg" ></i> Enroll<span class="arrow"></span></a>
            </li>

            <li class="active" data-toggle="collapse" data-target="#new" class="collapsed">
                <a onClick={this.logout}><i class="fa fa-car fa-lg" ></i> Logout<span class="arrow"></span></a>
            </li>
    </div>
            

)

            
         
    }
}
 export default withRouter(Navigate)
