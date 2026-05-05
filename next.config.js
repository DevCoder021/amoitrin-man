/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // C'est cette ligne qui manque !
  images: {
    unoptimized: true, // Obligatoire pour l'affichage des images sur GitHub Pages
  },
};

export default nextConfig;