
import { useState } from 'react';
import { Image, Upload, Copy } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const ImageCaption = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
      
      // Reset captions when new image is selected
      setCaptions([]);
    }
  };

  const handleGenerateCaptions = () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock captions based on file name
      const fileName = selectedFile.name.split('.')[0];
      const mockCaptions = generateMockCaptions(fileName);
      setCaptions(mockCaptions);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopyToClipboard = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied to clipboard",
      description: "Caption copied to clipboard successfully",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Image Caption Generator</h1>
        <div className="bg-card p-8 rounded-lg">
          <p className="text-gray-300 mb-8">Generate creative captions for your images using AI</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-200">
                Upload an image
              </label>
              <div className="flex flex-col gap-4">
                <label 
                  className="border-2 border-dashed border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-gray-500 transition-colors"
                >
                  <Upload size={24} className="mb-2 text-gray-400" />
                  <span className="text-sm text-gray-400">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG or WEBP (max 5MB)</span>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleFileChange}
                  />
                </label>
                
                {previewUrl && (
                  <div className="relative mt-4 max-w-md mx-auto">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
                
                <Button 
                  onClick={handleGenerateCaptions} 
                  disabled={!selectedFile || isGenerating}
                  className="gap-2"
                >
                  <Image size={16} />
                  {isGenerating ? 'Generating...' : 'Generate Captions'}
                </Button>
              </div>
            </div>
            
            {captions.length > 0 && (
              <>
                <Separator />
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Image className="text-accent" size={20} />
                    Generated Captions
                  </h2>
                  <ScrollArea className="h-64 rounded-md border p-4">
                    <div className="space-y-4">
                      {captions.map((caption, index) => (
                        <div key={index} className="bg-primary/20 p-4 rounded-md relative group">
                          <p className="text-gray-200">{caption}</p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleCopyToClipboard(caption)}
                          >
                            <Copy size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Mock function to generate captions
function generateMockCaptions(imageName: string): string[] {
  const theme = imageName.toLowerCase();
  
  return [
    `Capturing moments with ${theme} that'll last a lifetime ✨`,
    `Life is better with ${theme} in the frame 📸`,
    `Finding beauty in the everyday ${theme} moments 🌟`,
    `${theme.charAt(0).toUpperCase() + theme.slice(1)} vibes only today 💯`,
    `When ${theme} speaks louder than words ever could 🙌`
  ];
}

export default ImageCaption;
