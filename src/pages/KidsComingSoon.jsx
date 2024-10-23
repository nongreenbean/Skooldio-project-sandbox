import React from "react";

const KidsComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Kids Collection</h1>
      <p className="text-xl mb-8">Coming Soon!</p>
      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      <p className="mt-8 text-gray-600">
        We're working hard to bring you amazing clothes for kids. Stay tuned!
      </p>
    </div>
  );
};

export default KidsComingSoon;
