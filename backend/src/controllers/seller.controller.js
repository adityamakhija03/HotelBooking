import {Seller} from "../models/seller.model.js"

// Create a new seller
const createSeller = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, products, address, phoneNumber, website, socialMedia } = req.body;
      const newSeller = new Seller({
        name,
        email,
        products,
        address,
        phoneNumber,
        website,
        socialMedia,
      });
  
      await newSeller.save();
      res.status(201).json(newSeller);
    } catch (error) {
      console.error('Error creating seller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Get seller by ID
  const getSellerById = async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
      res.status(200).json(seller);
    } catch (error) {
      console.error('Error fetching seller by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Update seller information
  const updateSeller = async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Update seller properties here (e.g., name, email, address, etc.)
      // ...
      // Extract updated properties from the request body
    const { name, email, address, phoneNumber, website, socialMedia } = req.body;

    // Update seller properties
    seller.name = name || seller.name; // If name is provided, update; otherwise, keep the existing name
    seller.email = email || seller.email;
    seller.address = address || seller.address;
    seller.phoneNumber = phoneNumber || seller.phoneNumber;
    seller.website = website || seller.website;
    seller.socialMedia = socialMedia || seller.socialMedia;
    
      await seller.save();
      res.status(200).json(seller);
    } catch (error) {
      console.error('Error updating seller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a seller
  const deleteSeller = async (req, res) => {
    try {
      const seller = await Seller.findById(req.params.id);
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      await seller.remove();
      res.status(204).end();
    } catch (error) {
      console.error('Error deleting seller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

export{
    createSeller,
    getSellerById,
    updateSeller,
    deleteSeller
}