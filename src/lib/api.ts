// API helper functions for the pickup line generator

// Supabase project URL
const SUPABASE_URL = 'https://vifseoytrxxlkqyiwlvw.supabase.co';

// Available styles for pickup lines
export type PickupLineStyle = 'smooth' | 'funny' | 'savage';

// Request interface for generating pickup lines
export interface GeneratePickupLineRequest {
  style: PickupLineStyle;
  topic?: string;
}

// Response interface for pickup line generation
export interface GeneratePickupLineResponse {
  pickupLine: string;
}

// Error response interface
export interface ErrorResponse {
  error: string;
}

/**
 * Generates a pickup line using the OpenAI API via Supabase Edge Function
 * @param style The style of pickup line to generate
 * @param topic Optional topic for the pickup line
 * @returns The generated pickup line or an error
 */
export async function generatePickupLine(
  style: PickupLineStyle,
  topic?: string
): Promise<string> {
  try {
    // Validate the style
    if (!['smooth', 'funny', 'savage'].includes(style)) {
      throw new Error('Invalid style parameter');
    }
    
    // Create the request payload
    const payload: GeneratePickupLineRequest = {
      style,
      ...(topic && { topic })
    };
    
    // Call the Supabase Edge Function
    const response = await fetch(
      `${SUPABASE_URL}/functions/v1/generate-pickup-line`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );
    
    // Handle non-successful responses
    if (!response.ok) {
      const errorData = await response.json() as ErrorResponse;
      throw new Error(errorData.error || 'Failed to generate pickup line');
    }
    
    // Parse the response
    const data = await response.json() as GeneratePickupLineResponse;
    
    // Return the pickup line
    return data.pickupLine;
  } catch (error) {
    // Log the error and rethrow
    console.error('Error generating pickup line:', error);
    throw error;
  }
}

/**
 * Mock function for generating pickup lines (fallback when API is unavailable)
 * @param style The style of pickup line to generate
 * @param topic Optional topic for the pickup line
 * @returns A predefined pickup line based on the style
 */
export function generateMockPickupLine(
  style: PickupLineStyle,
  topic?: string
): string {
  // Sample pickup lines for each style
  const pickupLines = {
    smooth: [
      "Are you a magician? Because whenever I look at you, everyone else disappears.",
      "Is your name Google? Because you have everything I've been searching for.",
      "Do you have a map? I keep getting lost in your eyes."
    ],
    funny: [
      "Are you made of copper and tellurium? Because you're Cu-Te.",
      "Are you a parking ticket? Because you've got FINE written all over you.",
      "Do you like raisins? How about a date?"
    ],
    savage: [
      "Do you have a name, or can I call you mine?",
      "I must be a snowflake, because I've fallen for you.",
      "Is your dad a boxer? Because you're a knockout!"
    ],
  };
  
  // Get a random pickup line from the selected style
  const lines = pickupLines[style];
  const randomIndex = Math.floor(Math.random() * lines.length);
  
  // Add the topic if provided
  if (topic) {
    return `About ${topic}: ${lines[randomIndex]}`;
  }
  
  return lines[randomIndex];
} 