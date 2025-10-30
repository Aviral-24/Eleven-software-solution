
import React, { useState } from 'react';
import { Trash2, UserPlus, Users } from 'lucide-react';

const RegistrationsManager = ({ registrations, setRegistrations, courseOfferings, courses, courseTypes }) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [selectedOffering, setSelectedOffering] = useState('');
  const [filterType, setFilterType] = useState('');
  const [error, setError] = useState('');

  const addRegistration = () => {
    if (!studentName.trim() || !studentEmail.trim() || !selectedOffering) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
      setError('Please enter a valid email address');
      return;
    }
    setRegistrations([...registrations, {
      id: Date.now(),
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      offeringId: parseInt(selectedOffering),
      registeredAt: new Date().toLocaleDateString()
    }]);
    setStudentName('');
    setStudentEmail('');
    setSelectedOffering('');
    setError('');
  };

  const deleteRegistration = (id) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      setRegistrations(registrations.filter(r => r.id !== id));
    }
  };

  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown';
  const getTypeName = (id) => courseTypes.find(ct => ct.id === id)?.name || 'Unknown';

  const filteredOfferings = filterType
    ? courseOfferings.filter(co => co.courseTypeId === parseInt(filterType))
    : courseOfferings;

  const groupedRegistrations = courseOfferings.map(offering => ({
    offering,
    students: registrations.filter(r => r.offeringId === offering.id)
  })).filter(group => group.students.length > 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Register Student</h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student Email</label>
              <input
                type="email"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                placeholder="Enter student email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Course Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                {courseTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course Offering</label>
              <select
                value={selectedOffering}
                onChange={(e) => setSelectedOffering(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">Choose an offering...</option>
                {filteredOfferings.map(offering => (
                  <option key={offering.id} value={offering.id}>
                    {getTypeName(offering.courseTypeId)} - {getCourseName(offering.courseId)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={addRegistration}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={20} />
            Register Student
          </button>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Registered Students ({registrations.length})
        </h3>
        <div className="space-y-4">
          {groupedRegistrations.map(({ offering, students }) => (
            <div key={offering.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Users size={20} className="text-orange-600" />
                {getTypeName(offering.courseTypeId)} - {getCourseName(offering.courseId)}
                <span className="text-sm font-normal text-gray-600">({students.length} students)</span>
              </h4>
              <div className="space-y-2">
                {students.map(student => (
                  <div key={student.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{student.studentName}</p>
                      <p className="text-sm text-gray-600">{student.studentEmail}</p>
                      <p className="text-xs text-gray-500">Registered: {student.registeredAt}</p>
                    </div>
                    <button
                      onClick={() => deleteRegistration(student.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {groupedRegistrations.length === 0 && (
            <p className="text-gray-500 text-center py-8">No student registrations yet. Register students above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationsManager;