

function test() {
    console.log('run js test method',global)
    global.a = 123
    return '11111111'
}
test()
module.exports = test