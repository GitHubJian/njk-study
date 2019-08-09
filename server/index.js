const koa = require('koa')
const app = new koa()

const htmlMiddleware = require('./htmlMiddleware')

app.use(htmlMiddleware())

app.listen(8418, () => {
    console.log(`✨ 服务已启动 http://localhost:8418`);
})