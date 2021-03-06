import React from "react";
import topImage from "../images/topImage.jpg";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

const Top = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <img src={topImage} alt="maintitle" className="image-box" />
      </div>
      <div className="top-title">
        <p>シンプルなシフト管理アプリ</p>
        <h1>
          Collect
          <br />
          Shifts
        </h1>
      </div>
      <div className="top-container">
        <p onClick={() => dispatch(push("/signup"))}>アカウント登録</p>
        <p onClick={() => dispatch(push("/signin"))}>ログイン</p>
      </div>
    </div>
  );
};

export default Top;
