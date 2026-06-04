import AccessGate from '../../../components/dashboard/AccessGate';

export default function FormationsPage() {
  return <><span className="eyebrow">Formations</span><h1>Catalogue MS Prods</h1><AccessGate feature="Formations complètes"><div className="feature-grid"><article className="card"><h3>Power Platform</h3><p>Créer des applications métier.</p></article><article className="card"><h3>Power Automate</h3><p>Automatiser les processus.</p></article><article className="card"><h3>Dynamics 365</h3><p>Structurer le CRM.</p></article></div></AccessGate></>;
}
