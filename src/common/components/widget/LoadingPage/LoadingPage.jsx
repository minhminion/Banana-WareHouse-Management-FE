import React from "react";
import "./style.css";
import { CSSTransition } from "react-transition-group";
import { useTheme } from "@material-ui/core";
const LoadingPage = ({ isAnimating }) => {
  const theme = useTheme();
  return (
    <CSSTransition
      in={isAnimating}
      timeout={500}
      classNames="my-node"
      unmountOnExit
    >
      <div className={"loading-page"}>
        <svg>
          <g>
            <path d="M 50,100 A 1,1 0 0 1 50,0" />
          </g>
          <g>
            <path d="M 50,75 A 1,1 0 0 0 50,-25" />
          </g>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{
                  stopColor: theme.palette.primary.main,
                  stopOpacity: 1,
                }}
              />
              <stop
                offset="100%"
                style={{
                  stopColor: theme.palette.secondary.light,
                  stopOpacity: 1,
                }}
              />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </CSSTransition>
  );
};

export default LoadingPage;
