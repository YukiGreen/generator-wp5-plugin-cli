var http = require('http');

var vulnerabilitiesUrl = `http://e-proxy.yfb.sunline.cn/yfb-sonar/api/measures/search_history?component=${process.env.CI_PROJECT_NAME}&metrics=vulnerabilities&ps=1`

http.get(vulnerabilitiesUrl, function (res) {
    var size = 0;
    var chunks = [];
    res.on('data', function (chunk) {
        size += chunk.length;
        chunks.push(chunk);
    });
    res.on('end', function () {
        var data = Buffer.concat(chunks, size);
        const body = JSON.parse(data.toString())
        var vulnerabilitiesCount = body.measures[0].history[0].value
        if (vulnerabilitiesCount !== '0') {
            console.error(`sonar 扫描出本项目有高危漏洞, 漏洞数量为${vulnerabilitiesCount}`);
            console.error(`本次打包发版将中断, 请修改完高危漏洞后再发版`);
            process.exit(1);
        };
    });
}).on('error', function (e) {
    console.log("Got error: " + e.message);
});