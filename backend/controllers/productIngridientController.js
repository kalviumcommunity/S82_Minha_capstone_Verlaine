const Product = require("../models/Product");
const Ingredient = require("../models/Ingredient");


const createProduct = async (req, res) => {
  const { name, brand, ingredients } = req.body;
  try {
    const product = new Product({ name, brand, ingredients });
    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};


const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("ingredients");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};


const createIngredient = async (req, res) => {
  const { name, safety, description } = req.body;
  try {
    const ingredient = new Ingredient({ name, safety, description });
    await ingredient.save();
    res.status(201).json({ message: "Ingredient created successfully", ingredient });
  } catch (error) {
    res.status(500).json({ message: "Error creating ingredient", error });
  }
};


const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ingredients", error });
  }
};

module.exports = { createProduct, getProducts, createIngredient, getIngredients };