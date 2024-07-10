import { FaEnvelope, FaLinkedin, FaFileDownload, FaSadCry } from 'react-icons/fa';

export default function Popup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Me</h2>
        <p className="mb-4 text-gray-700">
          <FaSadCry /> You've reached maximun requests. Please contact me for further assistance:
        </p>
        <p className="mb-2 text-gray-800">
          <span className="font-semibold"> <FaEnvelope /> :</span> <a href="mailto:sainiakash2096@gmail.com" className="no-underline text-emerald-400 hover:text-emerald-800"> sainiakash2096@gmail.com </a>
        </p>
        <p className="mb-6 text-gray-800">
          <span className="font-semibold"><FaLinkedin /> :</span> <a href="https://www.linkedin.com/in/akash-saini-8808441b2/
          " className="no-underline text-emerald-400 hover:text-emerald-800"> Linkedin </a> </p>
        <p className="mb-6 text-gray-800">
          <span className="font-semibold"><FaFileDownload /> :</span> <a href="/Akash+resume.pdf" download className="no-underline text-emerald-400 hover:text-emerald-800"> Download Resume </a> </p>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}