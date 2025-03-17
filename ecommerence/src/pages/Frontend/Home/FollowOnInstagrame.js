import React from 'react';
import { Carousel,Rate } from 'antd';



import dress1 from '../../../components/assest/img/dress1.jpeg';
import dress2 from '../../../components/assest/img/dress2.jpeg';
import dress3 from '../../../components/assest/img/dress3.jpeg';
import dress4 from '../../../components/assest/img/dress4.jpeg';
import dress5 from '../../../components/assest/img/dress5.jpeg';
import dress6 from '../../../components/assest/img/dress6.jpeg';

export default function FollowOnInstagram() {
  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true, // Autoplay enabled
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const carouselSettingRevisew = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };


  const customerReviews = [
    {
      id: 1,
      name: "Ali Malik",
      rating: 4.5,
      description: "Great quality! I love the product and will definitely buy again.",
      imageUrl: dress1
    },
    {
      id: 2,
      name: "Ayesha ",
      rating: 5,
      description: "Absolutely amazing! The fabric is top-notch and very comfortable.",
      imageUrl: dress2
    },
    {
      id: 3,
      name: "Bilal ",
      rating: 4,
      description: "Good product, but delivery took longer than expected.",
      imageUrl: dress3
    },
    {
      id: 4,
      name: "Sara Malik",
      rating: 5,
      description: "Perfect fit! The color and design are exactly as shown in the pictures.",
      imageUrl: dress4
    },
    {
      id: 5,
      name: "Usman ",
      rating: 3.5,
      description: "The material is good, but the size runs a bit small.",
      imageUrl: dress5
    }
  ];
  return (
    <div className="container" style={{backgroundColor:"#f8f9fa"}}>
      <section className="instagram-section">
        <div className="text-center">
          <h1 className="mb-3 fw-bold" style={{ fontFamily: 'Times New Roman' }}>
            Follow Us On Instagram
          </h1>
          <p style={{ fontSize: '12px', color: '#6c757d' }}>
            Join our Instagram family and be the first to know about our latest collections,<br /> exclusive deals, 
            and special giveaways! 💕 Whether you're looking for <br /> fashion inspiration,  trending styles,
            or behind-the-scenes fun, we’ve got it all for you!
          </p>
          <div className="image-container  gap-2 px-4">
            <Carousel {...carouselSettings}>
              <div className=' imageContainer '>
                <img src={dress1} alt="Trendy Fashion 1" className="insta-img"  />
              </div>
              <div className='imageContainer '>
                <img src={dress2} alt="Trendy Fashion 2" className="insta-img" />
              </div>
              <div className='imageContainer'>
                <img src={dress3} alt="Trendy Fashion 3" className="insta-img" />
              </div>
              <div className='imageContainer'>
                <img src={dress4} alt="Trendy Fashion 4" className="insta-img" />
              </div>
              <div className='imageContainer'>
                <img src={dress5} alt="Trendy Fashion 5" className="insta-img" />
              </div >
              <div className='imageContainer'>
                <img src={dress6} alt="Trendy Fashion 6" className="insta-img" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      <div className="customerReview py-4">
      <h1 className="text-center" style={{ fontFamily: 'Times New Roman' }}>
        This Is What Our Customers Say
      </h1>
      <p className="text-center" style={{ fontSize: '12px', color: '#495057' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, facilis veritatis incidunt.
      </p>
      <Carousel autoplay {...carouselSettingRevisew }>
        {customerReviews.map((item, i) => (
          <div
            className="customerReviewCard card p-4 w-md-50 w-100 d-flex flex-column flex-md-row align-items-center gap-3" 
            key={i}
          >
            {/* Image Section */}
            <div className="image bg-primary" style={{ width: '230px', height: '150px' }}>
              <img
                src={item.imageUrl}
                alt="customerReviewCard"
                className="w-100 h-100"
                style={{ objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>

            {/* Review Text Section */}
            <div className="body-card px-3 text-center text-md-start">
              <p className="mb-2" style={{ fontSize: '12px' }}>{item.description}</p>
              <Rate style={{ fontSize: '14px' }} allowHalf value={item.rating} disabled />
              <hr className="w-50 mx-auto" />
              <h3 className="mb-0">{item.name}</h3>
              <p className="mb-0 text-muted" style={{ fontSize: '12px' }}>Traveler</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>




    </div>
  );
}
