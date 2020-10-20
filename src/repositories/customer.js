'use-strict';

const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

exports.get = async () => {
    // const res = await Customer.find({}, 'name email');
    const res = await Customer.find();
    return res;
};

// exports.getBySlug = async (slug) => {
//     const res = await Customer.findOne({
//                                 slug: slug,
//                                 active: true
//                             }, 'title description price slug tags');
//     return res;
// };

exports.getById = async (id) => {
    const res = await Customer.findById(id);
    return res;
};

// exports.getByTag = async (tag) => {
//     const res = await Customer.find({
//                                 tags: tag,
//                                 active: true
//                             }, 'title description price slug tags');
//     return res;
// };

exports.create = async (data) => {
    var customer = new Customer(data);
    await customer.save();
};

exports.update = async (id, data) => {
    await Customer.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
};

exports.delete = async (id) => {
    await Customer.findOneAndRemove(id);
};