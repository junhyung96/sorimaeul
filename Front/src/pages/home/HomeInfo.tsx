import { useState, useEffect, useReducer } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import carousel1 from "../../assets/carousel1.png";
import carousel2 from "../../assets/carousel2.png";
import carousel3 from "../../assets/carousel3.png";
import carousel4 from "../../assets/carousel4.png";

const HomeInfo: React.FC = () => {
  // 이유는 모르겠으나 이렇게 해줘야 정상작동함 (계산떄려서 값 바꾸기)
  const [activeSlideIndex, setActiveSlideIndex] = useState(5);

  useEffect(() => {
    setActiveSlideIndex(0);
  }, []);

  return (
    <div className="-mt-16">
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        autoplay={true}
        autoplayDelay={5000}
        forwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`>`}</span>,
        }}
        backwardBtnProps={{
          //here you can also pass className, or any other button element attributes
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span>{`<`}</span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
          },
        ]}
        speed={400}
        easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        <div style={{ width: 1000, height: 420, background: '#ff80ed' }}>
        <img src={carousel1} alt="slide 0" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div style={{ width: 1000, height: 420, background: '#065535' }}>
        <img src={carousel2} alt="slide 0" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div style={{ width: 1000, height: 420, background: '#000000' }}>
        <img src={carousel3} alt="slide 0" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
        <div style={{ width: 1000, height: 420, background: '#133337' }}>
        <img src={carousel4} alt="slide 0" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
        </div>
      </ReactSimplyCarousel>
    </div>
  );
};

export default HomeInfo;
