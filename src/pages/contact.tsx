export const Contact = () => {
  return (
    <div className="min-h-screen px-6 py-20 bg-transparent text-white flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-950">Contact</h1>
        <p className="text-lg text-gray-500 mb-6">
          For collaborations, inquiries, or to learn more about my work, please visit my portfolio.
        </p>
        <a
          href="https://yrpbcrafts.github.io/pf-frontend/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-white text-black rounded-lg text-sm font-medium hover:bg-gray-200 transition"
        >
          Go to Portfolio
        </a>
      </div>
    </div>
  );
};
