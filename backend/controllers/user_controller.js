/* AUTHOR: Tanvi Pruthi*/

const userModel = require("../models/user_model");

/**
 * This function adds a new user into database, log in a user and change password for the registered users. This functionality is available to the users who are registered and wants to register to the website.
 * @param {*} req
 * @param {*} res
 * @returns
 */

const addUser = async (req, res) => {
    try {
        const emailId = req.body.email_id
        const foundUser = await userModel.findOne({"user_email_id": emailId}).exec();
        if (foundUser === null) {
            const user = new userModel({
                user_id: req.body.email_id.toString().split("@")[0],
                user_email_id: req.body.email_id,
                user_password: req.body.user_password
            })
            await user.save();
            return res.status(200).json({
                "message": "User registered successfully!"
            })
        } else {
            return res.status(200).json({
                "message": "User already exists."
            })
        }
    } catch (err) {
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
}


const verifyUser = async (req, res) => {

    try {
        const emailId = req.body.email_id
        const pass = req.body.user_password
        const foundUser = await userModel.findOne({'user_email_id': emailId}).exec();
        const credentialsCombination = await userModel.findOne({
            'user_email_id': emailId, 'user_password': pass
        }).exec();
        if (foundUser === null) {
            return res.status(200).json({
                "message": "User doesn't exist. Create an account."
            })
        } else {
            if (credentialsCombination !== null) {
                return res.status(200).json({
                    "message": "User logged in successfully!"
                })
            } else {
                return res.status(200).json({
                    "message": "User found, but email and password combination doesn't match."
                })
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
}

const changePassword = async (req, res) => {

    try {
        const emailId = req.body.email_id
        const pass = req.body.user_password
        const foundUser = await userModel.findOne({'user_email_id': emailId}).exec();
        if (foundUser === null) {
            return res.status(200).json({
                "message": "User doesn't exist. Please enter you registered email id."
            })
        } else {
            const updateUser = await userModel.updateOne({'user_email_id': emailId}, {
                $set: {
                    user_email_id: emailId,
                    user_password: pass
                }
            });
            console.log(updateUser)
            if (!updateUser) {
                return res.status(200).json({
                    "message": "Failed to update the password, please try again."
                })
            } else {
                return res.status(200).json({
                    "message": "Password updated successfully, login now with the new password."
                })
            }
        }
    } catch
        (err) {
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
}

module.exports = {addUser, verifyUser, changePassword}