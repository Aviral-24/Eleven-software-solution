import React, { useState } from 'react';
import { Trash2, Edit2, Plus, Save, X } from 'lucide-react';

const CourseTypesManager = ({ courseTypes, setCourseTypes }) => {
  const [newType, setNewType] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');

  const addCourseType = () => {
    if (!newType.trim()) {
      setError('Course type name cannot be empty');
      return;
    }
    if (courseTypes.some(ct => ct.name.toLowerCase() === newType.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    setCourseTypes([...courseTypes, { id: Date.now(), name: newType.trim() }]);
    setNewType('');
    setError('');
  };

  const startEdit = (type) => {
    setEditingId(type.id);
    setEditValue(type.name);
    setError('');
  };

  const saveEdit = () => {
    if (!editValue.trim()) {
      setError('Course type name cannot be empty');
      return;
    }
    if (courseTypes.some(ct => ct.id !== editingId && ct.name.toLowerCase() === editValue.trim().toLowerCase())) {
      setError('Course type already exists');
      return;
    }
    setCourseTypes(courseTypes.map(ct => ct.id === editingId ? { ...ct, name: editValue.trim() } : ct));
    setEditingId(null);
    setError('');
  };

  const deleteCourseType = (id) => {
    if (window.confirm('Are you sure you want to delete this course type?')) {
      setCourseTypes(courseTypes.filter(ct => ct.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Course Type</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addCourseType()}
            placeholder="Enter course type name"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={addCourseType}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add
          </button>
        </div>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">Existing Course Types ({courseTypes.length})</h3>
        <div className="grid gap-3">
          {courseTypes.map(type => (
            <div key={type.id} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              {editingId === type.id ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                  <span className="text-lg font-medium text-gray-800">{type.name}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(type)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deleteCourseType(type.id)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
          {courseTypes.length === 0 && (
            <p className="text-gray-500 text-center py-8">No course types available. Add one above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseTypesManager;