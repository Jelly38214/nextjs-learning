/**
 * 这个页面是为了测试,page的getStaticProps在服务端和客户端渲染时的行为
 */
import React from "react";
import Link from "next/link";

export default function GetStaticPropsPage(props) {
  console.log("GetServerSidePropsPage Props:", props);
  return (
    <Link href="/">
      <a>Back to Home</a>
    </Link>
  );
}

export async function getStaticProps() {
  console.log("GetStaticPropsPage start getStaticProps");
  return {
    props: {
      randomTimeInGetStaticPropsPage: Date.now(),
    },
  };
}
