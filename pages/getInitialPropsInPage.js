/**
 * 这个页面是为了测试,page-level的getInitialProps在服务端和客户端渲染时的行为
 */
import React from "react";
import Link from "next/link";

export default function GetInitialPropsPage(props) {
  console.log("GetInitialPropsPage Props:", props);
  return (
    <Link href="/">
      <a>Back to Home</a>
    </Link>
  );
}

// 如果是通过输入url/或者刷新或者/location.href等非页面内导航到这个页面,就会报错
// 因为此时getInitialProps在服务端执行, 没有window对象,报错ReferenceError: window is not defined
GetInitialPropsPage.getInitialProps = async () => {
  console.log("GetInitialPropsPage start getInitialProps");
  return {
    props: {
      randomTime: Date.now(),
    },
  };
};
