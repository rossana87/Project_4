/* eslint-disable semi */
/* eslint-disable quotes */
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Home = () => {
  return (
    <main className="home">
      <div className="hero">
        <Image
          className="cali-top-image"
          src="https://res.cloudinary.com/dtu5wu4i9/image/upload/v1681843338/Project%204/a7b731_ec92dfa1ba624c5bb0f6c562f027c0fb_mv2_zixaew.webp"
          alt="Cali-Team"
        />
        <CardHeader>
          <h1 className="title">
            <span>Welcome to</span>
            <span>Cali-Kulture</span>
          </h1>
        </CardHeader>
        <div className="container-header">
          <CardHeader>
            Cali Kulture is a London based Calisthenics community and academy,
            offering adult and children classes, workshops and competitions.
          </CardHeader>
        </div>
      </div>
    </main>
  );
};

export default Home;
