import React from "react";
import { Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";
import { loadStart, loadEnd } from "../../redux/actions/session";

const AnimatedSwitch = ({ location, children }) => {
  const dispatch = useDispatch();
  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        classNames="slide-fade-in-up"
        timeout={500}
        onEnter={() => {
          dispatch(loadStart());
        }}
        onEntered={() => {
          dispatch(loadEnd());
        }}
      >
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(AnimatedSwitch);
