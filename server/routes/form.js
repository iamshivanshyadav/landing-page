// routes/form.js

import express from 'express';
const router = express.Router();
import Form from '../models/Form.js';

// POST route for form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
// Check if email already exists
    const existingForm = await Form.findOne({ email });
    if (existingForm) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newForm = new Form({
      name,
      email,
      phone
    });

    await newForm.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
