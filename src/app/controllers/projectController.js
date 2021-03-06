const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');
const { Project } = require ('../models');
const joi = require('joi');

router.use(authMiddleware);

router.get('/', async (req, res) => { // LIST ALL
    try{
        const projects = await Project.findAll(); 
        if (projects === null || projects === [])
           return res.status(200).send({ msg : 'Não projetos disponiveis' });

        return res.status(200).send({ projects });


    } catch (error){
        res.status(400).send({ err : ''})

    }
});

router.get('/:id', async (req, res) => { // LIST BY ID
    try{
        const project = await Project.findOne({where : req.params});
        res.send({ project });

    } catch (error){
        res.status(400).send({ err : 'Projeto não encontrado'})

    }
});

router.post('/', async (req, res) => { // CREATE
    
    try{
        const project = await Project.create({...req.body, fk_userId : req.userId});
        res.status(201).send({ project});

    } catch (error){
        res.status(400).send({ err : 'Erro ao criar projeto'})

    }
});

router.put('/:id', async (req, res) => { // UPDATE
    try{
        const project = await Project.update( req.body, {where : req.params});
        res.status(200).send({ project });

    } catch (error){
        console.log(error)
        res.status(400).send({ err : 'Não foi possível atualizar. Tente novamente!'})
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        const project = await Project.destroy({where : req.params});
        res.status(200).send({ msg : 'Projeto excluído com sucesso!'});

    } catch (error){
        res.status(400).send({ err : 'Não foi possível excluir esse projeto. Tente novamente'})

    }
});

module.exports = app => app.use('/projects', router);