import React, { useState } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

const CoursesManager = ({ courses, setCourses }) => {
  const [newCourse, setNewCourse] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');

  const addCourse = () => {
    if (!newCourse.trim()) {
      setError('Course name cannot be empty');
      return;
    }
    if (courses.some(c => c.name.toLowerCase() === newCourse.trim().toLowerCase())) {
      setError('Course already exists');
      return;
    }
    setCourses([...courses, { id: Date.now(), name: newCourse.trim() }]);
    setNewCourse('');
    setError('');
  };

  const startEdit = (course) => {
    setEditingId(course.id);
    setEditValue(course.name);
    setError('');
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      setError('Course name cannot be empty');
      return;
    }
    if (courses.some(c => c.id !== editingId && c.name.toLowerCase() === editValue.trim().toLowerCase())) {
      setError('Course already exists');
      return;
    }
    setCourses(courses.map(c => c.id === editingId ? { ...c, name: editValue.trim() } : c));
    setEditingId(null);
    setError('');
  };

  const deleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Course</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCourse()}
            placeholder="Enter course name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={addCourse}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Existing Courses ({courses.length})</h3>
        <div className="grid gap-3">
          {courses.map(course => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              {editingId === course.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <div className="flex gap-2 ml-3">
                    <button onClick={saveEdit} className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
                      <Save size={18} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg">
                      <X size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-lg font-medium text-gray-800">{course.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(course)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteCourse(course.id)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {courses.length === 0 && (
            <p className="text-gray-500 text-center py-8">No courses available. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesManager;