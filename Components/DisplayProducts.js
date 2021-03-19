import axios from 'axios';
import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Token} from '../TokenConfig/Token';
import Aux from '../hoc/Aux';
import Modal from 'react-modal';
import Link from 'next/link';

Modal.setAppElement("#__next");

const DisplayProducts = ({data}) => {
    console.log(data)

    const [Productdata, setData] = useState([]);

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
              // Stops loading
              if (data.results.length < data.total) {
                // Trigger fetch
                const query = data.results.length + 1;

                axios.get(`https://api.commercetools.co/nuts-custom-demo-1/products?offset=${query}&limit=10`,Token)
                .then( (response) => { 
                    setData(response.data.results)
                    console.log(response.data.results) });
                // router.push({
                //   pathname: `https://api.commercetools.co/nuts-custom-demo-1/products?offset=${query}&limit=10`,config
                  
                // })
              }
            }
          }

        
      }


    return(
        <Aux>

         <Modal isOpen={false}>
         <div>In the modal</div>
         </Modal>

        <div className="product-list">
        { Productdata.map((product) => {
            if(typeof(product.masterData.current.masterVariant.images[0]) === 'undefined'){
                return "https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/ece4edb2868a8225.cro-U2aFaCJE-thumb.jpg";
            }

            return(
                <Link href={`/Product/[Product]?Product=${product.masterData.current.name.en}`} as={`/Product/${product.masterData.current.name.en}`}><a>
                <div key={product.id} col-sm-4="true" className="product" >
                <div className="p-2 m-3" style={{width: "300px", backgroundcolor: "#87cefa", outline: "5px solid #87cefa"}}>
                <div className="row">
                <div className="col-sm-12"> {product.masterData.current.name.en} </div> 
                </div>
                <img id="image" style={{width:"150px", height:"150px"}} src={product.masterData.current.masterVariant.images[0].url} alt={product.masterData.current.name.en} />
                <div className="row">
                 <div className="col-sm-12"> 
                 </div> 
                  </div>
                </div>
                </div>
                </a>
                </Link>
            )
         }) }
        </div>
        </Aux>
    )
}

export default DisplayProducts;







