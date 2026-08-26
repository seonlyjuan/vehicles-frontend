import { Link } from 'react-router-dom';

export function DashboardPage() {
  return (
    <section className="card vehicle-menu-card">
      <div className="center-vehicle-buttons">
        <Link to="/vehicles/bicycles/listing">
          <button className="large-vehicle-btn">
            <span className="emoji">🚲</span>
            <span className="text">Fahrräder</span>
          </button>
        </Link>

        <Link to="/vehicles/cars/listing">
          <button className="large-vehicle-btn">
            <span className="emoji">🚗</span>
            <span className="text">Autos</span>
          </button>
        </Link>

        <Link to="/vehicles/motorbikes/listing">
          <button className="large-vehicle-btn">
            <span className="emoji">🏍️</span>
            <span className="text">Motorräder</span>
          </button>
        </Link>
      </div>
    </section>
  );
}
