import { Link } from 'react-router-dom'
import Image from 'react-bootstrap/Image'


const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <Image className="cali-top-image" src="https://res.cloudinary.com/dtu5wu4i9/image/upload/v1681827782/Project%204/cali-top-image_hr9njl.webp" alt="Cali-Team" />
        <div className="container-header">
          <div className="header">Cali Kulture is a London based Calisthenics community and academy, offering adult and children classes, workshops and competitions.
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home