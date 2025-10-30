 import React, { useState } from 'react';
import { Layers, BookOpen, Plus, UserPlus } from 'lucide-react';
import CourseTypesManager from './components/CourseTypesManager';
import CoursesManager from './components/CoursesManager';
import CourseOfferingsManager from './components/CourseOfferingsManager';
import RegistrationsManager from './components/RegistrationsManager';

const App = () => {
  const [activeTab, setActiveTab] = useState('courseTypes');
  const [courseTypes, setCourseTypes] = useState([
    { id: 1, name: 'Individual' },
    { id: 2, name: 'Group' },
    { id: 3, name: 'Special' }
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Hindi' },
    { id: 2, name: 'English' },
    { id: 3, name: 'Urdu' }
  ]);
  const [courseOfferings, setCourseOfferings] = useState([
    { id: 1, courseId: 2, courseTypeId: 1 },
    { id: 2, courseId: 1, courseTypeId: 2 }
  ]);
  const [registrations, setRegistrations] = useState([]);

  const tabs = [
    { id: 'courseTypes', label: 'Course Types', icon: Layers },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'courseOfferings', label: 'Course Offerings', icon: Plus },
    { id: 'registrations', label: 'Registrations', icon: UserPlus }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">Student Registration System</h1>
          <p className="text-gray-600">Manage courses, types, offerings, and student registrations</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white border-b-4 border-indigo-800'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {activeTab === 'courseTypes' && (
              <CourseTypesManager courseTypes={courseTypes} setCourseTypes={setCourseTypes} />
            )}
            {activeTab === 'courses' && (
              <CoursesManager courses={courses} setCourses={setCourses} />
            )}
            {activeTab === 'courseOfferings' && (
              <CourseOfferingsManager
                courseOfferings={courseOfferings}
                setCourseOfferings={setCourseOfferings}
                courses={courses}
                courseTypes={courseTypes}
              />
            )}
            {activeTab === 'registrations' && (
              <RegistrationsManager
                registrations={registrations}
                setRegistrations={setRegistrations}
                courseOfferings={courseOfferings}
                courses={courses}
                courseTypes={courseTypes}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;