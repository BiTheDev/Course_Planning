'use client';
import { useSearchParams } from 'next/navigation';
import { MajorProvider, useMajor } from '../../components/MajorProvider';
import majorData from '@/data/majordata';
import { useEffect } from 'react';
import MainLayout from '../MainLayout';
const MajorOverview = () => {
  const { setMajor } = useMajor();
  const searchParams= useSearchParams();
  const major = searchParams.get("major"); 

  // Find the major by ID
  const selectedMajor = majorData.find((m) => m.name === major);

  useEffect(() => {
    if (major) {
      setMajor(major);
    }
  }, [major, setMajor]);

  return (
    <MainLayout>
      <div>
        {selectedMajor ? (
          <h1>{`MajorOverview for ${selectedMajor.name}`}</h1>
        ) : (
          <p>Major not found.</p>
        )}
      </div>
    </MainLayout>
  );
};

export default MajorOverview;
