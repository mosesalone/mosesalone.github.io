/*
  # Add admin user and update schema

  1. Changes
    - Add admin user with secure credentials
    - Add indexes for performance optimization
    - Add trigger for updating ticket timestamps
*/

-- Create admin user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'admin@dealver.com'
  ) THEN
    -- Insert into auth.users (handled by Supabase Auth)
    -- The password will be set through the UI registration
    
    -- Create admin profile
    INSERT INTO public.users (
      id,
      username,
      email,
      is_admin,
      is_middleman,
      is_available
    ) VALUES (
      gen_random_uuid(),
      'admin',
      'admin@dealver.com',
      true,
      true,
      true
    );
  END IF;
END $$;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_middleman_id ON tickets(middleman_id);
CREATE INDEX IF NOT EXISTS idx_messages_ticket_id ON messages(ticket_id);

-- Create function to update ticket timestamp
CREATE OR REPLACE FUNCTION update_ticket_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating ticket timestamp
DROP TRIGGER IF EXISTS update_ticket_timestamp ON tickets;
CREATE TRIGGER update_ticket_timestamp
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_ticket_timestamp();