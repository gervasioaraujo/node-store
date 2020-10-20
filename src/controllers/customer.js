'use-strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer');
const md5 = require('md5');
const emailService = require('../services/email-service');

exports.get = async (req, res, next) => {
    try {
        const data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

// exports.getBySlug = async (req, res, next) => {
//     try {
//         const data = await repository.getBySlug(req.params.slug);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ message: 'falha ao processar a requisição' });
//     }
// };

exports.getById = async (req, res, next) => {
    try {
        const data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

// exports.getByTag = async (req, res, next) => {
//     try {
//         const data = await repository.getByTag(req.params.tag);
//         res.status(200).send(data);
//     } catch (error) {
//         res.status(500).send({ message: 'falha ao processar a requisição' });
//     }
// };

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres.');
    contract.isEmail(req.body.email, 'Endereço de e-mail inválido.');
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 3 caracteres.');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        emailService.send(req.body.email,
                          'Bem vindo ao Node Store',
                          global.EMAIL_TMPL.replace('{0}', req.body.name));

        res.status(201).send({ message: 'Cliente cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.put = async (req, res, next) => {
    try {
        await repository.update(req.params.id, req.body);
        res.status(200).send({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};

exports.delete = async (req, res, next) => {
    try {
        await repository.delete(req.body.id);
        res.status(200).send({ message: 'Cliente removido com sucesso!' });
    } catch (error) {
        res.status(500).send({ message: 'falha ao processar a requisição' });
    }
};