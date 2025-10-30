import React, { useState } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

const CourseOfferingsManager = ({ courseOfferings, setCourseOfferings, courses, courseTypes }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editCourse, setEditCourse] = useState('');
  const [editType, setEditType] = useState('');
  const [error, setError] = useState('');

  const addOffering = () => {
    if (!selectedCourse || !selectedType) {
      setError('Please select both course and course type');
      return;
    }
    const exists = courseOfferings.some(
      co => co.courseId === parseInt(selectedCourse) && co.courseTypeId === parseInt(selectedType)
    );
    if (exists) {
      setError('This course offering already exists');
      return;
    }
    setCourseOfferings([...courseOfferings, {
      id: Date.now(),
      courseId: parseInt(selectedCourse),
      courseTypeId: parseInt(selectedType)
    }]);
    setSelectedCourse('');
    setSelectedType('');
    setError('');
  };

  const startEdit = (offering) => {
    setEditingId(offering.id);
    setEditCourse(offering.courseId.toString());
    setEditType(offering.courseTypeId.toString());
    setError('');
  };

  const saveEdit = () => {
    if (!editCourse || !editType) {
      setError('Please select both course and course type');
      return;
    }
    const exists = courseOfferings.some(
      co => co.id !== editingId && co.courseId === parseInt(editCourse) && co.courseTypeId === parseInt(editType)
    );
    if (exists) {
      setError('This course offering already exists');
      return;
    }
    setCourseOfferings(courseOfferings.map(co =>
      co.id === editingId ? { ...co, courseId: parseInt(editCourse), courseTypeId: parseInt(editType) } : co
    ));
    setEditingId(null);
    setError('');
  };

  const deleteOffering = (id) => {
    if (window.confirm('Are you sure you want to delete this course offering?')) {
      setCourseOfferings(courseOfferings.filter(co => co.id !== id));
    }
  };

  const getCourseName = (id) => courses.find(c => c.id === id)?.name || 'Unknown';
  const getTypeName = (id) => courseTypes.find(ct => ct.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Course Offering</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Course Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Choose a type...</option>
              {courseTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={addOffering}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Create Offering
        </button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Course Offerings ({courseOfferings.length})</h3>
        <div className="grid gap-3">
          {courseOfferings.map(offering => (
            <div key={offering.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              {editingId === offering.id ? (
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-3">
                    <select
                      value={editCourse}
                      onChange={(e) => setEditCourse(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Choose a course...</option>
                      {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.name}</option>
                      ))}
                    </select>
                    <select
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Choose a type...</option>
                      {courseTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="flex-1 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2">
                      <Save size={18} />
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="flex-1 p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg flex items-center justify-center gap-2">
                      <X size={18} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      {getTypeName(offering.courseTypeId)} - {getCourseName(offering.courseId)}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Course: {getCourseName(offering.courseId)} | Type: {getTypeName(offering.courseTypeId)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(offering)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteOffering(offering.id)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {courseOfferings.length === 0 && (
            <p className="text-gray-500 text-center py-8">No course offerings available. Create one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseOfferingsManager;