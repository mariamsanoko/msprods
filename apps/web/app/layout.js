import '../styles/globals.css';

export const metadata = {
  title: 'MS Prods Platform',
  description: 'Plateforme formations Microsoft, IA et NoCode avec dashboard sécurisé.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
