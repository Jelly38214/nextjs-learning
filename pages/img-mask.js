import React from "react";

// 记录平时关于图片的需求
export default function ImgDemand() {
  return (
    <ul>
      <style jsx>{`
        @keyframes move {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 100% 0;
          }
        }
        .mask-effect-container {
          position: relative;
          display: flex;
          flex-direction: column;
          height: 300px;
          justify-content: center;
          align-items: center;
        }
        .mask-effect-container .bg {
          background: url(https://sp-webfront.skypixel.com/skypixel/v2/public/website/assets/1535027674204-f6eca6369ec03e70262b58b0e25cda7b.jpg);
          background-size: cover;
          width: 100%;
          height: 100%;
          position: absolute;
          filter: blur(10px);
          z-index: -1;
        }
        .mask-effect-container .slogan {
          color: white;
          margin-top: 24px;
          font-size: 36px;
          font-weight: 400;
        }

        .mask-effect-container .mask {
          width: 200px;
          height: 100px;
          animation: move 10s infinite;
          background-image: url(https://sp-webfront.skypixel.com/skypixel/v2/public/website/assets/1535027674204-f6eca6369ec03e70262b58b0e25cda7b.jpg);
          background-size: cover;
          mask: url(http://www2.djicdn.com/assets/images/v3/logo-black2-145dcb13c56f36a65d084180a42136fa.svg);
          mask-size: cover;
        }
      `}</style>
      <li>
        <p>
          镂空效果,使用CSS mask属性,
          所谓遮罩，就是原始图片只显示遮罩图片非透明的部分{" "}
          <a href="https://www.zhangxinxu.com/wordpress/2017/11/css-css3-mask-masks/?shrink=1">
            参考
          </a>
          <a href="https://www.cnblogs.com/coco1s/p/13253423.html">实战例子</a>
        </p>
        <div className="mask-effect-container">
          <div className="bg"></div>
          <div className="mask"></div>
          <h1 className="slogan">The Future Of Possible</h1>
        </div>
      </li>
    </ul>
  );
}
