import styled, { css } from 'styled-components';

const seagullKeyFrame = {
  first: css`
    @keyframes seagullKeyFrame1 {
      0% {
        transform: translate(0vw, -0vh) scale(1);
        opacity: 0;
      }

      25% {
        transform: translate(16.9vw, -12.7vh) scale(0.5);
        opacity: 1;
      }

      50% {
        transform: translate(33.8vw, -25.4vh) scale(0.25);
        opacity: 1;
      }

      100% {
        transform: translate(67.6vw, -50.8vh) scale(0.1);
        opacity: 0;
      }
    }
  `,
  second: css`
    @keyframes seagullKeyFrame2 {
      0% {
        transform: translate(0vw, 0vh) scale(1);
        opacity: 0;
      }

      25% {
        transform: translate(20vw, -10vh) scale(0.5);
        opacity: 1;
      }

      50% {
        transform: translate(40vw, -20vh) scale(0.25);
        opacity: 1;
      }

      100% {
        transform: translate(79.8vw, -40vh) scale(0.1);
        opacity: 0;
      }
    }
  `,
  third: css`
    @keyframes seagullKeyFrame3 {
      0% {
        transform: translate(0vw, -0vh) scale(1);
        opacity: 0;
      }

      25% {
        transform: translate(16.125vw, -8.65vh) scale(0.5);
        opacity: 1;
      }

      50% {
        transform: translate(32.25vw, -17.3vh) scale(0.25);
        opacity: 1;
      }

      100% {
        transform: translate(64.5vw, -34.6vh) scale(0.1);
        opacity: 0;
      }
    }
  `,
  fourth: css`
    @keyframes seagullKeyFrame4 {
      0% {
        transform: translate(0vw, -0vh) scale(1);
        opacity: 0;
      }

      25% {
        transform: translate(13.75vw, -11vh) scale(0.5);
        opacity: 1;
      }

      50% {
        transform: translate(27.5vw, -22vh) scale(0.25);
        opacity: 1;
      }

      100% {
        transform: translate(54.9vw, -43.9vh) scale(0.1);
        opacity: 0;
      }
    }
  `,
  fifth: css`
    @keyframes seagullKeyFrame5 {
      0% {
        transform: translate(0vw, -0vh) scale(1);
        opacity: 0;
      }

      25% {
        transform: translate(9.75vw, -11.75vh) scale(0.5);
        opacity: 1;
      }

      50% {
        transform: translate(19.5vw, -23.55vh) scale(0.25);
        opacity: 1;
      }

      100% {
        transform: translate(39.1vw, -47.1vh) scale(0.1);
        opacity: 0;
      }
    }
  `,
};

export const CloudAnimationScene = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: 3;
`;

interface AnimateImgProps {
  isAnimating: boolean;
}

export const CloudTopImg = styled.img<AnimateImgProps>`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  object-position: center;
  object-fit: cover;
  transition-property: transform, opacity;
  transition-duration: 2s;
  transition-timing-function: ease-in-out;
  ${(props) =>
    props?.isAnimating ?? false
      ? 'transform: translateY(-100%);\n  opacity: 0;'
      : {}}
`;

export const CloudBottomImg = styled.img<AnimateImgProps>`
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  object-position: center;
  object-fit: cover;
  transition-property: transform, opacity;
  transition-duration: 2s;
  transition-timing-function: ease-in-out;
  ${(props) =>
    props?.isAnimating ?? false
      ? 'transform: translateY(100%);\n  opacity: 0;'
      : {}}
`;

export const CloudEndImg = styled.img<AnimateImgProps>`
  user-drag: none;
  user-select: none;
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  object-position: center;
  object-fit: cover;
  opacity: 0;
  transition-property: opacity;
  transition-duration: 2s;
  transition-timing-function: ease-in-out;
  ${(props) => (props?.isAnimating ?? false ? 'opacity: 1;' : {})}
`;

const animateSettings = (animationName: string, duration = 3) => css`
  animation-duration: ${duration}s;
  animation-iteration-count: inherit;
  animation-direction: normal;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  animation-name: ${animationName};
`;

export const Seagull1 = styled.img<AnimateImgProps>`
  position: absolute;
  left: 12.7%;
  top: 82.4vh;
  width: 150px;
  height: 80px;
  object-position: center;
  object-fit: contain;
  opacity: 0;
  transform: translateX(-50%);
  ${seagullKeyFrame.first};
  ${(props) =>
    props?.isAnimating ?? false ? animateSettings('seagullKeyFrame1') : {}}
`;

export const Seagull2 = styled.img<AnimateImgProps>`
  position: absolute;
  left: 0;
  top: 67.2vh;
  width: 150px;
  height: 80px;
  object-position: center;
  object-fit: contain;
  opacity: 0;
  transform: translateX(-50%);
  ${seagullKeyFrame.second};
  ${(props) =>
    props?.isAnimating ?? false ? animateSettings('seagullKeyFrame2') : {}}
`;

export const Seagull3 = styled.img<AnimateImgProps>`
  position: absolute;
  left: 17.39%;
  top: 57.5vh;
  width: 150px;
  height: 80px;
  object-position: center;
  object-fit: contain;
  opacity: 0;
  transform: translateX(-50%);
  ${seagullKeyFrame.third};
  ${(props) =>
    props?.isAnimating ?? false ? animateSettings('seagullKeyFrame3') : {}}
`;

export const Seagull4 = styled.img<AnimateImgProps>`
  position: absolute;
  left: 28.2%;
  top: 73.1vh;
  width: 150px;
  height: 80px;
  object-position: center;
  object-fit: contain;
  opacity: 0;
  transform: translateX(-50%);
  ${seagullKeyFrame.fourth};
  ${(props) =>
    props?.isAnimating ?? false ? animateSettings('seagullKeyFrame4') : {}}
`;

export const Seagull5 = styled.img<AnimateImgProps>`
  position: absolute;
  left: 47%;
  top: 73.1vh;
  width: 150px;
  height: 80px;
  object-position: center;
  object-fit: contain;
  opacity: 0;
  transform: translateX(-50%);
  ${seagullKeyFrame.fifth};
  ${(props) =>
    props?.isAnimating ?? false ? animateSettings('seagullKeyFrame5') : {}}
`;

export const EnterView = styled.div<AnimateImgProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition-delay: 2s;
  transition-property: opacity;
  transition-duration: 4s;
  transition-timing-function: ease-in-out;
  opacity: 0;
  ${(props) => (props?.isAnimating ?? false ? 'opacity: 1' : {})}
`;

export const MindtrixLogo = styled.div`
  width: 240px;
  height: 60px;
`;
