import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Page components
function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
      </div>
      <h1>monitor your React site</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>
      <p className="read-the-docs">
        I have so many problems and you must monitor me
      </p>
    </>
  );
}

function About() {
  return (
    <div className="about-container">
      <h1>Monitor your React site</h1>
      <h2>About Page</h2>
      <img 
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
        alt="Website monitoring illustration"
        className="about-image"
      />
      <p>This is a simple multi-page React application.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <h1>monitor your React site</h1>
      <h2>Contact Us</h2>
      <p>Email us at: contact@example.com</p>
    </div>
  );
}

function CurrentTime() {
  const [time, setTime] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://worldtimeapi.org/api/timezone/Etc/UTC');
        if (!response.ok) {
          throw new Error('Failed to fetch time data');
        }
        const data = await response.json();
        const datetime = new Date(data.datetime);
        setTime(datetime.toLocaleString());
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setTime(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTime();

    // Update time every second
    const interval = setInterval(fetchTime, 100000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-container">
      <h2>Current Time</h2>
      {loading && <p>Loading time data...</p>}
      {error && <p className="error">Error: {error}</p>}
      {time && (
        <div className="time-display">
          <p>The current UTC time is:</p>
          <p className="time-value">{time}</p>
        </div>
      )}
    </div>
  );
}
function ModalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [countdown, setCountdown] = useState(1);

  useEffect(() => {
    // Set up the 5-second delay for the button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsButtonActive(true);
    }
  }, [countdown]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset the button state and countdown when modal closes
    setIsButtonActive(false);
    setCountdown(5);
  };

  return (
    <div className="modal-page">
      <h2>Modal Demo Page</h2>
      <p>Button will be active in {countdown} seconds...</p>
      
      <button
        onClick={openModal}
        disabled={!isButtonActive}
        className={isButtonActive ? 'active-button' : 'disabled-button'}
      >
        {isButtonActive ? 'Load Modal' : `Please wait (${countdown}s)`}
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>This is your modal</h3>
            <p>Modal content goes here. You had to wait 5 seconds to open this!</p>
            <button onClick={closeModal}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul style={{ display: 'flex', listStyle: 'none', gap: '20px' }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/time">Current Time</Link>
            </li>
            <li>
              <Link to="/modal">Modal Demo</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/time" element={<CurrentTime />} />
          <Route path="/modal" element={<ModalPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;