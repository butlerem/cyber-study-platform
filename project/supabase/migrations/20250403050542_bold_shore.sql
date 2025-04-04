/*
  # Add challenge data

  1. Changes
    - Insert initial challenge data into the challenges table
    - Add sample challenges with varying difficulties and points
    - Include detailed markdown content for each challenge
*/

-- Insert initial challenge data if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM challenges 
    WHERE title = 'Password Cracking Basics'
  ) THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'Password Cracking Basics',
      'Learn the fundamentals of password cracking using Kali Linux and common tools.',
      E'# Password Cracking with Kali Linux\n\n## Introduction\nPassword cracking is a crucial skill in cybersecurity, both for penetration testing and understanding how to better protect systems.\n\n## Tools We''ll Use\n- John the Ripper\n- Hashcat\n- Wordlists (rockyou.txt)\n\n## Steps\n1. First, we''ll identify the hash type\n2. Select the appropriate cracking method\n3. Use dictionary attacks\n4. Try brute force if necessary\n\n```bash\n# Example of cracking an MD5 hash with John the Ripper\njohn --format=raw-md5 hash.txt --wordlist=/usr/share/wordlists/rockyou.txt\n```\n\n## Your Challenge\nA system administrator has left an MD5 hash of an important password. Your task is to crack it using the provided Kali Linux server.\n\nThe hash is: `5f4dcc3b5aa765d61d8327deb882cf99`\n\nUse the server credentials below to access the practice environment and find the original password. Submit the cracked password as your flag.',
      'Easy',
      100,
      'password',
      '{"host": "hack-lab-01.example.com", "username": "student", "password": "start-hacking"}'
    );
  END IF;
END $$;