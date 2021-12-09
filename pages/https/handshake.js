import React from "react";

export default function HandShake() {
  return (
    <>
      <h2>
        TCP 三次握手 + TLS 4次握手 = HTTPS 7次握手{" "}
        <a href="https://www.aaronlam.xyz/2019/03/01/why-tcp-connection-need-three-way-handshake/">
          参考
        </a>
      </h2>
      <img src="https://cdn.jsdelivr.net/gh/aaronlam/imghosting@master/20201102140120.png" />

      <p>
        TCP协议中的连接指的是: <strong>为了保证传输可靠性和流的控制机制</strong>
        , TCP协议需要为每个<strong>数据段初始化和维护其状态信息</strong>,
        而这些状态信息由
        <strong>
          sockets, 序列号(sequence number: SEQ)和窗口大小(window size)组成
        </strong>
        , 然后这些数据段发送与接收就构成了TCP协议连接
      </p>
      <p>
        所以建立TCP连接本质就是让通信双方对于这三个要素(sockets, window size,
        sequence number)达成共识
      </p>
      <img src="https://cdn.jsdelivr.net/gh/aaronlam/imghosting@master/20201031224224.png" />

      <ul>
        <li>sockets由IP+端口组成</li>
        <li>window size用来做流控制</li>
        <li>
          SEQ用来确定连接发起方发送的数据段序列号,
          接收方可以通过SEQ与发送方确认包的成功接受
        </li>
      </ul>

      <p>
        为什么一定至少要握手三次+RST控制标识:
        为了防止重复建立连接请求而引起连接错乱,
        最终导致TCP协议通信双方建立错误的连接.
        将连接是否建立的决定权交给了发送方,因为只有发送方有足够的上下文信息判断当前要建立的连接是否错误或过期
      </p>

      <h3>HTTP相关技术</h3>
      <p>
        持久连接:TCP连接后不断开,下次的请求可以直接基于这个TCP来发送.http1.0不支持,但http1.1默认支持并开启;
        connection: keep-alive;
      </p>
      <p>
        http1.1的pipelining:
        一个支持TCP持久连接的客户端可以在一个TCP连接中同时发送多个请求,不需要等待前一个请求响应后才能发下一个请求.但是
        <strong>服务器必须按照请求收到的顺序来发送响应</strong>
      </p>
      <p>
        也就意味着,如果服务器接收到的第一个请求耗时过长,那么是会影响其他请求的响应时间的,这就是所谓的队头阻塞(head-of-line
        blocking).所以浏览器默认不开启pipelining
      </p>
      <p>
        HTTP2的multiplexing-多路传输特性:
        在一个TCP连接上同时完成多个HTTP请求,修复了pipelining的队头阻塞问题
      </p>

      <a href="https://zhuanlan.zhihu.com/p/61423830">HTTP相关面试题目</a>
      <a href="http://c.biancheng.net/view/6441.html">TCP报文格式解析</a>
    </>
  );
}
