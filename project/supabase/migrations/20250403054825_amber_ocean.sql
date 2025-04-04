/*
  # Add leaderboard seed data

  1. Changes
    - Create auth users using Supabase auth functions
    - Add profiles for sample users
    - Add user progress data for challenges
*/

-- Create sample users using Supabase auth functions
DO $$
DECLARE
  cyber_wizard_id uuid := '11111111-1111-4111-1111-111111111111';
  hack_master_id uuid := '22222222-2222-4222-2222-222222222222';
  code_hunter_id uuid := '33333333-3333-4333-3333-333333333333';
  security_pro_id uuid := '44444444-4444-4444-4444-444444444444';
  byte_bender_id uuid := '55555555-5555-4555-5555-555555555555';
BEGIN
  -- Insert users into auth.users
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role
  ) VALUES
    (
      cyber_wizard_id,
      '00000000-0000-0000-0000-000000000000',
      'cyberwizard@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      FALSE,
      'authenticated'
    ),
    (
      hack_master_id,
      '00000000-0000-0000-0000-000000000000',
      'hackmaster@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      FALSE,
      'authenticated'
    ),
    (
      code_hunter_id,
      '00000000-0000-0000-0000-000000000000',
      'codehunter@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      FALSE,
      'authenticated'
    ),
    (
      security_pro_id,
      '00000000-0000-0000-0000-000000000000',
      'securitypro@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      FALSE,
      'authenticated'
    ),
    (
      byte_bender_id,
      '00000000-0000-0000-0000-000000000000',
      'bytebender@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      NOW(),
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{}',
      FALSE,
      'authenticated'
    );

  -- Insert profiles for the sample users
  INSERT INTO profiles (id, username, avatar_url, created_at, updated_at)
  VALUES
    (cyber_wizard_id, 'CyberWizard', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop', NOW(), NOW()),
    (hack_master_id, 'HackMaster', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop', NOW(), NOW()),
    (code_hunter_id, 'CodeHunter', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop', NOW(), NOW()),
    (security_pro_id, 'SecurityPro', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop', NOW(), NOW()),
    (byte_bender_id, 'ByteBender', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop', NOW(), NOW());

  -- Insert user progress data
  INSERT INTO user_progress (user_id, challenge_id, completed, attempts, completed_at, created_at)
  SELECT
    p.id as user_id,
    c.id as challenge_id,
    -- Set most challenges as completed for sample data
    true as completed,
    -- Random number of attempts between 1 and 5
    floor(random() * 5 + 1)::int as attempts,
    -- Set completion dates within the last 30 days
    NOW() - (random() * interval '30 days') as completed_at,
    NOW() - (random() * interval '60 days') as created_at
  FROM profiles p
  CROSS JOIN challenges c
  WHERE p.username IN ('CyberWizard', 'HackMaster', 'CodeHunter', 'SecurityPro', 'ByteBender')
  -- Limit to a reasonable number of completed challenges per user
  AND random() < 0.7; -- 70% chance of completing each challenge
END $$;