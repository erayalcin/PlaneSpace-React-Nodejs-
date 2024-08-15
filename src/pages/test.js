// FlightForm.js
import{ useState } from 'react';

const FlightForm = () => {
  const [formData, setFormData] = useState({
    key: '',
    departureName: '',
    arrivalName: '',
    departureDate: '',
    departureTime: '',
    departureAirport: '',
    arrivalTime: '',
    arrivalAirport: '',
    flightDuration: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5001/api/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label>
            {key}
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
            />
          </label>
        </div>
      ))}
      <button type="submit">Add Flight</button>
    </form>
  );
};

export default FlightForm;