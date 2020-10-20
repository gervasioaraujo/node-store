'use-strict';

// const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.post = async (req, res, next) => {
    // let contract = new ValidationContract();
    // contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    // contract.isEmail(req.body.email, 'Endereço de e-mail inválido.');
    // contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres.');

    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end();
    //     return;
    // }
    
    try {
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send({ message: 'Pedido cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Pedido atualizado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: 'Pedido removido com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};