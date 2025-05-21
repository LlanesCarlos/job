import React, { useState, useEffect } from 'react';

export default function CoverLetter() {
  const [letter, setLetter] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('coverLetter');
    if (saved) setLetter(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('coverLetter', letter);
  }, [letter]);

  const containerStyle = {
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    minHeight: '500px',
    fontFamily: 'Georgia, serif',
  };

  const textareaStyle = {
    backgroundColor: '#2a2a2a',
    color: 'white',
    width: '100%',
    height: '400px',
    padding: '15px',
    borderRadius: '10px',
    border: '1px solid #444',
    resize: 'vertical',
    fontSize: '1rem',
    fontFamily: 'inherit',
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 16px',
    backgroundColor: '#0d6efd',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  const previewStyle = {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.6',
    backgroundColor: '#2c2c2c',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #444',
    fontSize: '1.05rem',
  };

  return (
    <div className="container py-5">
      <h2 className="text-white mb-4 text-center">Cover Letter Builder</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div style={containerStyle}>
            {!isPreview ? (
              <>
                <textarea
                  style={textareaStyle}
                  value={letter}
                  onChange={(e) => setLetter(e.target.value)}
                  placeholder="Dear Hiring Manager,..."
                />
                <button style={buttonStyle} onClick={() => setIsPreview(true)}>
                  Preview
                </button>
              </>
            ) : (
              <>
                <div style={previewStyle}>{letter || 'No content to preview.'}</div>
                <button style={buttonStyle} onClick={() => setIsPreview(false)}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
