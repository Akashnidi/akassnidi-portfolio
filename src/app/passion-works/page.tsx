'use client';

import Card from '@/components/Card';
import { useEffect, useState } from 'react';
import { getPortfolioContent, PortfolioContent, Event } from '@/lib/data';

const PassionWorksPage: React.FC = () => {
  const [content, setContent] = useState<PortfolioContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const portfolioContent = await getPortfolioContent();
      setContent(portfolioContent);
    };
    fetchContent();
  }, []);

  if (!content) {
    return <div className="text-center text-gray-600">Loading passion works...</div>;
  }

  const { ongoingLearning, technicalEvents, softSkills, sideProjects } = content.passionWorks;

  return (
    <div className="space-y-10 py-8">
      {/* Ongoing Learning */}
      <section>
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6 text-center">Ongoing Learning</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ongoingLearning.map((item: string, index: number) => (
            <Card key={index}>
              <p className="text-gray-700 text-lg">{item}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Side Projects */}
      <section>
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6 text-center">Side Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sideProjects.map((project: string, index: number) => (
            <Card key={index}>
              <p className="text-gray-700 text-lg">{project}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Technical Events & Conferences */}
      <section>
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6 text-center">Technical Events & Conferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technicalEvents.map((event: Event, index: number) => (
            <Card key={index}>
              <h3 className="text-xl font-poppins font-semibold text-gray-800 mb-2">{event.name}</h3>
              <p className="text-gray-600 text-sm">{event.year}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Soft Skills */}
      <section>
        <h2 className="text-4xl font-poppins font-bold text-gray-900 mb-6 text-center">Soft Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {softSkills.map((skill: string, index: number) => (
            <Card key={index}>
              <p className="text-gray-700 text-lg">{skill}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PassionWorksPage;