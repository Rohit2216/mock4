const express = require("express");
const { orderModel } = require("../models/order.models")


const orderRouter = express.Router();


orderRouter.post("/orders", async (req, res) => {
    const { user, restaurant, items, deliveryAddress } = req.body;
    const totalPrice = items.reduce((price, item) => price + item.price * item.quantity, 0);

    try {
        const newOrder = new orderModel({
            user: user,
            restaurant: restaurant,
            items: items,
            totalPrice: totalPrice,
            deliveryAddress: deliveryAddress,
            
        })

        await newOrder.save();
        return res.status(400).json({ "ok": true, "mssg": "Order Placed" })

    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }

})


orderRouter.get("/orders/:id", async (req, res) => {

    const orderid = req.params.id

    try {
        const data = await orderModel.findById(orderid)
        return res.status(200).json({ "ok": true, data })

    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})


orderRouter.patch("/orders/:id", async (req, res) => {
    const { status } = req.body
    const orderid = req.params.id
    try {
        const data = await orderModel.findByIdAndUpdate(orderid, { $set: { status: status } })
        return res.status(200).json({ "ok": true, data })
    } catch (error) {
        return res.status(400).json({ "ok": false, "mssg": error.message })
    }
})



module.exports = {
    orderRouter
}