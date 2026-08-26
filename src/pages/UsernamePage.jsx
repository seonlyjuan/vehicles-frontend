import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,30}$/;

export function UsernamePage({ user, updateUsername }) {
  const [username, setUsername] = useState(user.username ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const isFirstSelection = !user.username;

  async function handleSubmit(event) {
    event.preventDefault();
    const normalizedUsername = username.trim().toLowerCase();

    if (!USERNAME_PATTERN.test(normalizedUsername)) {
      setError('Der Username muss 3–30 Zeichen lang sein und darf nur Buchstaben, Zahlen und Unterstriche enthalten.');
      return;
    }

    setError('');
    setIsSaving(true);
    try {
      await updateUsername(normalizedUsername);
      navigate('/profile', { replace: true });
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="card username-card">
      <h2>{isFirstSelection ? 'Wähle deinen Username' : 'Username ändern'}</h2>
      <p>Dein Username ist in der App eindeutig und wird klein geschrieben gespeichert.</p>

      <form className="username-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <div className="username-input">
          <span>@</span>
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            minLength="3"
            maxLength="30"
            pattern="[a-zA-Z0-9_]{3,30}"
            required
            autoFocus
          />
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="general_button" type="submit" disabled={isSaving}>
          {isSaving ? 'Wird gespeichert …' : 'Username speichern'}
        </button>
      </form>

      {!isFirstSelection && <Link to="/profile">Zurück zum Profil</Link>}
    </div>
  );
}
