
import { useState } from 'react';
import { Palette, Send, Download } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';

type MoodTheme = 'vibrant' | 'minimal' | 'retro';

const MoodBoard = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [theme, setTheme] = useState<MoodTheme>('vibrant');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [moodboardImages, setMoodboardImages] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGenerateMoodboard = () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a concept or theme first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const images = generateMockMoodboardImages(theme);
      setMoodboardImages(images);
      setIsGenerating(false);
    }, 2000);
  };

  const handleDownload = () => {
    // In a real app, this would create a ZIP or PDF of the mood board
    toast({
      title: "Download started",
      description: "Your mood board is being prepared for download",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Mood Board Generator</h1>
        <div className="bg-card p-8 rounded-lg">
          <p className="text-gray-300 mb-8">Design creative AI-generated mood boards based on your idea</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-gray-200">
                Concept or theme
              </label>
              <div className="flex gap-2">
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="summer vacation, urban fashion, etc."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                />
                <Button 
                  onClick={handleGenerateMoodboard} 
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <Send size={16} />
                  {isGenerating ? 'Generating...' : 'Generate'}
                </Button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-200">
                Style
              </label>
              <RadioGroup 
                value={theme} 
                onValueChange={(value) => setTheme(value as MoodTheme)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vibrant" id="vibrant" />
                  <label htmlFor="vibrant" className="text-sm text-gray-300">Vibrant</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="minimal" id="minimal" />
                  <label htmlFor="minimal" className="text-sm text-gray-300">Minimal</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retro" id="retro" />
                  <label htmlFor="retro" className="text-sm text-gray-300">Retro</label>
                </div>
              </RadioGroup>
            </div>
            
            {moodboardImages.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Palette className="text-accent" size={20} />
                      Your Mood Board
                    </h2>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleDownload}>
                      <Download size={16} />
                      Download
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {moodboardImages.map((src, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={src}
                          alt={`Mood board item ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Mock function to generate mood board images
function generateMockMoodboardImages(theme: MoodTheme): string[] {
  // For demo purposes, we'll use placeholder colors
  // In a real app, this would connect to an image generation API
  
  const colors: Record<MoodTheme, string[]> = {
    vibrant: ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF3'],
    minimal: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161'],
    retro: ['#E8D0A9', '#B68973', '#772F1A', '#F1AB86', '#C57B57', '#1E2D2F']
  };
  
  // Generate placeholder images with the theme colors
  return colors[theme].map((color) => 
    `https://via.placeholder.com/300/${color.substring(1)}`
  );
}

export default MoodBoard;
