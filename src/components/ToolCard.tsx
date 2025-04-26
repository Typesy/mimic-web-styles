
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const ToolCard = ({ title, description, icon, to }: ToolCardProps) => {
  return (
    <Link to={to}>
      <Card className="p-6 bg-card hover:animate-card-hover transition-all duration-200 h-full">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
      </Card>
    </Link>
  );
};

export default ToolCard;
