import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';



import Navigate from './components/navbar/navigate'
import info from './components/info_page/info'
import info_prof from './components/info_page/prof_show'

import show from './components/info_page/show'

import show_prof from './components/info_page/prof_info'


import Landing from './components/landing/Landing'
import Login from './components/login/Login'
import Prof_Login from './components/login/prof_login'

import Prof_Register from './components/register/prof_reg'
import Register from './components/register/Register'

import Profile from './components/profile/Classes'
import Prof_Profile from './components/profile/Prof_classes'
import Display_assign from './components/assignments/display_assign'


import course from './components/Create_c/course'
//import course from './components/dis_class/ProductsMain'
import ProductMain from './components/Products/ProductsMain';
import ProductsResults from './components/Products/ProductsResults';
import Classes from './components/profile/Classes';

import Assign_s from './components/assignments/Assign_s'

import All_assign from "./components/assignments/all_assign"
import Add_assign from "./components/assignments/add_assign"

import Quiz from "./components/quiz/stud_quiz"
import Quiz_c from './components/quiz/create_quiz';
import Stud_Assign from './components/assignments/stud_assign';
import People_s from './components/people/People_s';
import Prof_people from './components/people/prof_people';
import Announce from './components/announce/Prof_announce';
import Add_announce from './components/announce/add_announce';
import Announce_stud from './components/announce/Stud_announce';
import Amazon from './components/assignments/Assign_s';
import All_submissions from './components/assignments/prof-assignment';






class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/prof_register" component={Prof_Register} />
            <Route exact path="/show_assign" component={Display_assign} />


            <Route exact path="/login" component={Login} />
            <Route exact path="/prof_login" component={Prof_Login} />

            <Route exact path="/profile" component={Profile} />
            <Route exact path="/prof_profile" component={Prof_Profile} />

            <Route exact path="/info" component={info} />
            <Route exact path="/info_prof" component={info_prof} />

            <Route exact path="/show" component={show} />
            <Route exact path="/prof_show" component={show_prof} />


            <Route exact path="/course" component={course} />
            <Route exact path="/products" component={ProductMain}/>
            <Route exact path="/products" component={ProductsResults}/>
            <Route exact path="/subjects" component={Classes}/>

            <Route exact path="/Sub_assign" component={Assign_s}/>

          <Route exact path="/all_assign" component={All_assign}/>
          <Route exact path="/add_assign" component={Add_assign}/>
          <Route exact path="/stud_assign" component={Stud_Assign}/>

          

          <Route exact path="/stud_quiz" component={Quiz}/>

          <Route exact path="/Quiz_c" component={Quiz_c}/>

          <Route exact path="/People_student" component={People_s}/>
          <Route exact path="/Prof_people" component={Prof_people}/>
          <Route exact path="/Prof_announce" component={Announce}/>
          <Route exact path="/add_announce" component={Add_announce}/>
          <Route exact path="/Stud_announce" component={Announce_stud}/>
          <Route exact path="/uploads" component={Amazon}/>
          <Route exact path="/all-submissions" component={All_submissions}/>


      








            

            


          </div>
        </div>
      </Router>
    );
  }
}

export default App;
