/*
  # Add sample challenge data

  1. Changes
    - Insert initial challenge data into the challenges table
    - Includes a variety of challenges with different difficulties and points
*/

INSERT INTO challenges (title, description, content, difficulty, points, flag, server_credentials) VALUES
(
  'Password Cracking Basics',
  'Learn the fundamentals of password cracking using Kali Linux and common tools.',
  E'# Password Cracking with Kali Linux\n\n## Introduction\nPassword cracking is a crucial skill in cybersecurity, both for penetration testing and understanding how to better protect systems.\n\n## Tools We''ll Use\n- John the Ripper\n- Hashcat\n- Wordlists (rockyou.txt)\n\n## Steps\n1. First, we''ll identify the hash type\n2. Select the appropriate cracking method\n3. Use dictionary attacks\n4. Try brute force if necessary\n\n```bash\n# Example of cracking an MD5 hash with John the Ripper\njohn --format=raw-md5 hash.txt --wordlist=/usr/share/wordlists/rockyou.txt\n```\n\n## Your Challenge\nA system administrator has left an MD5 hash of an important password. Your task is to crack it using the provided Kali Linux server.\n\nThe hash is: `5f4dcc3b5aa765d61d8327deb882cf99`\n\nUse the server credentials below to access the practice environment and find the original password. Submit the cracked password as your flag.',
  'Easy',
  100,
  'password',
  '{"host": "hack-lab-01.example.com", "username": "student", "password": "start-hacking"}'
),
(
  'SQL Injection 101',
  'Master the basics of SQL injection attacks and learn how to prevent them.',
  E'# SQL Injection Fundamentals\n\n## Introduction\nSQL injection remains one of the most critical web application vulnerabilities. Learn how to identify and exploit basic SQL injection points.\n\n## Concepts Covered\n- Basic SQL syntax\n- Common injection points\n- Authentication bypass\n- Data extraction\n\n## Your Challenge\nA login form is vulnerable to SQL injection. Find a way to bypass the authentication and access the admin panel.\n\nTarget URL: http://{host}:8080/login\n\nSubmit the admin''s password hash as your flag.',
  'Easy',
  150,
  '21232f297a57a5a743894a0e4a801fc3',
  '{"host": "hack-lab-02.example.com", "username": "student", "password": "sql-basics"}'
),
(
  'Cross-Site Scripting (XSS)',
  'Learn how to identify and exploit XSS vulnerabilities in web applications.',
  E'# Cross-Site Scripting (XSS)\n\n## Introduction\nXSS allows attackers to inject malicious scripts into web pages viewed by other users. Learn different types of XSS and their impact.\n\n## Types of XSS\n- Reflected XSS\n- Stored XSS\n- DOM-based XSS\n\n## Your Challenge\nThe target website has a comment system vulnerable to stored XSS. Craft a payload that will steal the admin''s cookie when they view the comments.\n\nTarget URL: http://{host}:8080/blog\n\nSubmit the admin''s session cookie as your flag.',
  'Medium',
  200,
  'admin_cookie_123456',
  '{"host": "hack-lab-03.example.com", "username": "student", "password": "xss-training"}'
);