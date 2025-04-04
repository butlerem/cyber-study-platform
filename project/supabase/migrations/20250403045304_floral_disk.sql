/*
  # Add initial challenges

  1. New Data
    - Add sample challenges to demonstrate the platform functionality
    - Include detailed markdown content for each challenge
    - Set appropriate difficulty levels and points
*/

INSERT INTO challenges (title, description, content, difficulty, points, flag, server_credentials)
VALUES
  (
    'Password Cracking with Kali Linux',
    'Learn how to crack password hashes using John the Ripper and Hashcat in Kali Linux. This challenge will teach you various password cracking techniques and hash identification.',
    '## Password Cracking Challenge

Welcome to the Password Cracking challenge! In this exercise, you''ll learn how to:
- Identify different types of password hashes
- Use John the Ripper for password cracking
- Implement dictionary attacks
- Utilize rainbow tables

### Your Mission

You''ve discovered a password hash in a compromised database:
```
5f4dcc3b5aa765d61d8327deb882cf99
```

Your task is to:
1. Identify the hash type
2. Use appropriate tools to crack it
3. Submit the plaintext password as your flag

### Tools Required
- Kali Linux (provided in the lab environment)
- John the Ripper
- Hashcat
- wordlists

### Tips
- Check common hash formats
- Consider using rainbow tables for MD5
- Try both dictionary and brute force approaches',
    'Easy',
    100,
    'password123',
    '{"host": "lab1.hackerlabs.com", "username": "kali", "password": "training"}'
  ),
  (
    'Web Application Security',
    'Explore common web vulnerabilities including SQL injection, XSS, and CSRF. Learn how to identify, exploit, and protect against these security threats.',
    '## Web Security Challenge

This challenge focuses on identifying and exploiting common web vulnerabilities.

### Objective
Find and exploit the SQL injection vulnerability in the login form.

### Background
The target application uses an insecure login system...',
    'Medium',
    200,
    'sql_master_2024',
    '{"host": "lab2.hackerlabs.com", "username": "webuser", "password": "secure123"}'
  ),
  (
    'Network Traffic Analysis',
    'Analyze network traffic using Wireshark to identify suspicious patterns and potential security breaches. Perfect for aspiring network security analysts.',
    '## Network Analysis Challenge

Learn to analyze network traffic and identify security threats.

### Scenario
A suspicious file transfer was detected...',
    'Hard',
    300,
    'packet_wizard',
    '{"host": "lab3.hackerlabs.com", "username": "analyst", "password": "netflow"}'
  );