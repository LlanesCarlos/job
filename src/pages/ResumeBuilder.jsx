import React, { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ResumeContent({ name, title, sections }) {
  return (
    <div className="p-4 bg-white text-black w-100" style={{ maxWidth: '794px' }}>
      <h1 className="text-3xl fw-bold">{name}</h1>
      <p className="text-xl mb-4">{title}</p>

      {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl fw-semibold mt-4">{section.title}</h2>
          {section.title.toLowerCase() === 'skills' ? (
            <ul className="list-disc ps-4">
              {section.content.split('\n').map((line, i) => (
                <li key={i}>{line.trim()}</li>
              ))}
            </ul>
          ) : (
            <p className="whitespace-pre-wrap">{section.content}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ResumeBuilder() {
  const [name, setName] = useState('John Doe');
  const [title, setTitle] = useState('Full Stack Developer');

  const [sections, setSections] = useState([
    { title: 'Skills', content: 'React, Node.js, PostgreSQL' },
    { title: 'Experience', content: 'Developed X using Y, Led team of 4 devs, a' },
  ]);

  const componentRef = useRef();

  const handleExportPDF = () => {
    const input = componentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');
    });
  };

  const handleSectionChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const addSection = () => {
    setSections([...sections, { title: '', content: '' }]);
  };

  const removeSection = (index) => {
    const updated = sections.filter((_, i) => i !== index);
    setSections(updated);
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="text-center mb-5">Resume Builder</h2>

      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div
            className="rounded-3 shadow-sm p-4"
            style={{ backgroundColor: 'rgba(45, 45, 45, 0.85)' }}
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control bg-dark text-white border-secondary"
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control bg-dark text-white border-secondary"
              />
            </div>

            <hr className="my-4 border-secondary" />
            <h5 className="text-white">Sections</h5>

            {sections.map((section, index) => (
              <div key={index} className="mb-4 border p-3 rounded" style={{ backgroundColor: '#333' }}>
                <div className="mb-2">
                  <label className="form-label fw-semibold">Section Title</label>
                  <input
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                    className="form-control bg-dark text-white border-secondary"
                  />
                </div>
                <div>
                  <label className="form-label fw-semibold">Content</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                    className="form-control bg-dark text-white border-secondary"
                    rows="4"
                  />
                </div>
                {sections.length > 1 && (
                  <button
                    onClick={() => removeSection(index)}
                    className="btn btn-danger btn-sm mt-2"
                  >
                    Remove Section
                  </button>
                )}
              </div>
            ))}

            <button onClick={addSection} className="btn btn-secondary w-100 mt-3">
              + Add Section
            </button>

            <button onClick={handleExportPDF} className="btn btn-primary w-100 mt-3">
              Export to PDF
            </button>
          </div>
        </div>

        <div className="col-12 col-md-6 d-flex justify-content-center">
          <div className="rounded-3 shadow-sm p-3 bg-white w-100" style={{ overflowX: 'auto' }}>
            <div ref={componentRef} className="mx-auto">
              <ResumeContent name={name} title={title} sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
