import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <h1 className='display-3'>Cali-Kulture</h1>
        <p className='lead'>xxxxx</p>
        <Button to="/bread" as={Link} className='btn-brown'>Discover Cali-Kulture</Button>
      </div>
    </main>
  )
}

export default Home