import db from './db.js';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
`;

const insertDataQuery = `
  INSERT INTO notifications (user_id, message, type, read) VALUES
  ('user123', 'Your order has been shipped!', 'order_status', false),
  ('user123', 'You have a new message from support.', 'message', false),
  ('user123', 'A new login was detected on your account.', 'security_alert', true),
  ('user456', 'Welcome to the platform!', 'welcome', false);
`;

const seed = async () => {
  try {
    console.log('Starting database seeding...');

    // Create the table
    await db.query(createTableQuery);
    console.log('Table "notifications" created or already exists.');

    // Clear existing data for the test user to avoid duplicates
    await db.query("DELETE FROM notifications WHERE user_id = 'user123' OR user_id = 'user456'");
    console.log('Cleared old sample data.');

    // Insert new data
    await db.query(insertDataQuery);
    console.log('Sample data inserted.');

    console.log('Database seeding completed successfully.');
  } catch (err) {
    console.error('Error during database seeding:', err);
  } finally {
    // The pool will be managed by the main app, so we don't end it here.
  }
};

seed();
