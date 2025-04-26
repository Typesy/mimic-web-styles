# OpenAI Integration Setup Instructions

## Setting Up Your OpenAI API Key in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/vifseoytrxxlkqyiwlvw
2. Navigate to "Edge Functions" in the sidebar
3. Click on the "generate-pickup-line" function
4. Click on "Secrets" in the function details
5. Add a new secret with:
   - Name: `OPENAI_API_KEY`
   - Value: `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`
6. Click "Save"

After setting the secret, your Edge Function will be able to access the OpenAI API.

## Testing Your Integration

Once your OpenAI API key is set up, you can test the integration by:

1. Running your application locally with `npm run dev`
2. Using the pickup line generator feature
3. Checking the console for any errors

## Troubleshooting

If you encounter any issues:

1. Verify the API key is correctly stored in Supabase
2. Check the Edge Function logs in Supabase dashboard
3. Ensure your Edge Function is deployed and active
4. Test with the mock generator to verify other components are working 