const mongoose = require('mongoose');
const Receipt = require('../models/Receipt');
const Client = require('../models/Client');
const APIError = require('../errors/apiError');

module.exports = class ReceiptService {
    static #validateReceipt(receipt) {
        if (!receipt.productList || !Array.isArray(receipt.productList) || receipt.productList.length === 0) {
            return { ok: false, reason: '.productList cannot be empty' };
        }

        if (receipt.bonusIncrement && receipt.bonusIncrement < 0) {
            return { ok: false, reason: '.bonusIncrement cannot be less than zero' };
        }

        if (receipt.bonusUsed && receipt.bonusUsed < 0) {
            return { ok: false, reason: '.bonusUsed cannot be less than zero' };
        }

        if (receipt.totalPrice <= 0) {
            return { ok: false, reason: '.totalPrice cannot be less than or equal zero' };
        }

        return { ok: true };
    }

    static async saveReceipt(receipt) {
        const { ok, reason } = this.#validateReceipt(receipt);

        if (!ok) {
            throw new APIError(400, `Receipt validation failed: ${reason}`);
        }

        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const client = await Client.findById(receipt.clientId).session(session);
            if (!client) {
                throw new APIError(404, 'Client not found');
            }

            const newReceipt = new Receipt({
                // created_at: new Date(receipt.createdAt),
                clientId: client.id,
                bonusIncrement: receipt.bonusIncrement,
                bonusUsed: receipt.bonusUsed,
                productList: receipt.productList,
                totalPrice: receipt.totalPrice,
            });
            console.log(JSON.stringify(newReceipt));
            
    
            await newReceipt.save({ session });
            await client.updatePendingBonusPoints(newReceipt, session);

            await session.commitTransaction();
            session.endSession();
    
            return newReceipt;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    static async cancelReceipt(id) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const receipt = await Receipt.findById(id).session(session);
            if (!receipt) {
                throw new APIError(404, 'Receipt not found');
            }
            if (receipt.status === 'confirmed') {
                throw new APIError(400, `Cannot cancel this receipt as it is already confirmed`);
            }

            const client = await Client.findById(receipt.clientId).session(session);
            if (!client) {
                throw new APIError(404, 'Client not found');
            }
    
            receipt.status = 'canceled';
            await receipt.save({ session });

            await client.cancelPendingBonusPoints(receipt._id, session);

            await session.commitTransaction();
            session.endSession();
    
            return receipt;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }

    static async confirmReceipt(id) {
        const session = await mongoose.startSession();
        session.startTransaction();
        
        try {
            const receipt = await Receipt.findById(id).session(session);
            if (!receipt) {
                throw new APIError(404, 'Receipt not found');
            }
            if (receipt.status !== 'pending') {
                throw new APIError(400, `Cannot confirm this receipt as it was already ${receipt.status}`);
            }

            const client = await Client.findById(receipt.clientId).session(session);
            if (!client) {
                throw new APIError(404, 'Client not found');
            }
    
            receipt.status = 'confirmed';
            await receipt.save({ session });

            await client.confirmPendingBonusPoints(receipt._id, session);

            await session.commitTransaction();
            session.endSession();
    
            return receipt;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            throw error;
        }
    }
}
