'use client';

import React, { useEffect, useState } from 'react';
import AvailabilityTable from '@/components/AvailabilityTable';
import { getAvailability, AvailabilityEntry } from '@/lib/availability';
import Card from '@/components/Card';

const AvailabilityPage: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailability = async () => {
      const data = await getAvailability();
      setAvailability(data);
      setLoading(false);
    };
    fetchAvailability();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading availability schedule...</div>;
  }

  return (
    <div className="py-8">
      <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-8 text-center">My Availability</h1>
      <Card className="max-w-4xl mx-auto">
        <AvailabilityTable availability={availability} />
      </Card>
    </div>
  );
};

export default AvailabilityPage;