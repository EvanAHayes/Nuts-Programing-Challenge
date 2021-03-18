import React, { Component }  from 'react';
import axios from '../../axiosInstances/Axios';
//import Spinner from '../UI/Spinner/Spinner';
import {Token} from '../../TokenConfig/Token';


class ModalSummary extends Component {
state = {
    selectedProduct: null
}

    componentDidUpdate(){

       axios.get(`https://api.commercetools.co/nuts-custom-demo-1/products/${this.props.id}`,Token)
       .then(Response => {
           console.log(Response)
           this.setState({selectedProduct: Response.data})
       })
      }

    render(){
    //     let Summary = null
    //  if(this.props.id){
    //      Summary = <Spinner />
    //  }
//name,descrioption,image,price
        if(this.state.selectedProduct){
            if(typeof(this.state.selectedProduct.masterData.current.masterVariant.images[0]) === 'undefined'){
                return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg";
            }
            if(typeof(this.state.selectedProduct.masterData.current.masterVariant.prices[0].centAmount)=== 'undefined'){
                return "Not Avaliable";
            }
          Summary = (
                <div>
                <h1>{this.state.selectedProduct.masterData.current.name.en}</h1>
                    <img src={this.state.selectedProduct.masterData.current.masterVariant.images[0].url} 
                         alt={this.state.selectedProduct.masterData.current.name.en} />
          <p>{this.state.selectedProduct.masterData.current.description.en}</p>
          <h2>{this.state.selectedProduct.masterData.current.masterVariant.prices[0].centAmount}</h2>
          <button onClick={this.props.clicked}>Close</button>
                </div>
            )
        
    }
        return (
            <div>
                 {Summary}
            </div>
        )
    }
} 

export default ModalSummary;