import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* 🖼 Hero Image */}
      <img
        src="/hero.svg"
        alt="Task illustration"
        onError={(e) => (e.target.style.display = 'none')}
        className="w-80 md:w-[400px] mb-10 drop-shadow-xl"
      />

      {/* 📋 Title & Tagline */}
      <h1 className="text-5xl font-extrabold text-gray-800 mb-3 flex items-center gap-2">
        <span role="img" aria-label="clipboard">📋</span> Task Tracker
      </h1>
      <p className="text-gray-600 text-xl mb-6 italic tracking-wide text-center">
        Organize. Focus. Finish.
      </p>

      {/* ✅ Feature Bullets */}
      <ul className="text-left text-gray-700 bg-white rounded-lg p-6 shadow-lg mb-8 space-y-3 w-full max-w-md">
        <li className="flex items-center gap-2">
          ✅ <span>Create and manage your daily tasks</span>
        </li>
        <li className="flex items-center gap-2">
          ✅ <span>Mark tasks as complete</span>
        </li>
        <li className="flex items-center gap-2">
          ✅ <span>Secure login with Google</span>
        </li>
      </ul>

      {/* 🚀 CTA Button */}
      <motion.button
        onClick={() => navigate('/dashboard')}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Go to Dashboard
      </motion.button>
    </motion.div>
  );
};

export default Home;
