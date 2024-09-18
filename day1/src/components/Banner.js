import React from 'react'
import { Carousel } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import img1 from './Assets/Bannerimages/img1.png'
import img2 from './Assets/Bannerimages/img2.png'
import img3 from './Assets/Bannerimages/img3.png'

const Banner = () => {
  return (
    <Carousel controls={true} indicators={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="Buy Books - Upto 50% Offer"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Buy Books</h3>
          <p>Upto 50% Offer</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Explore Different Genres"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Different Genres</h3>
          <p>Explore Now</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third slide"
          style={{ height: '500px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Latest Arrivals</h3>
          <p>Check out the new collection!</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;
