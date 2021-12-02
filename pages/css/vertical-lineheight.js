import React from "react";
import getConfig from "next/config";

export default function VerticalLineHeight() {
  const { publicRuntimeConfig } = getConfig();
  return (
    <>
      <style jsx>{`
        img:before {
          content: "";
          position: absolute;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #f0f3f9;
        }

        img:after {
          content: "图片";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          line-height: 30px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          font-size: 14px;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
      <h1 style={{ textAlign: "center" }}>
        探究vertical-align & line-height关系
      </h1>
      <main>
        <p>现象1: 容器内的图片的高度不等于容器高度</p>
        <div
          style={{
            backgroundColor: "#fdf6d3",
          }}
        >
          <img src={`${publicRuntimeConfig.base64Pic}`} />
        </div>

        <p>如图所示,容器高度并不等于图片高度,图片距离容器底部有一定间隙</p>
        <p>原因在于幽灵空白节点,可以想象成在图片后面有个字符x, 如下图</p>
        <div
          style={{
            backgroundColor: "#fdf6d3",
          }}
        >
          <img src={`${publicRuntimeConfig.base64Pic}`} />
          xX
        </div>
        <p>而字符默认和line box的基线对其,所以将下方撑起了一点间隙</p>
        <p>
          解决方式有两种:
          一种是让容器的font-size为0,这样空白节点就不会有高度撑起间隙
          另一种就是让图片下方直接对其容器下方:也就是设置图片vertical-align:bottom
        </p>
        <div
          style={{
            backgroundColor: "#fdf6d3",
          }}
        >
          <img
            style={{ verticalAlign: "bottom" }}
            src={`${publicRuntimeConfig.base64Pic}`}
          />
        </div>
      </main>
    </>
  );
}
