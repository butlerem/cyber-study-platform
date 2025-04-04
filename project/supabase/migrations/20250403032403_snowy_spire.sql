/*
  # Initial Schema Setup

  1. New Tables
    - challenges
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - content (text)
      - difficulty (text)
      - points (integer)
      - flag (text)
      - server_credentials (jsonb)
      - created_at (timestamp)
    
    - user_progress
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - challenge_id (uuid, references challenges)
      - completed (boolean)
      - attempts (integer)
      - completed_at (timestamp)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create challenges table
CREATE TABLE challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  difficulty text NOT NULL,
  points integer NOT NULL,
  flag text NOT NULL,
  server_credentials jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  challenge_id uuid REFERENCES challenges NOT NULL,
  completed boolean DEFAULT false,
  attempts integer DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, challenge_id)
);

-- Enable RLS
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for challenges
CREATE POLICY "Challenges are viewable by authenticated users"
  ON challenges
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can modify their own progress"
  ON user_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insert initial challenge data
INSERT INTO challenges (title, description, content, difficulty, points, flag, server_credentials) VALUES
(
  'Password Cracking Basics',
  'Learn the fundamentals of password cracking using Kali Linux and common tools.',
  E'# Password Cracking with Kali Linux\n\n## Introduction\nPassword cracking is a crucial skill in cybersecurity, both for penetration testing and understanding how to better protect systems.\n\n## Tools We''ll Use\n- John the Ripper\n- Hashcat\n- Wordlists (rockyou.txt)\n\n## Steps\n1. First, we''ll identify the hash type\n2. Select the appropriate cracking method\n3. Use dictionary attacks\n4. Try brute force if necessary\n\n```bash\n# Example of cracking an MD5 hash with John the Ripper\njohn --format=raw-md5 hash.txt --wordlist=/usr/share/wordlists/rockyou.txt\n```\n\n## Your Challenge\nA system administrator has left an MD5 hash of an important password. Your task is to crack it using the provided Kali Linux server.\n\nThe hash is: `5f4dcc3b5aa765d61d8327deb882cf99`\n\nUse the server credentials below to access the practice environment and find the original password. Submit the cracked password as your flag.',
  'Easy',
  100,
  'password',
  '{"host": "hack-lab-01.example.com", "username": "student", "password": "start-hacking"}'
);