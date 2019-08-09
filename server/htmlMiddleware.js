const root = process.cwd()
const path = require('path')
const nunjucks = require('nunjucks');
const minify = require('html-minifier').minify

function formatDate(timestamp) {
    let date = new Date(timestamp),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes()

    return (
        date.getFullYear() +
        '-' +
        (String(month).length < 2 ? '0' + month : month) +
        '-' +
        (String(day).length < 2 ? '0' + day : day) +
        ' ' +
        (String(hour).length < 2 ? '0' + hour : hour) +
        ':' +
        (String(minute).length < 2 ? '0' + minute : minute)
    )
}

const install = (config = {}) => {
    let views = path.resolve(root, './views')
    let env = new nunjucks.Environment(new nunjucks.FileSystemLoader(views, {
        watch: true,
        noCache: true
    }))

    env.addFilter('formatDate', formatDate)

    return async (ctx, next) => {
        let reqPath = ctx.path

        if (!reqPath.startsWith('/static')) {
            return next()
        }

        ctx.__INITIAL_STATE__ = {
            publicTime: Date.now(),
            isVisibility: true,
            list: [{
                name: 'xiaows',
                age: '18'
            }, {
                name: 'xiaows2',
                age: '19'
            }]
        }

        let html = env.render('index.njk', ctx.__INITIAL_STATE__)

        ctx.body = minify(html, {
            collapseWhitespace: true
            // removeEmptyElements: true
        })
    }
}

// install()({ path: '/static/pages/index', body: '' })

module.exports = install