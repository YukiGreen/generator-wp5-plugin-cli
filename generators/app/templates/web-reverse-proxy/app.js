const express = require('express');
const app = express();

// nacos相关
const { NacosNamingClient } = require('nacos');
const { address } = require('ip');
// 动态获取本机 IP 地址
const ipAddr = address();
// 随机生成端口号
const port = Math.floor(Math.random()*10000);
const logger = console;
// 服务名称，后面消费方调用的时候通过这个服务名进行服务查询。
const providerServiceName = 'fp-bap-ui';
// nacos服务地址
const nacosServerAddress = '10.22.70.55:8848';
// namespace: 命名空间必须在服务器上存在
const providerNamespase = 'MONE-SYSTEM';

app.use(express.static('../dist'));

app.listen(port, () => {
  console.log(`启动成功:localhost:${port}`);
});

app.use("/", (res, req, next) => {
	console.log(res.url + ":404")
	next();
})

// 注册服务到Nacos服务器
const client = new NacosNamingClient({
  logger,
  serverList: nacosServerAddress,
  namespace: providerNamespase
});


(async () => {
  try {
    await client.ready();
    // 注册服务和实例
    await client.registerInstance(providerServiceName, {
      ip: ipAddr,
      port
    });
    console.log(`[Nacos] Nacos服务实例注册成功: ${ipAddr}:${port}`);
  } catch (err) {
    console.log('[Nacos] Nacos服务实例注册失败: ' + err.toString());
  }
})();