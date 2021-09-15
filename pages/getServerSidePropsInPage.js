/**
 * 这个页面是为了测试,page的getServerSideProps在服务端和客户端渲染时的行为
 */
import React from "react";
import Link from "next/link";

export default function GetServerSidePropsPage(props) {
  console.log("GetServerSidePropsPage Render:", props);
  return (
    <Link href="/">
      <a>Back to Home</a>
    </Link>
  );
}

// getServerSideProps只会在服务端执行,不管以何种方式进入页面
// 在通过next/link, next/route导航到页面, next.js client发向next.js发请求xxx/GetServerSidePropsPage.json
// 然后得到结果再渲染这个页面
export async function getServerSideProps(context) {
  // console.log("GetServerSidePropsPage start getServerSideProps", window); // 会报错
  console.log("GetServerSidePropsPage start getServerSideProps");
  return {
    props: {
      randomTimeInGetServerSidePropsPage: Date.now(),
    },
  };
}
