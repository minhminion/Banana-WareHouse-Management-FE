import { NProgress } from "@tanem/react-nprogress";
import PropTypes from "prop-types";
import React from "react";
import Bar from "./Bar";
import Container from "./Container";

const Progress = ({ isAnimating, locationKey }) => {
  return (
    <NProgress isAnimating={isAnimating} key={locationKey}>
      {({ isFinished, progress, animationDuration }) => (
        <Container
          isFinished={isFinished}
          animationDuration={animationDuration}
        >
          <Bar progress={progress} animationDuration={animationDuration} />
          {/* <Spinner /> */}
        </Container>
      )}
    </NProgress>
  );
};

Progress.propTypes = {
  isAnimating: PropTypes.bool.isRequired,
};

export default Progress;
