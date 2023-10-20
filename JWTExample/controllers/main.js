var jwt = require('jsonwebtoken');

const { BadRequestError } = require('../errors');

const JWT_SECRET = process.env.JWT_SECRET || 'SecretSecureCode'

const login = async (req, res) => {
    const {username, password} = req.body;
    
    if(!username || !password){
        throw new BadRequestError('Please provide a valid email and password')
    }

    const id = new Date().getDate();

    // dummy id, usually from DB
    const token = jwt.sign({id, username},JWT_SECRET, {expiresIn: '30d'});


    res.status(200).json({msg: 'user created', token})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg: `Hello ${req.user.username}`, secret: `Your lucky number is ${luckyNumber}`});
}

module.exports = {
    login, dashboard
}