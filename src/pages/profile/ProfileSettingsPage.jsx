import { Link } from 'react-router-dom';

import { DeleteAccountSection } from '../../components/profile/DeleteAccountSection';
import { PrivacySettings } from '../../components/profile/PrivacySettings';
import { SellerSettingsForm } from '../../components/profile/SellerSettingsForm';

export function ProfileSettingsPage({ auth }) {
  return (
    <div className="card settings-card">
      <div className="form-page-header">
        <h2>Kontoeinstellungen</h2>
        <Link to="/profile"><button className="general_button">Zurück zum Profil</button></Link>
      </div>
      <SellerSettingsForm auth={auth} />
      <PrivacySettings />
      <DeleteAccountSection auth={auth} />
    </div>
  );
}
