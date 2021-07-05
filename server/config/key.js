if(process.env.NODE_ENV === 'production') //환경 변수가 Local인가 배포(Deply) 한 후인가 production은 배포 후임
{
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}