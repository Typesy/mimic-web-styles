
import Layout from '@/components/Layout';

const MoodBoard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Mood Board Generator</h1>
        <div className="bg-card p-8 rounded-lg">
          <p className="text-gray-300 mb-8">Design creative AI-generated mood boards based on your idea</p>
          {/* Tool content will go here */}
        </div>
      </div>
    </Layout>
  );
};

export default MoodBoard;
