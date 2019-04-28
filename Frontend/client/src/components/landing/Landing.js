import React, { Component } from 'react'
import logo from './img.png'; // with import
import Navbar from '../navbar/Navbar'



class Landing extends Component {

    constructor() {
        super()
        this.state = {}
        

        this.onChange = this.onChange.bind(this)
        this.onChang = this.onChang.bind(this)

    }

    onChange (e) {
this.props.history.push("/login")
    }

    onChang (e) {
        this.props.history.push("/prof_login")
            }
    render () {
        return (
            
            <div className="container" >
            <Navbar/>
            <div className="logo">
          <img src={logo} alt="img"style={{position: 'relative'}}/>
          
  
        </div>    
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Canvas</h1>
                    </div>
                </div> 
                <br></br>
                <button type ="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onChange}>Student Login</button>
                <br></br>
                <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={this.onChang}>Professor Login</button>
            </div>
        )
    }
}

export default Landing