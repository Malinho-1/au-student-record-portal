import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Camera, Trash2 } from 'lucide-react';


interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { student, updateStudentProfile } = useApp();

  const [formData, setFormData] = useState({
    fullName: student.fullName,
    programme: student.programme,
    faculty: student.faculty,
    yearOfStudy: student.yearOfStudy,
    gpa: student.gpa,
    academicStanding: student.academicStanding,
    email: student.email,
    avatarUrl: student.avatarUrl || '',
  });

  if (!isOpen) return null;

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setFormData(prev => ({ ...prev, avatarUrl: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-neutral-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Edit Student Profile</h3>
            <p className="text-xs text-neutral-500">Update your academic credentials and display info</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          {/* Avatar upload */}
          <div className="flex items-center gap-4 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="w-16 h-16 rounded-full bg-neutral-800 text-white flex items-center justify-center overflow-hidden shrink-0 border border-neutral-300">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-lg">
                  {formData.fullName ? formData.fullName.split(' ').map(n => n[0]).join('') : 'AU'}
                </span>
              )}
            </div>

            <div className="flex-1">
              <label className="block text-xs font-bold text-neutral-800 mb-1">
                Profile Photo
              </label>
              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-lg cursor-pointer transition-colors shadow-2xs">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </label>
                {formData.avatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg transition-colors"
                    title="Remove photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Programme Name</label>
              <input
                type="text"
                value={formData.programme}
                onChange={e => setFormData({ ...formData, programme: e.target.value })}
                required
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Year of Study</label>
              <input
                type="text"
                value={formData.yearOfStudy}
                onChange={e => setFormData({ ...formData, yearOfStudy: e.target.value })}
                placeholder="e.g. Year 3"
                required
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">Faculty</label>
            <input
              type="text"
              value={formData.faculty}
              onChange={e => setFormData({ ...formData, faculty: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Cumulative GPA</label>
              <input
                type="text"
                value={formData.gpa}
                onChange={e => setFormData({ ...formData, gpa: e.target.value })}
                placeholder="e.g. 3.84"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden font-bold text-[#A51C30]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">Academic Standing</label>
              <input
                type="text"
                value={formData.academicStanding}
                onChange={e => setFormData({ ...formData, academicStanding: e.target.value })}
                placeholder="Good Standing · Dean's List"
                className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-[#A51C30] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold bg-[#A51C30] hover:bg-[#8B1727] text-white rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
