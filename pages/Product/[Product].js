import {useRouter} from 'next/router';
import SingleProduct from '../../Components/ModalDisplay/ModalDisplay';


export default function codePage(){
    const router = useRouter();
    const {Product} = router.query;
    console.log(Product);
    return <div> <SingleProduct Productid={Product} /> </div>
}