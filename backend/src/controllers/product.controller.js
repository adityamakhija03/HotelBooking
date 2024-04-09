import {Product} from "../model/product.model.js"

// All products 
const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Get a single product by ID
const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  // Create a new product
const createProduct = async (req, res) => {
    try {
    //   const errors = validationResult(req);
    //   if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    //   }
  
      const { productName, price, description , category } = req.body;
      const newProduct = new Product({ productName, price, description, category});
      await newProduct.save();
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update a product
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update product properties here (e.g., name, price, description)
      // ...
      // Extract updated properties from the request body
    const { productName, price, description,category } = req.body;

    // Update product properties
    product.productName = productName || product.productName; // If name is provided, update; otherwise, keep the existing name
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;

      await product.save();
      res.status(200).json(product);
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a product
  const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.remove();
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export{
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
