import React from "react";

/**
 * 响应式图片的几种做法
 */
export default function ResponsiveImg() {
  return (
    <div style={{ padding: "0 20px" }}>
      <h1>
        响应式图片{" "}
        <a href="http://www.ruanyifeng.com/blog/2019/06/responsive-images.html">
          参考
        </a>
      </h1>
      <ul>
        <li>
          <a href="https://www.zhangxinxu.com/wordpress/2014/10/responsive-images-srcset-size-w-descriptor/?shrink=1">
            参考 - 张鑫旭
          </a>
        </li>
        <li>
          <a href="http://www.ruanyifeng.com/blog/2019/06/responsive-images.html">
            参考 - 阮一峰
          </a>
        </li>
      </ul>
      <p>
        图片来源使用<a href="https://placeholder.com/">placeholder.com</a>
      </p>
      <p>
        根据设备的像素密度,尺寸,平台等来获取合适的图片,
        获得更好的用户体验,也可以节省流量,提高加载速度
      </p>
      <p>
        实现响应式图片的方案有很多, Javascript, CSS media都可以实现,
        但HTML的方式最简单,语义性最好,浏览器原生支持
      </p>
      <p>
        主要是使用img标签的<strong>srcset</strong>和<strong>sizes</strong>属性
      </p>
      <ul>
        <li>像素密度的选择: srcset属性</li>
        <li>图像大小的选择: srcset+sizes</li>
      </ul>
      <p>
        srcset属性用来指定多张图像, 适应各种不同的像素密度的屏幕.
        它的值是一个逗号分隔的字符串, 每个部分都是一张图像的URL,
        后面接着一个空格, 然后是像素密度描述符
      </p>
      <img
        width="200"
        height="100"
        srcset="
        https://via.placeholder.com/200x100?text=2x 2x,
        https://via.placeholder.com/200x100?text=1x 1x,
      "
        src="https://via.placeholder.com/300x150?text=NoSupportSrcSet"
      />
      <p>x是像素密度倍数, 1x表示单倍像素密度,可以省略</p>
      <p>
        w表示宽度规格,其与sizes设置和屏幕密度密切相关.
        举个例子，假设屏幕密度是2的iPhone6手机，sizes属性计算值是128px，则此时img实际的宽度规格应该是
        <strong>
          <em>128*2也就是256w</em>
        </strong>
      </p>
      <img
        srcset="
        https://via.placeholder.com/200x100?text=128w 128w, 
        https://via.placeholder.com/200x100?text=256w 256w,
        https://via.placeholder.com/200x100?text=512w 512w,
      "
        sizes="128px"
      />
      <p>
        sizes里给出的不同媒体查询选择图片大小的建议只对w描述符起作用,
        因此没有srcset或者在srcset用的是x, 这个sizes是没有意义的
      </p>

      <h2>适配不同像素密度,不同大小的屏幕: picture+source标签</h2>
      <picture>
        <source
          media="(max-width: 500px)"
          srcset="
          https://via.placeholder.com/200x100?text=max-500px,
          https://via.placeholder.com/400x200?text=max-500px-2x 2x,
          https://via.placeholder.com/600x300?text=max-500px-3x 3x,
          "
        />
        <source
          media="(max-width: 1000px)"
          srcset="
          https://via.placeholder.com/200x100?text=max-1000px,
          https://via.placeholder.com/400x200?text=max-1000px-2x 2x,
          https://via.placeholder.com/600x300?text=max-1000px-3x 3x,
          "
        />
        <img src="https://via.placeholder.com/200x100?text=min-1000px" />
      </picture>
    </div>
  );
}
