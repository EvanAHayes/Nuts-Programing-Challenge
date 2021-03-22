import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayProducts from '../Components/DisplayProducts';
import { Token } from '../TokenConfig/Token';

export default function index({ data }) {
  return (
    <div className="container">
      <div className="row">
        <DisplayProducts data={data} />
      </div>
    </div>
  )
}

export async function getServerSideProps({ query }) {
 
  const page = query.page || 1

  // Fetch data from external API
  const res = await fetch(`https://api.commercetools.co/nuts-custom-demo-1/products?offset=${page}&limit=10`, Token)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}


