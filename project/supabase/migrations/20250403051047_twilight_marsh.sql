/*
  # Initialize Challenge Data

  1. Changes
    - Create initial challenges with proper content
    - Ensure no duplicate entries
*/

DO $$
BEGIN
  -- Basic Web Security Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'Web Security Fundamentals') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'Web Security Fundamentals',
      'Learn the basics of web application security through hands-on exercises.',
      E'# Web Security Fundamentals\n\n## Introduction\nWeb security is essential for protecting modern applications from various attacks.\n\n## Topics Covered\n- HTTP Security Headers\n- Input Validation\n- Authentication Basics\n- Common Vulnerabilities\n\n## Your Challenge\nAnalyze the provided web application and identify security vulnerabilities.\n\nAccess the application at: http://{host}:8080\n\nFind and exploit the vulnerability to gain admin access.',
      'Easy',
      100,
      'web_security_master',
      '{"host": "hack-lab-01.example.com", "username": "student", "password": "training"}'
    );
  END IF;

  -- SQL Injection Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'SQL Injection Basics') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'SQL Injection Basics',
      'Master the fundamentals of SQL injection and database security.',
      E'# SQL Injection\n\n## Overview\nSQL injection is one of the most common web vulnerabilities.\n\n## Learning Objectives\n- Understanding SQL syntax\n- Common injection points\n- Prevention techniques\n\n## Challenge\nExploit the login form to bypass authentication.\n\nTarget URL: http://{host}:8080/login',
      'Medium',
      200,
      'sql_master_2024',
      '{"host": "hack-lab-02.example.com", "username": "hacker", "password": "sqltraining"}'
    );
  END IF;

  -- Network Security Challenge
  IF NOT EXISTS (SELECT 1 FROM challenges WHERE title = 'Network Security Analysis') THEN
    INSERT INTO challenges (
      title,
      description,
      content,
      difficulty,
      points,
      flag,
      server_credentials
    ) VALUES (
      'Network Security Analysis',
      'Learn network security analysis using professional tools.',
      E'# Network Security\n\n## Introduction\nNetwork security analysis is crucial for identifying threats.\n\n## Tools\n- Wireshark\n- tcpdump\n- Network scanners\n\n## Challenge\nAnalyze the provided PCAP file to find the hidden message.',
      'Hard',
      300,
      'network_ninja_2024',
      '{"host": "hack-lab-03.example.com", "username": "analyst", "password": "netanalysis"}'
    );
  END IF;
END $$;