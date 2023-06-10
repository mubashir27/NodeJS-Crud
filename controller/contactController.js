const asyncHandler = require('express-async-handler');
const contactModel = require('../models/contactModel');

const getContact = asyncHandler(async (req, res) => {
    const Contact = await contactModel.find({ user_id: req.user.id });
    res.status(200).json(Contact);
});

const postContact = asyncHandler(async (req, res) => {
    console.log('body is', req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All Fields are ');
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(200).json(contact);
});

const getContactById = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error('User dont have permissions to update other contacnt');
    }

    const updateContact = await contactModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await contactModel.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    await contactModel.remove();
    res.status(200).json({ message: 'Deleted contact' });
});

module.exports = { getContact, postContact, getContactById, updateContact, deleteContact };
