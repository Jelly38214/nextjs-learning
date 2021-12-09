import React from "react";

export default function HttpsBasic() {
  return (
    <>
      <h2>Https加密过程及其机制</h2>
      <ul>
        <li>
          <a href="http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html">
            阮一峰-SSL/TSL协议运行机制
          </a>
        </li>
      </ul>
      <p>
        互联网的通信安全,
        建立在SSL/TLS协议上;为什么既有SSL,又有TLS?其实TLS是SSL的升级版本,
        但目前有些网站还在使用SSL.
      </p>
      <img src="https://cdn.jsdelivr.net/gh/aaronlam/imghosting@master/20201104152419.png" />
      <p>
        应用最广泛的是TLS1.0, 接下来是SSL3.0 但是主流浏览器都实现了TLS1.2的支持
        <br />
        TLS1.0通常被<strong>标示为</strong>SSL3.1, TLS1.1为SSL3.2, TLS1.2
      </p>
      <p>
        不使用SSL/TLS的HTTP通信, 就是不加密的通信, 所有的信息明文传播,
        因此带来啦三大风险
      </p>
      <ul>
        <li>窃听风险: 第三方可以获知通信内容</li>
        <li>篡改风险: 第三方可以修改通信内容</li>
        <li>冒充风险: 第三方可以冒充他人身份参与通信</li>
      </ul>
      <p>SSL/TLS协议是为了解决三大风险而设计的</p>
      <ul>
        <li>所有信息都是解密传播, 第三方无法窃听</li>
        <li>具有检验机制,一旦篡改,通信双方会立刻发现</li>
        <li>配备身份证书,防止身份被冒充</li>
      </ul>

      <p>四次握手过程</p>
      <ol>
        <li>
          Browser向server发送请求,向server提供它支持的TSL/SSL协议版本,
          <strong>加密方式</strong>以及一个
          <strong>随机数</strong>
          这过程被称为ClientHello
        </li>
        <li>
          Server收到请求,然后向Browser发送确定使用的协议及其版本,
          <strong>加密方式</strong>,<strong>随机数</strong>以及
          <strong>公钥证书</strong>
          这过程被称为SeverHello
        </li>
        <li>
          Browser收到server的回应后,首先验证证书是否是可信机构颁布,证书中的域名与当前网页域名是否一致,是否过期.
          如果没有证书没有问题,就会从证书中取出<strong>公钥</strong>
          .然后再生成一个随机数(pre-master
          key),此时Browser有三个随机数,用这三个随机数+商定的加密方式生成
          <strong>会话密钥</strong>,最后向server发送
          <ul>
            <li>用公钥加密后的pre-master key</li>
            <li>
              编码改变通知 -- 表示随后的消息都有双方约定的加密方式和密钥发送
            </li>
            <li>握手结束通知</li>
          </ul>
        </li>
        <li>
          Server接收到Browser发送的第三个随机数,也用商定的加密方式生成和Browser一样的
          <strong>会话密钥</strong>
          接着向Browser发送
          <ul>
            <li>
              编码改变通知 -- 表示随后的信息都将用双方商定的加密方式和密钥发送
            </li>
            <li>握手结束通知</li>
          </ul>
        </li>
      </ol>
      <p>
        握手阶段全部结束后,
        客户端与服务端进入加密通信,就完全是使用普通的HTTP协议,但内容全部被会话密钥加密
      </p>
      <img src="http://www.ruanyifeng.com/blogimg/asset/201402/bg2014020503.gif" />

      <ul>
        <li>
          如何保证公钥不被篡改/或者确认它是可信, 取决于数字证书.
          证书可信,公钥就可信
        </li>
        <li>
          公钥加密计算量大耗时, 所以每一次会话,
          客户端和服务端都会生成一个会话密钥(session key), 用它来加密信息.
          而会话密钥是对称加密,因此运算速度非常快
        </li>
      </ul>

      <p>
        最终双方使用对称加密的生成的对话密钥进行加密通信,
        此时客户端和服务端都拥有一把一样的对话密钥,这把对话密钥由三个随机数生成的.
      </p>

      <ul>
        额外知识:对称加密与非对称加密
        <li>
          对称加密就是使用一个密码加密和解密,
          密码的程度直接决定了加密的强度.优点,加密解密速度快,缺点,不够安全
        </li>
        <li>
          非对称加密有公钥和私钥.公钥加密,私钥解密,安全性很高.
          缺点就是运算速度非常慢，比对称加密要慢很多
        </li>
      </ul>
    </>
  );
}
