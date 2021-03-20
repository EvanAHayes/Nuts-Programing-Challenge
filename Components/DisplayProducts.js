import axios from 'axios';
import React, { useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Token} from '../TokenConfig/Token';
import Modal from 'react-modal';
import Link from 'next/link';
import ModalDisplay from '../Components/ModalDisplay/ModalDisplay'

//Set model in application
Modal.setAppElement("#__next");

//check if src image is undefined 
const checkImage = (findUndefined) => {
    if(typeof(findUndefined) === 'undefined'){
        return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg"
    }else{
       return findUndefined.url;
    }
}


const DisplayProducts = ({data}) => {
    const [Productdata, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if(data){
              setData(data.results)     
        }
    }, [data])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
          window.removeEventListener('scroll', handleScroll)
        }
      })

      const handleScroll = () => {
        const lastUserLoaded = document.querySelector(
            ".product-list > .product:last-child"
          )
          if (lastUserLoaded) {
            const lastUserLoadedOffset =
              lastUserLoaded.offsetTop + lastUserLoaded.clientHeight
            const pageOffset = window.pageYOffset + window.innerHeight
            // Detects when user scrolls down till the last user
            if (pageOffset > lastUserLoadedOffset) {

              // Stops loading when reach total number of products
              if (Productdata.length < data.total) {

                // Trigger fetch get more dropducts 
                const query = Productdata.length + 1;

                axios.get(`https://api.commercetools.co/nuts-custom-demo-1/products?offset=${query}&limit=10`,Token)
                .then( (response) => {
                   setData( Productdata.concat(response.data.results) )
                  
                    console.log(Productdata) });
              }
            }
          }
      }

    return(       

        <div className="product-list row">
        { Productdata.map((product) => {
            return(                 
                <div key={product.id} col-sm-4="true" className="product" >
                <Link href={`/?Product=${product.id}`} as={`/Product/${product.id}`}><a>
                <div className="p-2 m-3" style={{width: "300px", backgroundcolor: "#87cefa", outline: "5px solid #87cefa"}}>
                <div className="row">
                <div className="col-sm-12"> {product.masterData.current.name.en} </div> 
                </div>
                <img id="image" style={{width:"150px", height:"150px"}} src={checkImage(product.masterData.current.masterVariant.images[0])} alt={product.masterData.current.name.en} />
                <div className="row">
                 <div className="col-sm-12"> 
                 </div> 
                  </div>
                </div>
                </a>
                </Link>
                </div>          
            )
         }) }
         
         <Modal isOpen={!!router.query.Product}
         onRequestClose={() => router.push("/")}>
            <div> <ModalDisplay Productid={router.query.Product} /> </div>
          </Modal>
        </div>               
    )
}
export default DisplayProducts;




