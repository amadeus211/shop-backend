const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    bonusIncrement: {
        type: Number,
        required: true
    },
    bonusUsed: {
        type: Number,
        required: true,
        default: 0,
    },
    productList: [{
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        positionPrice: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending',
    }
});

ReceiptSchema.statics.findByClientId = async function (clientId) {
    return await this.find({ clientId }).populate('clientId');
};

module.exports = mongoose.model('Receipt', ReceiptSchema);
