// Script to set Supabase Edge Function secrets
const fs = require('fs');
const https = require('https');

// Configuration
const config = {
  supabaseProjectId: 'vifseoytrxxlkqyiwlvw',
  apiKey: process.env.SUPABASE_API_KEY // You'll need to provide your Supabase API key
};

// OpenAI API key to set as a secret
const openaiApiKey = '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';

// Create the payload for the secrets API
const payload = {
  name: 'OPENAI_API_KEY',
  value: openaiApiKey
};

// Instructions for the user
console.log('\n===== IMPORTANT INSTRUCTIONS =====');
console.log('To set the OpenAI API key as a secret in your Supabase project:');
console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/vifseoytrxxlkqyiwlvw');
console.log('2. Navigate to "Edge Functions" in the sidebar');
console.log('3. Click on the "generate-pickup-line" function');
console.log('4. Click on "Secrets" in the function details');
console.log('5. Add a new secret with:');
console.log('   - Name: OPENAI_API_KEY');
console.log('   - Value: ' + openaiApiKey);
console.log('6. Click "Save"');
console.log('\nAfter setting the secret, your Edge Function will be able to access the OpenAI API.');
console.log('=====================\n');

// Alternative command-line approach
console.log('Alternatively, if you have the Supabase CLI installed, you can run:');
console.log('supabase secrets set OPENAI_API_KEY="' + openaiApiKey + '" --project-ref ' + config.supabaseProjectId);
console.log('=====================\n'); 