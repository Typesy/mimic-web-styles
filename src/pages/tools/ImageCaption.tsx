
import Layout from '@/components/Layout';

const ImageCaption = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Image Caption Generator</h1>
        <div className="bg-card p-8 rounded-lg">
          <p className="text-gray-300 mb-8">Generate creative captions for your images using AI</p>
          {/* Tool content will go here */}
        </div>
      </div>
    </Layout>
  );
};

export default ImageCaption;
