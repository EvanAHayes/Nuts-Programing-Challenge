import { Token } from '../../TokenConfig/Token';
import useSWR from 'swr';
import { CheckThumbnailImage, CheckFullImage, CheckPrice, CheckProductInfo } from '../CheckApiData/CheckApiData'


const getProductDetails = (Productid) =>
    fetch(`https://api.commercetools.co/nuts-custom-demo-1/products/${Productid}`, Token)
        .then((response) => response.json());

export default function product({ Productid }) {
    //swr take two parameters key and a fetcher functions
    const { data, error } = useSWR(Productid, getProductDetails);

    if (error) return <div>No Product</div>;
    if (!data) return <div>Loading...</div>

    console.log(data)
    return (
        <div key={data.id}>

            <div className="" >
                <img className="rounded float-right"
                    src={"https://1b0bbb9e89b4713adcc7-aea4cee2cb18344b328e3a03eff3ec4f.ssl.cf1.rackcdn.com/5e85d71501308335-L2AE6hCf-thumb.jpg"}
                    alt="Organic badge" />
                <div className="row no-gutters">
                    <div className="col-xs-12 col-md-6">
                        <img className="" src={CheckThumbnailImage(data.masterData.current.masterVariant.images[0])}
                            alt={data.masterData.current.name.en}
                            style={{ width: "250px", height: "200px" }} /></div>
                    <div className="col-xs-12 col-md-6">
                        <img className="" src={CheckFullImage(data.masterData.current.masterVariant.images[1])}
                            alt={data.masterData.current.name.en}
                            style={{ width: "400px", height: "200px" }} />
                    </div>
                </div>

                <div className="card-body">
                    <h3 className="card-title">{CheckProductInfo(data.masterData.current.name)}</h3>
                    <p className="card-text">{CheckProductInfo(data.masterData.current.description)}</p>
                    <br />
                    <h5>${CheckPrice(data.masterData.current.masterVariant.prices[0])}</h5>
                    <a href="#" className="btn btn-primary">Add To Cart</a>
                </div>
            </div>
        </div>
    )
}