import React from "react";

const ImagePreview = (props) => {
  return (
    <div className="image-area">
      <div className="p-media__thumb">
        <img alt="プレビュー画像" src={props.path} />
      </div>
    </div>
  );
};

export default ImagePreview;