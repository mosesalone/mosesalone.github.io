/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `is_admin` (boolean)
      - `is_middleman` (boolean)
      - `is_available` (boolean)
      - `created_at` (timestamp)
    
    - `tickets`
      - `id` (text, primary key)
      - `title` (text)
      - `description` (text)
      - `client_id` (uuid, references users)
      - `counterparty_id` (uuid, references users)
      - `middleman_id` (uuid, references users)
      - `status` (text)
      - `amount` (numeric)
      - `payment_method` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `messages`
      - `id` (uuid, primary key)
      - `ticket_id` (text, references tickets)
      - `sender_id` (uuid, references users)
      - `content` (text)
      - `is_system` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  is_admin boolean DEFAULT false,
  is_middleman boolean DEFAULT false,
  is_available boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  client_id uuid REFERENCES users(id),
  counterparty_id uuid REFERENCES users(id),
  middleman_id uuid REFERENCES users(id),
  status text NOT NULL CHECK (status IN ('open', 'in-progress', 'completed', 'cancelled')),
  amount numeric NOT NULL CHECK (amount > 0),
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id text REFERENCES tickets(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES users(id),
  content text NOT NULL,
  is_system boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Tickets policies
CREATE POLICY "Users can read tickets they are involved in"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = client_id OR 
    auth.uid() = counterparty_id OR 
    auth.uid() = middleman_id OR
    (SELECT is_admin FROM users WHERE id = auth.uid())
  );

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Users can update their own tickets"
  ON tickets
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = client_id OR 
    auth.uid() = middleman_id OR
    (SELECT is_admin FROM users WHERE id = auth.uid())
  );

-- Messages policies
CREATE POLICY "Users can read messages for their tickets"
  ON messages
  FOR SELECT
  TO authenticated
  USING (
    ticket_id IN (
      SELECT id FROM tickets 
      WHERE client_id = auth.uid() 
      OR counterparty_id = auth.uid() 
      OR middleman_id = auth.uid()
      OR (SELECT is_admin FROM users WHERE id = auth.uid())
    )
  );

CREATE POLICY "Users can create messages for their tickets"
  ON messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    ticket_id IN (
      SELECT id FROM tickets 
      WHERE client_id = auth.uid() 
      OR counterparty_id = auth.uid() 
      OR middleman_id = auth.uid()
      OR (SELECT is_admin FROM users WHERE id = auth.uid())
    )
  );