import { Github, Linkedin, Mail } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen px-6 py-20 bg-transparent text-white flex items-center justify-center">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-950">About This App</h1>
        <p className="text-lg text-gray-600 mb-8">
          This platform is a modern social media prototype built with React, Vite, Tailwind CSS, and Lucide Icons.
          It features user authentication, a post feed with optional images, modals.
        </p>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <h2 className="text-2xl font-semibold mb-2">Created by</h2>
          <p className="text-lg mb-4">Yves Rey Badan — Full Stack Developer</p>
        </div>
      </div>
    </div>
  );
};
