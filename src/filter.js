const root = process.cwd()
const path = require('path')
const njk = require('nunjucks');

let viewsFolderPath = path.resolve(root, './views')

const env = new njk.Environment(new njk.FileSystemLoader(viewsFolderPath))

env.addFilter('time', function (v) {
    return 'abccc'
})

var a = env.render('child.njk', {
    foo: {
        bar: 2
    }
})

console.log(a);