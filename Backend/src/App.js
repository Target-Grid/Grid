const express = require("express");
const app = express();
var cors = require("cors");
require("../dbcoo");
const user = require("../models/user");
const product = require("../models/product");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});
app.post("/user", async (req, res) => {
  try {
    const a = new user(req.body);
    const gg = await a.save();

    res.status(201).send(gg);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/userall", async (req, res) => {
  try {
    const a = await user.find({});
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/useremail/:email", async (req, res) => {
  try {
    const a = await user.find({ email: req.params.email });
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/userid/:id", async (req, res) => {
  try {
    const a = await user.find({ _id: req.params.id });
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/userid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await user.findByIdAndUpdate(id, updatedData, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.patch("/useremail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const options = { new: true };
    const result = await user.updateOne({ email: email }, updatedData, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/userid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await user.findByIdAndDelete(id);
    res.status(200).send("User Deleted!");
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
});

app.delete("/useremail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await user.findOneAndDelete({ email: email });
    res.status(200).send("User Deleted!");
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
});

// products endpoints

app.post("/products", async (req, res) => {
  try {
    const a = new product(req.body);
    const gg = await a.save();

    res.status(201).send(gg);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/prname/:name", async (req, res) => {
  try {
    const a = await product.find({ skill_name: req.params.name });
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/prid/:id", async (req, res) => {
  try {
    const a = await product.find({ _id: req.params.id });
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/productsid/:s_id", async (req, res) => {
  try {
    const a = await product.find({ s_id: req.params.s_id });
    if (!a) {
      res.status(404).send();
    } else {
      res.status(200).send(a);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

app.patch("/productid/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await product.findByIdAndUpdate(_id, updatedData, options);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/productid/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await product.findByIdAndDelete(id);
    res.status(200).send("Particular product of current user Deleted!");
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
});

app.delete("/productsid/:s_id", async (req, res) => {
  try {
    const s_id = req.params.s_id;
    const data = await product.deleteMany({ s_id: s_id });
    res.status(200).send("All products of current company user Deleted!");
  } catch (error) {
    res.status(204).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log("Server is working");
});
