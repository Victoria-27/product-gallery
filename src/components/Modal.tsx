import React from 'react';
import { X } from 'lucide-react';
import { useScrollLock } from '../hooks/useScrollLock';
import { ModalProps } from '../types/types';

const ModalHeader: React.FC<{ title?: string; onClose: () => void }> = ({ 
  title, 
  onClose 
}) => (
  <div className="flex justify-between items-center p-4 border-b">
    {title && (
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>
    )}
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-red-600 transition-transform 
                 transform hover:scale-110 focus:ring-2 focus:ring-red-400 
                 rounded-full p-2"
      aria-label="Close modal"
    >
      <X size={24} />
    </button>
  </div>
);


export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = ''
}) => {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const modalClasses = [
    'bg-white dark:bg-gray-900 rounded-lg w-full relative shadow-lg',
    'transform scale-95 transition-all duration-300 ease-in-out animate-scaleIn',
    'max-h-[90vh] overflow-y-auto',
    className
  ].join(' ');

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm 
                 flex items-center justify-center p-4 animate-fadeIn z-50"
      onClick={onClose}
    >
      <div
        className={modalClasses}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader title={title} onClose={onClose} />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};