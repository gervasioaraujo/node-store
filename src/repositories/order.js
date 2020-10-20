'use-strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.get = async () => {
    const res = await Order.find({}, 'number status')
                                .populate('customer', 'name')
                                .populate('items.product', 'title');
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
    const res = await Order.findById(id);
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
    var order = new Order(data);
    await order.save();
};

// exports.update = async (id, data) => {
//     await Order.findByIdAndUpdate(id, {
//         $set: {
//             name: data.name,
//             email: data.email,
//             password: data.password
//         }
//     });
// };

exports.delete = async (id) => {
    await Order.findOneAndRemove(id);
};