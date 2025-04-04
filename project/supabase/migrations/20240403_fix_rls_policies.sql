-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Challenges are viewable by authenticated users" ON "public"."challenges";
DROP POLICY IF EXISTS "Challenges are publicly viewable" ON "public"."challenges";
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."challenges";

-- Enable RLS on the challenges table
ALTER TABLE "public"."challenges" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view challenges
CREATE POLICY "Challenges are publicly viewable"
ON "public"."challenges"
FOR SELECT
TO public
USING (true);

-- Create policy to allow authenticated users to insert challenges
CREATE POLICY "Enable insert for authenticated users only"
ON "public"."challenges"
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to update their own challenges
CREATE POLICY "Enable update for authenticated users only"
ON "public"."challenges"
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own challenges
CREATE POLICY "Enable delete for authenticated users only"
ON "public"."challenges"
FOR DELETE
TO authenticated
USING (true);

-- Insert sample challenges if they don't exist
INSERT INTO "public"."challenges" ("title", "description", "content", "difficulty", "points", "flag", "server_credentials")
SELECT 
  'Web Security Fundamentals',
  'Learn the basics of web application security through hands-on exercises.',
  '# Web Security Fundamentals\n\n## Introduction\nWeb security is essential for protecting modern applications from various attacks.\n\n## Topics Covered\n- HTTP Security Headers\n- Input Validation\n- Authentication Basics\n- Common Vulnerabilities\n\n## Your Challenge\nAnalyze the provided web application and identify security vulnerabilities.\n\nAccess the application at: http://{host}:8080\n\nFind and exploit the vulnerability to gain admin access.',
  'Easy',
  100,
  'web_security_master',
  '{"host": "hack-lab-01.example.com", "username": "student", "password": "training"}'
WHERE NOT EXISTS (SELECT 1 FROM "public"."challenges" WHERE "title" = 'Web Security Fundamentals');

INSERT INTO "public"."challenges" ("title", "description", "content", "difficulty", "points", "flag", "server_credentials")
SELECT 
  'SQL Injection Basics',
  'Master the fundamentals of SQL injection and database security.',
  '# SQL Injection\n\n## Overview\nSQL injection is one of the most common web vulnerabilities.\n\n## Learning Objectives\n- Understanding SQL syntax\n- Common injection points\n- Prevention techniques\n\n## Challenge\nExploit the login form to bypass authentication.\n\nTarget URL: http://{host}:8080/login',
  'Medium',
  200,
  'sql_master_2024',
  '{"host": "hack-lab-02.example.com", "username": "hacker", "password": "sqltraining"}'
WHERE NOT EXISTS (SELECT 1 FROM "public"."challenges" WHERE "title" = 'SQL Injection Basics');

INSERT INTO "public"."challenges" ("title", "description", "content", "difficulty", "points", "flag", "server_credentials")
SELECT 
  'Network Security Analysis',
  'Learn network security analysis using professional tools.',
  '# Network Security\n\n## Introduction\nNetwork security analysis is crucial for identifying threats.\n\n## Tools\n- Wireshark\n- tcpdump\n- Network scanners\n\n## Challenge\nAnalyze the provided PCAP file to find the hidden message.',
  'Hard',
  300,
  'network_ninja_2024',
  '{"host": "hack-lab-03.example.com", "username": "analyst", "password": "netanalysis"}'
WHERE NOT EXISTS (SELECT 1 FROM "public"."challenges" WHERE "title" = 'Network Security Analysis'); 