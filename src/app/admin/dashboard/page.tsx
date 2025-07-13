'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '@/lib/auth';
import AdminTabs from '@/components/AdminTabs';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import {
  getPortfolioContent,
  setPortfolioContent,
  PortfolioContent,
  WorkExperience,
  Skill,
  Certification,
  Tool,
  Award,
  Event,
} from '@/lib/data';
import { getAvailability, setAvailability, AvailabilityEntry } from '@/lib/availability';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Edit Home');
  const [portfolioContent, setPortfolioContentState] = useState<PortfolioContent | null>(null);
  const [availability, setAvailabilityState] = useState<AvailabilityEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const [editingAvailabilityIndex, setEditingAvailabilityIndex] = useState<number | null>(null);
  const [currentAvailabilityEntry, setCurrentAvailabilityEntry] = useState<AvailabilityEntry>({
    date: '', day: '', status: 'Available', fromTime: '', toTime: ''
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
    } else {
      const fetchData = async () => {
        const content = await getPortfolioContent();
        setPortfolioContentState(content);
        const avail = await getAvailability();
        setAvailabilityState(avail);
        setLoading(false);
      };
      fetchData();
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const handleContentChange = (section: keyof PortfolioContent, field: string, value: string | string[] | WorkExperience[] | Skill[] | Certification[] | Tool[] | Award[] | Event[]) => {
    if (portfolioContent) {
      setPortfolioContentState({
        ...portfolioContent,
        [section]: {
          ...portfolioContent[section],
          [field]: value,
        },
      });
    }
  };

  const handleSaveContent = async () => {
    if (portfolioContent) {
      await setPortfolioContent(portfolioContent);
      setModalTitle('Success');
      setModalMessage('Content saved successfully!');
      setShowModal(true);
    }
  };

  const handleAvailabilitySave = async () => {
    await setAvailability(availability);
    setModalTitle('Success');
    setModalMessage('Availability schedule updated successfully!');
    setShowModal(true);
    setEditingAvailabilityIndex(null);
    setCurrentAvailabilityEntry({ date: '', day: '', status: 'Available', fromTime: '', toTime: '' });
  };

  const handleAddAvailability = () => {
    setCurrentAvailabilityEntry({ date: '', day: '', status: 'Available', fromTime: '', toTime: '' });
    setEditingAvailabilityIndex(-1); // -1 indicates adding a new entry
    setModalTitle('Add Availability Entry');
    setShowModal(true);
  };

  const handleEditAvailability = (index: number) => {
    setEditingAvailabilityIndex(index);
    setCurrentAvailabilityEntry({ ...availability[index] });
    setModalTitle('Edit Availability Entry');
    setShowModal(true);
  };

  const handleDeleteAvailability = (index: number) => {
    if (window.confirm('Are you sure you want to delete this availability entry?')) {
      const updatedAvailability = availability.filter((_, i) => i !== index);
      setAvailabilityState(updatedAvailability);
      setAvailability(updatedAvailability); // Persist immediately
      setModalTitle('Deleted');
      setModalMessage('Availability entry deleted.');
      setShowModal(true);
    }
  };

  const handleAvailabilityFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentAvailabilityEntry(prev => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedAvailability = [...availability];
    if (editingAvailabilityIndex === -1) {
      // Add new
      updatedAvailability.push(currentAvailabilityEntry);
    } else if (editingAvailabilityIndex !== null) {
      // Edit existing
      updatedAvailability[editingAvailabilityIndex] = currentAvailabilityEntry;
    }
    setAvailabilityState(updatedAvailability);
    setAvailability(updatedAvailability); // Persist immediately
    setShowModal(false);
    setModalTitle('Success');
    setModalMessage('Availability entry saved.');
    setShowModal(true);
    setEditingAvailabilityIndex(null);
    setCurrentAvailabilityEntry({ date: '', day: '', status: 'Available', fromTime: '', toTime: '' });
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading admin dashboard...</div>;
  }

  if (!portfolioContent) {
    return <div className="text-center text-red-600">Error loading content. Please try again.</div>;
  }

  const renderHomeEditor = () => (
    <div className="space-y-4">
      <label htmlFor="homeSummary" className="block text-gray-700 text-sm font-bold mb-2">
        Professional Summary:
      </label>
      <textarea
        id="homeSummary"
        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200 h-48"
        value={portfolioContent.home.summary}
        onChange={(e) => handleContentChange('home', 'summary', e.target.value)}
      ></textarea>
      <button
        onClick={handleSaveContent}
        className="bg-earth-green hover:bg-earth-brown text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Save Home Content
      </button>
    </div>
  );

  const renderCareerEditor = () => (
    <div className="space-y-6">
      {/* Work Experience */}
      <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Work Experience</h3>
      {portfolioContent.career.workExperience.map((exp, index) => (
        <div key={index} className="border border-gray-200 p-4 rounded-lg mb-4 bg-gray-50">
          <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-2"
            value={exp.title}
            onChange={(e) => {
              const updatedExp = [...portfolioContent.career.workExperience];
              updatedExp[index] = { ...exp, title: e.target.value };
              handleContentChange('career', 'workExperience', updatedExp);
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Company:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-2"
            value={exp.company}
            onChange={(e) => {
              const updatedExp = [...portfolioContent.career.workExperience];
              updatedExp[index] = { ...exp, company: e.target.value };
              handleContentChange('career', 'workExperience', updatedExp);
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Duration:</label>
          <input
            type="text"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-2"
            value={exp.duration}
            onChange={(e) => {
              const updatedExp = [...portfolioContent.career.workExperience];
              updatedExp[index] = { ...exp, duration: e.target.value };
              handleContentChange('career', 'workExperience', updatedExp);
            }}
          />
          <label className="block text-gray-700 text-sm font-bold mb-2">Description (one per line):</label>
          <textarea
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 h-32"
            value={exp.description.join('\n')}
            onChange={(e) => {
              const updatedExp = [...portfolioContent.career.workExperience];
              updatedExp[index] = { ...exp, description: e.target.value.split('\n') };
              handleContentChange('career', 'workExperience', updatedExp);
            }}
          ></textarea>
        </div>
      ))}
      {/* Add more sections for skills, certifications, tools, awards similarly */}
      <button
        onClick={handleSaveContent}
        className="bg-earth-green hover:bg-earth-brown text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Save Career Content
      </button>
    </div>
  );

  const renderPassionWorksEditor = () => (
    <div className="space-y-6">
      {/* Ongoing Learning */}
      <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Ongoing Learning (one per line)</h3>
      <textarea
        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200 h-48"
        value={portfolioContent.passionWorks.ongoingLearning.join('\n')}
        onChange={(e) => handleContentChange('passionWorks', 'ongoingLearning', e.target.value.split('\n'))}
      ></textarea>

      {/* Side Projects */}
      <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Side Projects (one per line)</h3>
      <textarea
        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200 h-48"
        value={portfolioContent.passionWorks.sideProjects.join('\n')}
        onChange={(e) => handleContentChange('passionWorks', 'sideProjects', e.target.value.split('\n'))}
      ></textarea>

      {/* Technical Events */}
      <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Technical Events & Conferences (Name | Year, one per line)</h3>
      <textarea
        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200 h-48"
        value={portfolioContent.passionWorks.technicalEvents.map(e => `${e.name} | ${e.year}`).join('\n')}
        onChange={(e) => {
          const events = e.target.value.split('\n').map(line => {
            const parts = line.split(' | ');
            return { name: parts[0] || '', year: parts[1] || '' };
          });
          handleContentChange('passionWorks', 'technicalEvents', events);
        }}
      ></textarea>

      {/* Soft Skills */}
      <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Soft Skills (one per line)</h3>
      <textarea
        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pastel-blue focus:border-transparent transition-all duration-200 h-48"
        value={portfolioContent.passionWorks.softSkills.join('\n')}
        onChange={(e) => handleContentChange('passionWorks', 'softSkills', e.target.value.split('\n'))}
      ></textarea>

      <button
        onClick={handleSaveContent}
        className="bg-earth-green hover:bg-earth-brown text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
      >
        Save Passion Works Content
      </button>
    </div>
  );

  const renderAvailabilityEditor = () => (
    <div className="space-y-6">
      <button
        onClick={handleAddAvailability}
        className="bg-pastel-blue hover:bg-blue-400 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md mb-4"
      >
        Add New Availability
      </button>
      <Card>
        <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-3">Current Availability Schedule</h3>
        <AvailabilityTable
          availability={availability}
          isAdmin={true}
          onEdit={handleEditAvailability}
          onDelete={handleDeleteAvailability}
        />
      </Card>

      {showModal && (editingAvailabilityIndex !== null) && (
        <Modal
          isOpen={showModal && (editingAvailabilityIndex !== null)}
          onClose={() => {
            setShowModal(false);
            setEditingAvailabilityIndex(null);
            setCurrentAvailabilityEntry({ date: '', day: '', status: 'Available', fromTime: '', toTime: '' });
          }}
          title={modalTitle}
          footer={
            <>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingAvailabilityIndex(null);
                  setCurrentAvailabilityEntry({ date: '', day: '', status: 'Available', fromTime: '', toTime: '' });
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAvailabilityFormSubmit}
                className="bg-earth-green hover:bg-earth-brown text-white font-bold py-2 px-4 rounded-full transition-all duration-300"
              >
                Save Entry
              </button>
            </>
          }
        >
          <form onSubmit={handleAvailabilityFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date (e.g., 13-Jul-25):</label>
              <input
                type="text"
                id="date"
                name="date"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                value={currentAvailabilityEntry.date}
                onChange={handleAvailabilityFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="day" className="block text-gray-700 text-sm font-bold mb-2">Day:</label>
              <input
                type="text"
                id="day"
                name="day"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                value={currentAvailabilityEntry.day}
                onChange={handleAvailabilityFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="status" className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
              <select
                id="status"
                name="status"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                value={currentAvailabilityEntry.status}
                onChange={handleAvailabilityFormChange}
                required
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
              </select>
            </div>
            <div>
              <label htmlFor="fromTime" className="block text-gray-700 text-sm font-bold mb-2">From Time (e.g., 05:30 PM):</label>
              <input
                type="text"
                id="fromTime"
                name="fromTime"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                value={currentAvailabilityEntry.fromTime}
                onChange={handleAvailabilityFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="toTime" className="block text-gray-700 text-sm font-bold mb-2">To Time (e.g., 06:30 PM):</label>
              <input
                type="text"
                id="toTime"
                name="toTime"
                className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700"
                value={currentAvailabilityEntry.toTime}
                onChange={handleAvailabilityFormChange}
                required
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );

  return (
    <div className="py-8">
      <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-8 text-center">Admin Dashboard</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          Logout
        </button>
      </div>

      <Card className="max-w-6xl mx-auto p-6">
        <AdminTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={['Edit Home', 'Edit Career', 'Edit Passion Works', 'Edit Availability']}
        />

        <div className="mt-8">
          {activeTab === 'Edit Home' && renderHomeEditor()}
          {activeTab === 'Edit Career' && renderCareerEditor()}
          {activeTab === 'Edit Passion Works' && renderPassionWorksEditor()}
          {activeTab === 'Edit Availability' && renderAvailabilityEditor()}
        </div>
      </Card>

      <Modal
        isOpen={showModal && editingAvailabilityIndex === null} // Only show general success/error modal
        onClose={() => setShowModal(false)}
        title={modalTitle}
      >
        <p className="text-gray-700">{modalMessage}</p>
      </Modal>
    </div>
  );
};

export default AdminDashboard;