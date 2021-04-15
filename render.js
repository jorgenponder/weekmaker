const ejs = require('ejs')

const fs = require('fs')

let rawdata = fs.readFileSync('weeks.json')
let weeks = JSON.parse(rawdata)


for (let week of weeks) {
    ejs.renderFile('template.template', week, {}, function (err, str) {
        console.log(str)
        console.log(err)
        

    })
}