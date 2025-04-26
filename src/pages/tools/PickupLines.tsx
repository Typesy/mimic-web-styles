
import { useState } from 'react';
import { Heart, Send, Copy } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

type PickupLineStyle = 'smooth' | 'funny' | 'savage';

const PickupLines = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<PickupLineStyle>('smooth');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [pickupLines, setPickupLines] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGeneratePickupLines = () => {
    if (!prompt.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a topic or interest first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedLines = generateMockPickupLines(style, prompt);
      setPickupLines(generatedLines);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopyToClipboard = (line: string) => {
    navigator.clipboard.writeText(line);
    toast({
      title: "Copied to clipboard",
      description: "Pickup line copied to clipboard successfully",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Pickup Line Generator</h1>
        <div className="bg-card p-8 rounded-lg">
          <p className="text-gray-300 mb-8">Create smooth, funny, or savage pickup lines with AI</p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium mb-2 text-gray-200">
                Topic or interest
              </label>
              <div className="flex gap-2">
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="coffee, travel, music, etc."
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
                />
                <Button 
                  onClick={handleGeneratePickupLines} 
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
                value={style} 
                onValueChange={(value) => setStyle(value as PickupLineStyle)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="smooth" id="smooth" />
                  <label htmlFor="smooth" className="text-sm text-gray-300">Smooth</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="funny" id="funny" />
                  <label htmlFor="funny" className="text-sm text-gray-300">Funny</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="savage" id="savage" />
                  <label htmlFor="savage" className="text-sm text-gray-300">Savage</label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {pickupLines.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Heart className="text-accent" size={20} />
                  Generated Pickup Lines
                </h2>
                <ScrollArea className="h-80 rounded-md border p-4">
                  <div className="space-y-4">
                    {pickupLines.map((line, index) => (
                      <div key={index} className="bg-primary/20 p-4 rounded-md relative group">
                        <p className="text-gray-200">{line}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopyToClipboard(line)}
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Mock function to generate pickup lines
function generateMockPickupLines(style: PickupLineStyle, topic: string): string[] {
  const lines: Record<PickupLineStyle, string[]> = {
    smooth: [
      `Are you ${topic}? Because you've been running through my mind all day.`,
      `If ${topic} was a person, it still wouldn't be as beautiful as you.`,
      `Is your name ${topic}? Because you're everything I've been searching for.`,
      `I was going to talk about ${topic}, but I got lost in your eyes instead.`,
      `They say ${topic} is the key to happiness, but I think it's your smile.`
    ],
    funny: [
      `Are you ${topic}? Because you've turned my life into a joke, but in a good way!`,
      `I'm no expert in ${topic}, but I'm an expert in knowing when I've met someone special.`,
      `If ${topic} was funny, it still wouldn't make me laugh as much as you do.`,
      `I was going to make a ${topic} joke, but I'd rather just make you smile.`,
      `They say ${topic} is good for you, but your number would be even better for me.`
    ],
    savage: [
      `If ${topic} was a person, they'd still be less interesting than me.`,
      `I usually don't go for people who like ${topic}, but I'll make an exception for you.`,
      `Let me guess, ${topic} is your personality? Well, at least you have me now.`,
      `Is ${topic} your best quality? Don't worry, I can work with that.`,
      `They say ${topic} attracts all kinds of people, even ones like you.`
    ]
  };

  return lines[style];
}

export default PickupLines;
