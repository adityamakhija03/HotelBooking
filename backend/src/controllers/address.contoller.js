import {Address} from "../models/address.model.js";
import mongoose from 'mongoose';
import { asyncHandler } from "../utils/asyncHandler.js";



const addAddress = asyncHandler (async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction(); 

        if (req.body.setAsDefault) {
            await Address.updateMany({ user: req.user, setAsDefault: true }, {
                $set: {
                    setAsDefault: false
                }
            }, { session });
        }

        const newAddress = new Address(req.body);
        await newAddress.save({ session });
        await session.commitTransaction();

        const info = {
            status: true,
            message: "New Address Added Successfully",
            result: newAddress
        };
        res.status(200).send(info);

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        await session.endSession();
    }
});

const getAddressList = asyncHandler( async (req, res) => {
    try {
        const result = await Address.find({ user: req.user });

        if (!result) {
            const error = new Error("No Address Found.");
            error.statusCode = 404;
            throw error;
        }

        result.sort((a, b) => {
            if (a.setAsDefault === true) return -1;
            if (b.setAsDefault === true) return 1;
        });

        const info = {
            status: true,
            message: "List of addresses",
            result
        };
        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
});

const getAddressById = asyncHandler( async (req, res, next) => {
    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user });

        if (!address) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Address retrieved successfully",
            result: address
        };

        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
});

const updateAddress = asyncHandler (async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        if (req.body.setAsDefault === true) {
            await Address.updateMany({ user: req.user, setAsDefault: true }, {
                $set: {
                    setAsDefault: false
                }
            }, { session });
        }

        const result = await Address.findByIdAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            session
        });

        if (!result) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        await session.commitTransaction();
        const info = {
            status: true,
            message: "Address updated successfully",
            result
        };

        res.status(200).send(info);

    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        await session.endSession();
    }
});

const deleteAddress = asyncHandler (async (req, res, next) => {
    try {
        const result = await Address.findByIdAndDelete(req.params.id);

        if (!result) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        const info = {
            status: true,
            message: "Address deleted successfully",
            result
        };
        res.status(200).send(info);
    } catch (error) {
        next(error);
    }
});

const getDefaultAddress = asyncHandler( async (req, res, next) => {
    try {
        const address = await Address.find({ user: req.user });

        if (!address) {
            const error = new Error("Address not found");
            error.statusCode = 404;
            throw error;
        }

        const defaultAddress = address.find(address => address.setAsDefault === true);

        const info = {
            status: true,
            message: "Default or last use address.",
            result: defaultAddress ? defaultAddress : address[address.length - 1] || []
        };

        res.status(200).send(info);

    } catch (error) {
        next(error);
    }
});

export { addAddress, getAddressList, getAddressById, updateAddress, deleteAddress, getDefaultAddress };
