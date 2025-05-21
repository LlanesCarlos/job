import React, { useState, useEffect } from 'react';

export default function JobTracker() {
  const [jobs, setJobs] = useState([]);
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Applied');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('job-tracker');
    if (saved) {
      setJobs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('job-tracker', JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { company, title, status };

    if (editIndex !== null) {
      const updated = [...jobs];
      updated[editIndex] = newJob;
      setJobs(updated);
      setEditIndex(null);
    } else {
      setJobs([...jobs, newJob]);
    }

    setCompany('');
    setTitle('');
    setStatus('Applied');
  };

  const handleEdit = (index) => {
    const job = jobs[index];
    setCompany(job.company);
    setTitle(job.title);
    setStatus(job.status);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = jobs.filter((_, i) => i !== index);
    setJobs(updated);
    if (editIndex === index) {
      setCompany('');
      setTitle('');
      setStatus('Applied');
      setEditIndex(null);
    }
  };

  return (
    <div className="container py-5 text-white">
      <h2 className="text-center mb-4">Job Tracker</h2>

      <div className="row g-4">
        <div className="col-12 col-md-5">
          <div className="p-4 rounded-3 shadow-sm" style={{ backgroundColor: 'rgba(45, 45, 45, 0.85)' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="company" className="form-label fw-semibold">Company</label>
                <input
                  id="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="form-control bg-dark text-white border-secondary"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="title" className="form-label fw-semibold">Job Title</label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control bg-dark text-white border-secondary"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label fw-semibold">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-select bg-dark text-white border-secondary"
                  required
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                {editIndex !== null ? 'Update Job' : 'Add Job'}
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className="p-4 rounded-3 shadow-sm" style={{ backgroundColor: 'rgba(45, 45, 45, 0.85)' }}>
            <h4 className="mb-3">Job Applications</h4>
            <div className="table-responsive">
              <table className="table table-dark table-bordered align-middle text-white">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={index}>
                      <td>{job.company}</td>
                      <td>{job.title}</td>
                      <td>{job.status}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="btn btn-warning btn-sm text-white"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {jobs.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center text-secondary">
                        No job applications yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
