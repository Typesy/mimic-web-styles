
import { Image, Palette, Heart } from 'lucide-react';
import Layout from '@/components/Layout';
import ToolCard from '@/components/ToolCard';

const tools = [
  {
    title: 'Image Caption Generator',
    description: 'Generate creative captions for your images using AI',
    icon: <Image className="w-8 h-8 text-accent" />,
    to: '/tools/image-caption',
  },
  {
    title: 'Pickup Line Generator',
    description: 'Create smooth, funny, or savage pickup lines with AI',
    icon: <Heart className="w-8 h-8 text-accent" />,
    to: '/tools/pickup-lines',
  },
  {
    title: 'Mood Board Generator',
    description: 'Design creative AI-generated mood boards based on your idea',
    icon: <Palette className="w-8 h-8 text-accent" />,
    to: '/tools/mood-board',
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Toolbox
          </h1>
          <p className="text-xl text-gray-300">
            Explore our collection of powerful AI tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.title} {...tool} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
