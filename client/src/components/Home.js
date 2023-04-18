import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'


const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <Image className="cali-top-image" src="https://res.cloudinary.com/dtu5wu4i9/image/upload/v1681843338/Project%204/a7b731_ec92dfa1ba624c5bb0f6c562f027c0fb_mv2_zixaew.webp" alt="Cali-Team" />
        <div className="container-header">
          <div className="header">Cali Kulture is a London based Calisthenics community and academy, offering adult and children classes, workshops and competitions.
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home