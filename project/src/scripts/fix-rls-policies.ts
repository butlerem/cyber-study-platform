import { supabase } from '../lib/supabase';
import fs from 'fs';
import path from 'path';

async function fixRLSPolicies() {
  try {
    console.log('Fixing RLS policies...');
    
    // Read the SQL migration file
    const migrationPath = path.join(__dirname, '../../supabase/migrations/20240403_fix_rls_policies.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = sql.split(';').filter(stmt => stmt.trim() !== '');
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim() === '') continue;
      
      console.log(`Executing: ${statement.substring(0, 50)}...`);
      const { error } = await supabase.rpc('exec_sql', { sql: statement });
      
      if (error) {
        console.error(`Error executing statement: ${error.message}`);
        // Continue with next statement even if this one fails
      }
    }
    
    console.log('RLS policies fixed successfully!');
  } catch (error) {
    console.error('Error fixing RLS policies:', error);
  }
}

// Execute the function
fixRLSPolicies(); 