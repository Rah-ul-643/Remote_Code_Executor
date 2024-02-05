import React  from "react";
import styled from "styled-components";
import video from '../video/load1.mp4';

const Container = styled.div`
  display: flex;
   display: ${(props) => props.display};
`;
const VideoContainer = styled.div`
  display: flex;
`;

const Loading = ({ display, onEnded }) => {
  return (
    <Container display={display}>
      <VideoContainer>
        <video
          width="100%"
          height="100%"
          autoPlay
          muted
          onEnded={onEnded}
        >
          <source src={video} type="video/mp4" />
        </video>
      </VideoContainer>
    </Container>
  );
};

export default Loading;
