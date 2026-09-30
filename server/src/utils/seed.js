const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Item = require('../models/Item');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const sampleItems = [
  {
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Custom split mechanical keyboard with hot-swappable switches, PBT keycaps, and RGB backlighting for developers.',
    type: 'Product',
    status: 'Available',
    priority: 'High',
    price: 149.99
  },
  {
    name: 'Ultra-Wide 34-Inch Curved Monitor',
    description: '3440x1440 WQHD IPS panel with 144Hz refresh rate, USB-C 90W power delivery, and factory color calibration.',
    type: 'Product',
    status: 'Available',
    priority: 'Medium',
    price: 499.50
  },
  {
    name: 'Noise-Canceling Wireless Headphones',
    description: 'Active noise cancellation headphones with 40-hour battery life and multi-device Bluetooth pairing.',
    type: 'Product',
    status: 'Out of Stock',
    priority: 'Low',
    price: 199.00
  },
  {
    name: 'USB-C Multi-Port Hub (10-in-1)',
    description: 'Includes dual HDMI 4K, Gigabit Ethernet, SD card reader, and 100W PD passthrough charging.',
    type: 'Product',
    status: 'Discontinued',
    priority: 'Low',
    price: 45.00
  },
  {
    name: 'Implement OAuth 2.0 User Authentication',
    description: 'Integrate Google and GitHub single sign-on providers and refresh token rotation in the backend service.',
    type: 'Task',
    status: 'In Progress',
    priority: 'High',
    price: null
  },
  {
    name: 'Database Indexing and Performance Audit',
    description: 'Analyze slow query logs, build compound indexes on item type and priority, and review connection pooling.',
    type: 'Task',
    status: 'Pending',
    priority: 'High',
    price: null
  },
  {
    name: 'Design Responsive Mobile Navigation',
    description: 'Create collapsible sidebar drawer with touch gestures and accessible keyboard navigation for smaller screens.',
    type: 'Task',
    status: 'Completed',
    priority: 'Medium',
    price: null
  },
  {
    name: 'Setup Automated CI/CD Pipeline',
    description: 'Configure GitHub Actions workflow for linting, unit testing, and automated deployment to staging cluster.',
    type: 'Task',
    status: 'Pending',
    priority: 'Low',
    price: null
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in .env');
    }

    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Clear existing items
    const deleted = await Item.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing items.`);

    // Insert sample items
    const created = await Item.insertMany(sampleItems);
    console.log(`Successfully seeded ${created.length} sample items!`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
