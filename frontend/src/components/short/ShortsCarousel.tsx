import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import carouselButton from 'assets/img/carouselButton.svg';
import rightButton from 'assets/img/rightButton.svg';
import { Shorts } from 'utils/api/recommApi';
import VideoLevel from 'assets/img/videoLevel.svg';
import Badge from 'components/common/Badge';

interface BadgeProps {
  score?: number;
}

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  width: 80vw;
`;

const ContentBox = styled.div<{ transition: string; transform: number }>`
  display: flex;
  height: 40vh;
  transition: ${props => props.transition};

  @media (max-width: 425px) {
    transform: translateX(-${props => props.transform * 33.3}%);
  }

  @media (min-width: 425px) {
    transform: translateX(-${props => props.transform * 25}%);
  }

  @media (min-width: 768px) {
    transform: translateX(-${props => props.transform * 20}%);
  }
  .wrapper {
    position: relative;
    flex-shrink: 0;
    flex-grow: 1;
    border-radius: 16px;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: 1%;
    margin-right: 1%;
    cursor: pointer;
    &:hover {
      scale: 1.04;
      transition: 0.4s;
    }
    @media (max-width: 425px) {
      width: 31.3%;
    }

    @media (min-width: 425px) {
      width: 23%;
    }
    @media (min-width: 768px) {
      width: 18%;
    }

    .main-img {
      border-radius: 16px;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }

    .badge-wrapper {
      position: absolute;
      top: 10%;
      left: 4%;
    }
  }
`;

const RootWrapper = styled.div`
  position: relative;
  width: 100%;
  .right-btn {
    position: absolute;
    top: -12%;
    height: 5vh;
    cursor: pointer;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
    @media (max-width: 600px) {
      right: 48px;
      width: 24px;
    }
    @media (min-width: 600px) {
      right: 56px;
    }
  }
  .left-btn {
    position: absolute;
    top: -12%;
    height: 5vh;
    cursor: pointer;
    &:hover {
      scale: 1.1;
      transition: 0.4s;
    }
    @media (max-width: 600px) {
      right: 8px;
      width: 24px;
    }
    @media (min-width: 600px) {
      right: 8px;
    }
  }
`;

const ShortsCarousel = ({
  data,
  setOpenModal,
  setShortsId,
}: {
  data: Shorts[];
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShortsId: React.Dispatch<React.SetStateAction<Shorts | null>>;
}) => {
  const prevLength = data.length;
  data = [
    ...data.slice(prevLength - 5, prevLength),
    ...data,
    ...data.slice(0, 5),
  ];
  const transition = 'all 0.3s ease-out;';
  const [currentIndex, setCurrentIndex] = useState(5);
  const [length, setLength] = useState(data.length);
  const [transStyle, setTransStyle] = useState(transition);

  useEffect(() => {
    setLength(data.length);
  }, [data]);

  const next = () => {
    if (currentIndex < length - 5) {
      setCurrentIndex(prevState => prevState + 1);
    }
    if (currentIndex + 1 === length - 5) {
      setTimeout(() => {
        setCurrentIndex(5);
        setTransStyle('');
      }, 250);
    }
    setTransStyle(transition);
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
    if (currentIndex - 1 === 0) {
      setTimeout(() => {
        setCurrentIndex(length - 10);
        // 맨 뒤 5개, 인덱스 1개, 5개 열에서 4개
        setTransStyle('');
      }, 250);
    }
    setTransStyle(transition);
  };

  return (
    <RootWrapper>
      <img onClick={prev} className="right-btn" src={carouselButton} alt="" />
      <img onClick={next} className="left-btn" src={rightButton} alt="" />
      <div></div>
      <Wrapper>
        <ContentBox transition={transStyle} transform={currentIndex}>
          {data.map((Thumnail, idx) => {
            return (
              <div className="wrapper" key={idx}>
                <img
                  className="main-img"
                  src={
                    'https://i.ytimg.com/vi/' + Thumnail.watchId + '/hq1.jpg'
                  }
                  alt=""
                  onClick={() => {
                    setOpenModal(true);
                    setShortsId(Thumnail);
                  }}
                ></img>
                {/* <ViedoLevelImg src={VideoLevel} score={Thumnail.score} /> */}
                <div className="badge-wrapper">
                  {Thumnail.score != undefined && (
                    <Badge score={Thumnail.score} />
                  )}
                </div>
              </div>
            );
          })}
        </ContentBox>
      </Wrapper>
    </RootWrapper>
  );
};

export default ShortsCarousel;
