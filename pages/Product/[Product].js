import {useRouter} from 'next/router';

export default function codePage(){
    const router = useRouter();
    const {Product} = router.query;
    return <div>I am product {Product}</div>
}