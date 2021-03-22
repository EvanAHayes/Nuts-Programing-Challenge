import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Token } from '../TokenConfig/Token';
import Modal from 'react-modal';
import Link from 'next/link';
import ModalDisplay from '../Components/ModalDisplay/ModalDisplay'
import { CheckThumbnailImage, CheckProductInfo } from './CheckApiData/CheckApiData';


//Set model in application
Modal.setAppElement("#__next");

const DisplayProducts = ({ data }) => {
  const [Productdata, setData] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const startLoading = () => setLoading(true)
  const stopLoading = () => setLoading(false)

  useEffect(() => {
    if (data) {
      setData(data.results)
    }
  }, [data])


  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading)
    Router.events.on("routeChangeComplete", stopLoading)
    return () => {
      Router.events.off("routeChangeStart", startLoading)
      Router.events.off("routeChangeComplete", stopLoading)
    }
  }, [])

  // Router event handler
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
        if (Productdata.length < data.total && !loading) {

          // Trigger fetch get more dropducts 
          const query = Productdata.length + 1;

          axios.get(`https://api.commercetools.co/nuts-custom-demo-1/products?offset=${query}&limit=10`, Token)
            .then((response) => {
              setData(Productdata.concat(response.data.results));

              console.log(Productdata)
            });
        }
      }
    }
  }

  return (
    <div className="product-list">

      { Productdata.map((product) => {
        return (
          <div key={product.id} col-sm-4="true" className="product" >
            <Link href={`/?Product=${product.id}`} as={`/Product/${product.id}`}><a>
              <div className="p-3 m-4" style={{ width: "300px", backgroundcolor: "#87cefa", outline: "5px solid #87cefa" }}>
                <div className="row">
                  <div className="col-sm-12"> {CheckProductInfo(product.masterData.current.name)} </div>
                </div>
                <img id="image" style={{ width: "150px", height: "150px" }}
                  src={CheckThumbnailImage(product.masterData.current.masterVariant.images[0])}
                  alt={CheckProductInfo(product.masterData.current.name)} />
              </div>
            </a>
            </Link>
          </div>
        )
      })}

      <Modal isOpen={!!router.query.Product}
        onRequestClose={() => window.history.back()}>
        <div> <ModalDisplay Productid={router.query.Product} /> </div>

      </Modal>
      {loading && <h1>Loading ...</h1>}
    </div>

  )
}
export default DisplayProducts;
