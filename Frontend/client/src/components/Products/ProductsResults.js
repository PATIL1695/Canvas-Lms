import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
var token = localStorage.getItem('token');




class ProductsResults extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.onPress = this.onPress.bind(this)
        
    }

    componentWillMount() {
        console.log('Component Will mount of product results invoked!');
    }

    componentDidMount() {
        console.log('Component Did mount of product results invoked!');
        
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('Should Component update', nextProps, "state", nextState);
       return true;
        
    }

    componentWillReceiveProps(nextProps){
        console.log('Component Will Recieve Props ', nextProps);
        //Assign props to state

    }

    
    componentWillUpdate(nextProps, nextState){
        console.log(' Component will update', nextProps, ".State: ", nextState);
        
    }

    componentDidUpdate(){
        //not called on initial render
        console.log('component did update');
        // if(this.state.name.length > 5){
        //     this.setState({
        //         name: this.state.name.substring(0,5)
        //         });
        // }
        
    }

    onPress (data) {
        console.log("======>",data);
        let token = localStorage.getItem('token');
        console.log(token,'++++++++++++');
       
        axios({
            method: 'post',
            url: 'http://localhost:3001/enroll',
            data: {
              data,
              token:token

            }

          });
          console.log(data);
        
    }


    render() {

        var productResult = null;

        if (this.props.products != null) {
            let count=0;
            productResult = this.props.products.map(products => {
                return (
                    <div className="col-3 mt-3 mb-3"   >
                        <div className="border product">
                            <div></div>
                            <div>{products.course_id}</div>
                            <div><b>{products.course_name}</b></div>
                            <div><b>{products.term}</b></div>
                            <button onClick ={()=>this.onPress(products)} className="btn btn-success">enroll</button>

                        </div>

                    </div>
                )
            })
        }

        return (
            <div className="mt-5" >
                <div className="row mb-5 results-container ">
                    {productResult}
                </div>
                
            </div>
        )
    }
}

export default ProductsResults;