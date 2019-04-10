const express = require ('express');
const router = express.Router();

const authMiddleware = require ('../middlewares/auth');
const { Task } = require ('../models');
const joi = require('joi');


router.use(authMiddleware);

router.get('/', async (req, res) => { // LIST ALL TASKS BY ID PROJECT
    try{

        const task = Task.findOne({where : {fk_projectId : req.params}}); 
        if (tasks === null || tasks === [])
           return res.send({ msg : 'Não há tarefas cadastradas para esse projeto!' });

        return res.status(200).send({ task });

    } catch (error){
        res.status(400).send({});

    }
});

router.post('/', async (req, res) => { // CREATE TASK
    try{
        const task = await Task.create({...req.body, fk_userId : req.userId});
        res.status(201).send({ task });

    } catch (error){
        res.status(400).send({ err : 'Erro ao criar tarefa'})

    }
});

router.put('/:id', async (req, res) => { // UPDATE TASK FOR COMPLETED OR NOT
    try{
        const task = await Task.update( req.body, {where : req.params});
        res.status(200).send({ task });

    } catch (error){
        console.log(error)
        res.status(400).send({ err : 'Não foi possível atualizar. Tente novamente!'})
    };
});

router.delete('/:id', async (req, res) => { // DELETE
    try {
        const task = await Task.destroy({where : req.params});
        res.status(200).send({ msg : 'Tarefa excluída com sucesso!'});

    } catch (error){
        res.status(400).send({ err : 'Não foi possível excluir essa tarefa. Tente novamente'})

    }
});

module.exports = app => app.use('/task', router);