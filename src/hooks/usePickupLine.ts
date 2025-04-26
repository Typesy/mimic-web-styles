import { useState } from 'react';
import { PickupLineStyle, generatePickupLine, generateMockPickupLine } from '../lib/api';

interface UsePickupLineProps {
  useMock?: boolean;
}

interface UsePickupLineReturn {
  loading: boolean;
  error: string | null;
  pickupLine: string | null;
  generateLine: (style: PickupLineStyle, topic?: string) => Promise<void>;
  reset: () => void;
}

/**
 * Custom hook for generating pickup lines
 * @param props Configuration options
 * @returns Pickup line state and functions
 */
export function usePickupLine({ useMock = false }: UsePickupLineProps = {}): UsePickupLineReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pickupLine, setPickupLine] = useState<string | null>(null);

  /**
   * Generates a pickup line based on style and optional topic
   * @param style The style of pickup line to generate
   * @param topic Optional topic for the pickup line
   */
  const generateLine = async (style: PickupLineStyle, topic?: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // Use mock or real API based on the useMock flag
      if (useMock) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        const line = generateMockPickupLine(style, topic);
        setPickupLine(line);
      } else {
        const line = await generatePickupLine(style, topic);
        setPickupLine(line);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate pickup line');
      // Fallback to mock if real API fails
      if (!useMock) {
        try {
          const line = generateMockPickupLine(style, topic);
          setPickupLine(line);
        } catch (mockErr) {
          console.error('Even mock generation failed:', mockErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resets the pickup line state
   */
  const reset = () => {
    setPickupLine(null);
    setError(null);
  };

  return {
    loading,
    error,
    pickupLine,
    generateLine,
    reset
  };
} 