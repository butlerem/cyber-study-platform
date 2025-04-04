/*
  # Add more challenge data

  1. Changes
    - Add additional challenges to provide more variety
    - Include different difficulty levels
*/

DO $$
BEGIN
  -- SQL Injection Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'SQL Injection 101') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'SQL Injection 101',
      'Master the basics of SQL injection attacks and learn how to prevent them.',
      E'# SQL Injection Fundamentals\n\n## Introduction\nSQL injection remains one of the most critical web application vulnerabilities. Learn how to identify and exploit basic SQL injection points.\n\n## Concepts Covered\n- Basic SQL syntax\n- Common injection points\n- Authentication bypass\n- Data extraction\n\n## Your Challenge\nA login form is vulnerable to SQL injection. Find a way to bypass the authentication and access the admin panel.\n\nTarget URL: http://{host}:8080/login\n\nSubmit the admin''s password hash as your flag.',
      'Easy',
      150,
      '21232f297a57a5a743894a0e4a801fc3',
      '{"host": "hack-lab-02.example.com", "username": "student", "password": "sql-basics"}'
    );
  END IF;

  -- XSS Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'Cross-Site Scripting (XSS)') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'Cross-Site Scripting (XSS)',
      'Learn how to identify and exploit XSS vulnerabilities in web applications.',
      E'# Cross-Site Scripting (XSS)\n\n## Introduction\nXSS allows attackers to inject malicious scripts into web pages viewed by other users. Learn different types of XSS and their impact.\n\n## Types of XSS\n- Reflected XSS\n- Stored XSS\n- DOM-based XSS\n\n## Your Challenge\nThe target website has a comment system vulnerable to stored XSS. Craft a payload that will steal the admin''s cookie when they view the comments.\n\nTarget URL: http://{host}:8080/blog\n\nSubmit the admin''s session cookie as your flag.',
      'Medium',
      200,
      'admin_cookie_123456',
      '{"host": "hack-lab-03.example.com", "username": "student", "password": "xss-training"}'
    );
  END IF;

  -- Network Analysis Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'Network Traffic Analysis') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'Network Traffic Analysis',
      'Analyze network traffic using Wireshark to identify suspicious patterns and potential security breaches.',
      E'# Network Analysis Challenge\n\n## Introduction\nNetwork analysis is crucial for identifying security threats and understanding attack patterns.\n\n## Tools Required\n- Wireshark\n- tcpdump\n- Network analysis scripts\n\n## Your Challenge\nAnalyze the provided PCAP file to identify the data exfiltration attempt. Find the stolen data and submit it as your flag.\n\nDownload the PCAP file from: http://{host}/capture.pcap',
      'Hard',
      300,
      'secret_data_exfil_2024',
      '{"host": "hack-lab-04.example.com", "username": "analyst", "password": "wireshark"}'
    );
  END IF;
END $$;