const express = require("express");
const { restaurantModel } = require("../models/restaurant.model");

const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", async (req, res) => {
  try {
    const data = await restaurantModel.find();
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.message });
  }
});

restaurantRouter.get("/restaurants/:id", async (req, res) => {
  const restId = req.params.id;
  try {
    const data = await restaurantModel.findById(restId);
    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.message });
  }
});

restaurantRouter.get("/restaurants/:id/menu", async (req, res) => {
  const restId = req.params.id;
  try {
    const data = await restaurantModel.findById(restId).select("menu");
    res.status(200).json(data.menu);
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.message });
  }
});

restaurantRouter.post("/restaurants", async (req, res) => {
  try {
    const data = new restaurantModel(req.body);
    await data.save();
    res.status(201).json({ ok: true, msg: "Restaurant data added successfully!" });
  } catch (error) {
    res.status(400).json({ ok: false, msg: error.message });
  }
});

restaurantRouter.post("/restaurants/:id/menu", async (req, res) => {
  const restId = req.params.id;
  const { name, description, price, image } = req.body;
  try {
    const newMenuBar = {
      name: name,
      price: price,
      description: description,
      image: image
    };

    let addData = await restaurantModel.findByIdAndUpdate(
      restId,
      { $push: { menu: newMenuBar } },
      { new: true }
    );
    return res.status(201).json({ ok: true, msg: "Updated the restaurant menu" });
  } catch (error) {
    return res.status(400).json({ ok: false, msg: error.message });
  }
});

restaurantRouter.delete("/restaurants/:id/menu/:menuId", async (req, res) => {
    const restId = req.params.id;
    const menuId = req.params.menuId;
    try {
      const updatedData = await restaurantModel.findByIdAndUpdate(
        restId,
        { $pull: { menu: { _id: menuId } } },
        { new: true }
      );
      return res.status(202).json({ ok: true, msg: "Deleted the menu item" });
    } catch (error) {
      return res.status(400).json({ ok: false, msg: error.message });
    }
  });

module.exports = {
  restaurantRouter
};
