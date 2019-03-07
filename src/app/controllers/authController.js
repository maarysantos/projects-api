const express = require ('express');
const router = express.Router();

const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const crypto = require ('crypto');

const authConfig = require('../../config/auth');

const Usuario = require ('../models/User');

function generateToken( params = {}){
     return jwt.sign({params}, authConfig.secret,
        {
          expiresIn : 86400,
        });

}

router.post('/register', async (req, res) => {
    try{
        if( await Usuario.findOne({where : {nm_login : req.body.nm_login}})){
            return res.status(400).send('Usuário já existe!');
        }

        const usuario = await Usuario.create(req.body);
        usuario.nm_senha = undefined;
        
        return res.send ({
            msg : 'Cadastrado com sucesso!',
            token : generateToken({id: usuario.nm_login})
        });

    }catch (err){
        console.log(err)
        return res.status(412).send({error :err})
    }
   
});

router.post('/authenticate', async (req, res) => {
    const {nm_login: username, nm_senha: senha} = req.body;

    const usuario = await Usuario.findOne({where : {nm_login : username}})
    if (!usuario)
        return res.status(400).send({error :"Usuário não encontrado!"})

    if(! await bcrypt.compare(senha, usuario.nm_senha))
     return res.status(400).send({error: "Senha invalida"})

     usuario.senha = undefined;

    res.send({
         usuario,
         token : generateToken({id :usuario.nm_login})
    });
});   

//rota Esqueci minha senha 
router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;

    try{
        const user = await Usuario.findOne({ where : {nm_email : email }});
        if(!user)
        return res.status(403).send({ error : 'Usuário não encontrado' });

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date ();
        now.setHours(now.getHours()+1);
        //token vai ser salvo no model.

        await Usuario.findById({})
        

    }catch (error){

    }
});


module.exports = app => app.use('/', router)