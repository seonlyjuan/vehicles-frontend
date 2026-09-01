import { Outlet, useNavigate } from 'react-router-dom';
import { LegalFooter } from '../../components/legal/LegalFooter';
import { useNotifications } from '../../hooks/useNotifications';

export function MainLayout({ user, onSignOut }) {
  const navigate = useNavigate();
  const unreadNotifications = useNotifications(user.id);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-left">
          <button className="general_button" onClick={() => navigate('/profile')}>
            Profil
          </button>
          <button className="general_button" onClick={() => navigate('/messages')}>
            Nachrichten
          </button>
          <button className="general_button" onClick={() => navigate('/notifications')}>
            Hinweise{unreadNotifications > 0 ? ` (${unreadNotifications})` : ''}
          </button>
          {['moderator', 'admin'].includes(user?.platform_role) && (
            <button className="general_button" onClick={() => navigate('/moderation')}>
              Moderation
            </button>
          )}
        </div>

        <div className="header-center">
          <button className="general_button" onClick={() => navigate('/')}>
            Home
          </button>
        </div>

        <div className="header-right">
          <button className="general_button" onClick={onSignOut}>
            Abmelden
          </button>
        </div>
      </header>

      <main className="page">
        <Outlet />
      </main>
      <LegalFooter />
    </div>
  );
}
