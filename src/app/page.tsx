'use client';

import Image from 'next/image';
import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { getPortfolioContent, PortfolioContent } from '@/lib/data';

const HomePage: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const portfolioContent = await getPortfolioContent();
      setContent(portfolioContent);
    };
    fetchContent();
  }, []);

  if (!content) {
    return <div className="text-center text-gray-600">Loading your portfolio...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-10 py-12">
      <Card className="flex-shrink-0 w-full max-w-sm lg:max-w-xs text-center">
        <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-md border-4 border-pastel-blue">
          <Image
            src="/akassnidi.jpg" // Placeholder image
            alt="Akassnidi Karunanithi"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/192x192/D2B48C/FFFFFF?text=AK`; // Fallback placeholder
              e.currentTarget.srcset = '';
            }}
          />
        </div>
        <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-2">Akassnidi Karunanithi</h1>
        <p className="text-gray-600 text-lg font-medium">Senior System Engineer</p>
        <div className="mt-6 text-left">
          <p className="text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-earth-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
            Coimbatore, Tamil Nadu
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-earth-green" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
            akashnidiofficial@gmail.com
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-earth-green" fill="currentColor" viewBox="0 0 20 20"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"></path></svg>
            6381712480
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-earth-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16 4H4a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2zm-4.5 4.5a.5.5 0 00-1 0v3a.5.5 0 001 0V8.5zm2 0a.5.5 0 00-1 0v3a.5.5 0 001 0V8.5zm-4 0a.5.5 0 00-1 0v3a.5.5 0 001 0V8.5z" clipRule="evenodd"></path></svg>
            <a href="[https://linkedin.com/in/akassnidi-karunanithi-123617202/](https://linkedin.com/in/akassnidi-karunanithi-123617202/)" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>
          </p>
          <p className="text-gray-700 flex items-center">
            <svg className="w-5 h-5 mr-2 text-earth-green" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9a1 1 0 102 0V7a1 1 0 10-2 0v2zm0 4a1 1 0 102 0 1 1 0 00-2 0z" clipRule="evenodd"></path></svg>
            <a href="[https://Credly.com/user/akassnidi-karunanithi](https://Credly.com/user/akassnidi-karunanithi)" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Credly</a>
          </p>
        </div>
      </Card>

      <Card className="flex-1 w-full lg:max-w-2xl">
        <h2 className="text-3xl font-poppins font-bold text-gray-900 mb-4">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {content.home.summary}
        </p>
      </Card>
    </div>
  );
};

export default HomePage;