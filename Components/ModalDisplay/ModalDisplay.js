import {Token} from '../../TokenConfig/Token';
import useSWR from 'swr';

const getProductDetails = (Productid) => 
fetch(`https://api.commercetools.co/nuts-custom-demo-1/products/${Productid}`,Token)
.then((response)=> response.json());

export default function product({Productid}){
    //swr take two parameters key and a fetchercher functions
    const {data, error} = useSWR(Productid, getProductDetails);

    if(error) return <div>No Product</div>;
    if(!data) return <div>Loading...</div>
    if(typeof(data.masterData.current.masterVariant.images[0]) === 'undefined'){
        return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg";
    }
    // else if (typeof(data.masterData.current.masterVariant.prices[0] === 'undefined')){
    //     return {"N/a"}
    // }
     console.log(data)
    return(
        <div key={data.id}>
        <div className="card" style={{width: "18rem"}}>
        <img className="card-img-top" src={data.masterData.current.masterVariant.images[0].url} 
                                  alt={data.masterData.current.name.en} />
        <div className="card-body">
          <h3 className="card-title">{data.masterData.current.name.en}</h3>
          <p className="card-text">{data.masterData.current.description.en}</p>
          <br/>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
      </div>
    )

}

// if(this.state.selectedProduct){
//     if(typeof(this.state.selectedProduct.masterData.current.masterVariant.images[0]) === 'undefined'){
//         return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg";
//     }
//     if(typeof(this.state.selectedProduct.masterData.current.masterVariant.prices[0].centAmount)=== 'undefined'){
//         return "Not Avaliable";
//     }
//   Summary = (
//         <div>
//         <h1>{this.state.selectedProduct.masterData.current.name.en}</h1>
//             <img src={this.state.selectedProduct.masterData.current.masterVariant.images[0].url} 
//                  alt={this.state.selectedProduct.masterData.current.name.en} />
//   <p>{this.state.selectedProduct.masterData.current.description.en}</p>
//   <h2>{this.state.selectedProduct.masterData.current.masterVariant.prices[0].centAmount}</h2>
//   <button onClick={this.props.clicked}>Close</button>
//         </div>

//axios.get(`https://api.commercetools.co/nuts-custom-demo-1/products/${this.props.id}`,Token)