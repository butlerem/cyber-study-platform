import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please click the "Connect to Supabase" button in the top right to set up your Supabase connection.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Function to update RLS policy for challenges
export const updateChallengePolicy = async () => {
  try {
    // Drop existing policy if it exists
    try {
      await supabase.rpc('drop_policy', {
        table_name: 'challenges',
        policy_name: 'Challenges are viewable by authenticated users'
      });
    } catch (error) {
      // Ignore error if policy doesn't exist
      console.log('No existing policy to drop');
    }

    // Create new policy allowing public access
    await supabase.rpc('create_policy', {
      table_name: 'challenges',
      policy_name: 'Challenges are publicly viewable',
      policy_definition: 'true',
      policy_operation: 'SELECT',
      policy_role: 'public'
    });

    // Check if we already have challenges
    const { data: existingChallenges, error: checkError } = await supabase
      .from('challenges')
      .select('id')
      .limit(1);

    if (checkError) throw checkError;

    // Only insert sample challenges if none exist
    if (!existingChallenges || existingChallenges.length === 0) {
      const { error: insertError } = await supabase.from('challenges').insert([
        {
          title: 'Web Security Fundamentals',
          description: 'Learn the basics of web application security through hands-on exercises.',
          content: `# Web Security Fundamentals\n\n## Introduction\nWeb security is essential for protecting modern applications from various attacks.\n\n## Topics Covered\n- HTTP Security Headers\n- Input Validation\n- Authentication Basics\n- Common Vulnerabilities\n\n## Your Challenge\nAnalyze the provided web application and identify security vulnerabilities.\n\nAccess the application at: http://{host}:8080\n\nFind and exploit the vulnerability to gain admin access.`,
          difficulty: 'Easy',
          points: 100,
          flag: 'web_security_master',
          server_credentials: { host: 'hack-lab-01.example.com', username: 'student', password: 'training' }
        },
        {
          title: 'SQL Injection Basics',
          description: 'Master the fundamentals of SQL injection and database security.',
          content: `# SQL Injection\n\n## Overview\nSQL injection is one of the most common web vulnerabilities.\n\n## Learning Objectives\n- Understanding SQL syntax\n- Common injection points\n- Prevention techniques\n\n## Challenge\nExploit the login form to bypass authentication.\n\nTarget URL: http://{host}:8080/login`,
          difficulty: 'Medium',
          points: 200,
          flag: 'sql_master_2024',
          server_credentials: { host: 'hack-lab-02.example.com', username: 'hacker', password: 'sqltraining' }
        },
        {
          title: 'Network Security Analysis',
          description: 'Learn network security analysis using professional tools.',
          content: `# Network Security\n\n## Introduction\nNetwork security analysis is crucial for identifying threats.\n\n## Tools\n- Wireshark\n- tcpdump\n- Network scanners\n\n## Challenge\nAnalyze the provided PCAP file to find the hidden message.`,
          difficulty: 'Hard',
          points: 300,
          flag: 'network_ninja_2024',
          server_credentials: { host: 'hack-lab-03.example.com', username: 'analyst', password: 'netanalysis' }
        }
      ]);

      if (insertError) throw insertError;
    }

    return true;
  } catch (error) {
    console.error('Error updating challenge policy:', error);
    return false;
  }
};