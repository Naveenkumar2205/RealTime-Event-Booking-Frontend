import { useState } from "react";
import "./styles.css";

export default function App() {
  const events = [
    { id: 1, name: "🎸 Rock Concert", date: "2025-05-01" },
    { id: 2, name: "🤖 AI Workshop", date: "2025-06-15" },
    { id: 3, name: "🎨 Art Fair", date: "2025-07-10" },
    { id: 4, name: "🎭 Drama Night", date: "2025-08-12" },
    { id: 5, name: "🎬 Indie Film Fest", date: "2025-09-05" },
    { id: 6, name: "🎤 Comedy Hour", date: "2025-10-20" }
  ];

  const createInitialSeats = () =>
    Array.from({ length: 30 }, (_, i) => ({
      seatNumber: i + 1,
      isBooked: false
    }));

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventSeatMaps, setEventSeatMaps] = useState({});
  const [selectedSeatsByEvent, setSelectedSeatsByEvent] = useState({});

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);

    // Initialize seats if not already
    if (!eventSeatMaps[event.id]) {
      setEventSeatMaps((prev) => ({
        ...prev,
        [event.id]: createInitialSeats()
      }));
    }

    // Restore selected seats
    setSelectedSeatsByEvent((prev) => ({
      ...prev,
      [event.id]: prev[event.id] || []
    }));
  };

  const toggleSeat = (seat) => {
    if (seat.isBooked) return;

    const currentSelected = selectedSeatsByEvent[selectedEvent.id] || [];

    const isSelected = currentSelected.includes(seat.seatNumber);

    const updatedSelection = isSelected
      ? currentSelected.filter((s) => s !== seat.seatNumber)
      : [...currentSelected, seat.seatNumber];

    setSelectedSeatsByEvent((prev) => ({
      ...prev,
      [selectedEvent.id]: updatedSelection
    }));
  };

  const bookSeats = () => {
    const currentSelected = selectedSeatsByEvent[selectedEvent.id] || [];

    const updatedMap = eventSeatMaps[selectedEvent.id].map((seat) =>
      currentSelected.includes(seat.seatNumber)
        ? { ...seat, isBooked: true }
        : seat
    );

    setEventSeatMaps((prev) => ({
      ...prev,
      [selectedEvent.id]: updatedMap
    }));

    setSelectedSeatsByEvent((prev) => ({
      ...prev,
      [selectedEvent.id]: []
    }));

    alert("🎉 Tickets booked!");
  };

  const selectedSeats = selectedSeatsByEvent[selectedEvent?.id] || [];
  console.log(selectedSeats);
  const seatMap = selectedEvent ? eventSeatMaps[selectedEvent.id] || [] : [];
  //console.log(seatMap);

  return (
    <div className="App">
      <header>
        <h1>🎟️ Event Ticketing</h1>
        <p>Book your seat in real-time events</p>
      </header>

      {!selectedEvent ? (
        <section className="event-list">
          <h2>Choose an Event</h2>
          <div className="cards">
            {events.map((event) => (
              <div
                key={event.id}
                className="card"
                onClick={() => handleSelectEvent(event)}
              >
                <h3>{event.name}</h3>
                <p>{event.date}</p>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="event-detail">
          <button className="back-btn" onClick={() => setSelectedEvent(null)}>
            ⬅ Back to Events
          </button>
          <h2>{selectedEvent.name}</h2>
          <p>{selectedEvent.date}</p>

          <div className="seat-grid">
            {seatMap.map((seat) => (
              <div
                key={seat.seatNumber}
                className={`seat ${
                  seat.isBooked
                    ? "booked"
                    : selectedSeats.includes(seat.seatNumber)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleSeat(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
          </div>

          <div className="button-container">
            <button
              className="book-button"
              onClick={bookSeats}
              disabled={selectedSeats.length === 0}
            >
              ✅ Book {selectedSeats.length} Seat(s)
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
