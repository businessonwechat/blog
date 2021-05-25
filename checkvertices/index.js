import * as fs from 'fs'

const file = fs.readFileSync('model.json')
const data = JSON.parse(file)

const entities = []
const vertices = {}

for (let i in data.componentDefinitions) {
    for (let j in data.componentDefinitions[i]) {
        //console.log('JJJ: ', j['entities'])
        if (j === 'entities') {
            for (let k in data.componentDefinitions[i][j]) {
                let vers;
                if ('Edge' === data.componentDefinitions[i][j][k]['typename']) {
                    vers = data.componentDefinitions[i][j][k]['vertices']
                    //console.log('Edge:: ', vers)
                    //console.log('Edge:typeof: ', typeof vers)
                    //console.log('Edge:000: ', vers[0])
                    vertices[vers[0]] = vers[0]
                    vertices[vers[1]] = vers[1]
                }
                if ('Face' === data.componentDefinitions[i][j][k]['typename']) {
                    let loops = data.componentDefinitions[i][j][k]['loops']
                    for (let loop in loops) {
                        vers = loops[loop]['vertices']
                        for (let m in vers) {
                            vertices[vers[m]] = vers[m]
                            //console.log('loops: ', vers[m])
                        }
                    }
                }
                //const ent = data.componentDefinitions[i][j][k]
                //console.log(ent)
            }
        }
    }
}

let size1 = 0, size2 = 0, key;
for (key in vertices) {
    size1++
    if (!data['vertices'][key]) {
        console.log('顶点不存在：', key)
    }
}
for (key in data['vertices']) {
    size2++
}
console.log('顶点统计数量: ', size1)
console.log('顶点数量：', size2)
console.log(data['vertices']['50732'])


console.log('vertices')

//console.log(data.vertices)
