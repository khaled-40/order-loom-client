import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// ✅ Required Swiper CSS imports
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import ReviewCard from './ReviewCard';

const Reviews = ({ reviewPromise }) => {
    const reviews = use(reviewPromise);

    return (
        <Swiper
            loop={true}
            effect={'coverflow'}
            grabCursor={true}
            spaceBetween={30}
            centeredSlides={true}
            slidesPerView={3}
            coverflowEffect={{
                rotate: 30,
                stretch: 0,       // ✅ must be a number, not '50%'
                depth: 200,
                modifier: 1,
                scale: 0.75,
                slideShadows: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper mt-12"
        >
            {reviews.map(review => (   // ✅ fixed from [reviews.map](http://...)
                <SwiperSlide key={review.id}>  {/* ✅ fixed from [review.id](http://...) */}
                    <ReviewCard review={review} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Reviews;