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
    },
    isVisibility: true,
    list: [{
        name: 'xiaows',
        age: '18'
    }, {
        name: 'xiaows2',
        age: '19'
    }]
})

console.log(a);