import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
  const [value, setValue] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentEvent, setCurrentEvent] = useState({ title: '', id: null });

  const openModal = (date) => {
    setSelectedDate(date);
    setCurrentEvent({ title: '', id: null });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setCurrentEvent({ title: '', id: null });
  };

  const saveEvent = () => {
    if (!currentEvent.title.trim()) return;

    const newEvent = {
      id: currentEvent.id ?? Date.now(),
      title: currentEvent.title.trim(),
      date: selectedDate,
    };

    setEvents((prev) => {
      // If editing, replace
      if (currentEvent.id) {
        return prev.map((e) => (e.id === currentEvent.id ? newEvent : e));
      }
      return [...prev, newEvent];
    });

    closeModal();
  };

  const deleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const editEvent = (event) => {
    setSelectedDate(event.date);
    setCurrentEvent({ title: event.title, id: event.id });
    setModalOpen(true);
  };

  const getEventsForDate = (date) =>
    events.filter((e) => e.date.toDateString() === date.toDateString());

  const calendarContainerStyle = {
    backgroundColor: '#2d2d2d',
    padding: '20px',
    borderRadius: '12px',
    color: 'white',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
  };

  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1e1e1e',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    zIndex: 999,
    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    minWidth: '300px',
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 998,
  };

  const inputStyle = {
    backgroundColor: '#333',
    color: 'white',
    border: '1px solid #555',
    padding: '8px',
    width: '100%',
    borderRadius: '6px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    padding: '8px 12px',
    marginRight: '8px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
  };

  const primaryBtn = {
    ...buttonStyle,
    backgroundColor: '#0d6efd',
    color: 'white',
  };

  const cancelBtn = {
    ...buttonStyle,
    backgroundColor: '#555',
    color: 'white',
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-white mb-4">Application Calendar</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div style={calendarContainerStyle}>
            <Calendar
              onChange={setValue}
              value={value}
              onClickDay={openModal}
              tileContent={({ date, view }) => {
                const dayEvents = getEventsForDate(date);
                return (
                  view === 'month' && dayEvents.length > 0 && (
                    <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>
                      {dayEvents.map((event) => (
                        <div
                          key={event.id}
                          style={{ color: '#0d6efd', cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            editEvent(event);
                          }}
                        >
                          • {event.title}
                        </div>
                      ))}
                    </div>
                  )
                );
              }}
              tileClassName={({ date }) => {
                if (date.toDateString() === new Date().toDateString()) {
                  return 'today-custom-highlight';
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <>
          <div style={overlayStyle} onClick={closeModal} />
          <div style={modalStyle}>
            <h5 style={{ marginBottom: '12px' }}>
              {currentEvent.id ? 'Edit Event' : 'Add Event'} for {selectedDate?.toDateString()}
            </h5>
            <input
              style={inputStyle}
              type="text"
              value={currentEvent.title}
              onChange={(e) =>
                setCurrentEvent((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Event title"
            />
            <div>
              <button style={primaryBtn} onClick={saveEvent}>
                Save
              </button>
              <button style={cancelBtn} onClick={closeModal}>
                Cancel
              </button>
              {currentEvent.id && (
                <button
                  style={{ ...buttonStyle, backgroundColor: 'red', color: 'white' }}
                  onClick={() => {
                    deleteEvent(currentEvent.id);
                    closeModal();
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        .react-calendar {
          background-color: transparent;
          border: none;
          border-radius: 12px;
          color: white;
        }
        .react-calendar__tile {
          background: transparent;
          border-radius: 8px;
          transition: background 0.3s;
        }
        .react-calendar__tile:hover {
          background-color: #444;
        }
        .react-calendar__tile--active {
          background-color: #0d6efd;
          color: white;
        }
        .react-calendar__navigation button {
          background: none;
          color: white;
        }
        .today-custom-highlight {
          background-color: rgba(13, 110, 253, 0.3) !important;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
