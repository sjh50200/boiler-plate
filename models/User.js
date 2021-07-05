const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10 //salt가 몇글자인지
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        // jong hyeon@naver.com 했을 때 빈칸 지워줌
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

//index.js에서 user.save호출 전에 동작 pre함수!
userSchema.pre('save', function (next) {
    
    //비밀번호를 Bcrypt로 암호화 시킴 
    var user = this; //userschema를 가리킴

    if (user.isModified('password')) { //password외의 다른 속성 변경 시 암호화시키는 것을 방지
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb) {
    //암호화 된 비밀번호 복호화 불가이므로 plain을 암호화 해서 비교.
    //plainPassword 123567 vs 암호화된 비밀번호 $2b$10$wT9.UeTNqJlN2I/DwwTNwOZUBRYbWHObY41XzXUlr3AVo/bKi1Zly

    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    //jsonwebtoken을 이용해서 token을 생성.
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id 도출

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 1. 토큰을 decode => verify(token, 사용한 토큰 변수명?, func)
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용하여 유저를 찾은 후
        // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

        user.findOne({"_id" : decoded, "token": token}, function(err, user){
            if(err) return cb(err)
            cb(null, user)
        })
    })
}
const User = mongoose.model('User', userSchema)

module.exports = { User }