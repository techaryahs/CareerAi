import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultResumeData } from '../pages/student/ResumeBuilder/AllComponents';

const ResumeContext = createContext();

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(defaultResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }
    
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('selectedTemplate', selectedTemplate);
  }, [selectedTemplate]);

  const updateResumeData = (newData) => {
    setResumeData(newData);
  };

  const resetResumeData = () => {
    setResumeData(defaultResumeData);
    localStorage.removeItem('resumeData');
  };

  const value = {
    resumeData,
    updateResumeData,
    resetResumeData,
    selectedTemplate,
    setSelectedTemplate,
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
