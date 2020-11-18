import { Typography } from "@material-ui/core";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="center">
      <div className="error">
        <div className="number">4</div>
        <div className="illustration">
          <div className="circle"></div>
          <div className="clip">
            <div className="paper">
              <div className="face">
                <div className="eyes">
                  <div className="eye eye-left"></div>
                  <div className="eye eye-right"></div>
                </div>
                <div className="rosyCheeks rosyCheeks-left"></div>
                <div className="rosyCheeks rosyCheeks-right"></div>
                <div className="mouth"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="number">4</div>
      </div>
      <Typography variant="caption" style={{ marginTop: 16, fontSize: 24 }}>
        Oops. Trang không tồn tại
      </Typography>
    </div>
  );
};

export default NotFoundPage;
