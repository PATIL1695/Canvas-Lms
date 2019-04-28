import React, {Component} from 'react';
import Search from './Search';
import ProductsResults from './ProductsResults';
import axios from 'axios';
import { Jumbotron } from 'react-bootstrap';
import Navigate from '../navbar/navigate'
var token = localStorage.getItem('token');





class ProductMain extends Component{

    constructor(props){
        super(props);
        console.log(props);

        this.state = {
            products: []
        }

        //bind

        this.searchProduct = this.searchProduct.bind(this);
        this.onChangePage = this.onChangePage.bind(this);

    }

    componentDidMount(){
        console.log('Component Did Mount of Products Main');
        var token = localStorage.getItem('token');
        console.log(token,'++++++++++++');
        axios.post('http://localhost:3001/all/courses',{
            token:token
 
        }) 
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: response.data
                    })
                }
            });
    }

    componentWillMount(){
        console.log('Component Will Mount of Products Main');
    }


    searchProduct = (event)=>{
        console.log('search');
        const target = event.target;
       // const name = target.name;
        const value = target.value;
        var data = 
        {
            "search": value,
            token:token

        }
        axios.post('http://localhost:3001/search/',data)
            .then(response =>{
                if(response.status === 200){
                    console.log(response.data);
                    this.setState({
                        products: response.data
                    });
                }
            });
    }

    

    onPress = (e) => {
         
        window.location.reload();

    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render(){
        return(
            <div className="center-align container mt-5" style={{paddingLeft: '200px'}}>
            <Navigate></Navigate>
            <Jumbotron>
                <div>
                    <h1>Available courses</h1>
                </div>
                <div>
                    <Search searchProduct={this.searchProduct}/>


                    <ProductsResults products={this.state.products}/>
                    
                </div>
                <button onClick ={()=>this.props.history.push('/Profile')} className="btn btn-success">Profile</button>

                </Jumbotron>
            </div>
        )
    }
}

export default ProductMain;