export default function Popup({ onClose }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">Contact Us</h2>
          <p className="mb-4 text-gray-700">
            You've reached 10 requests. Please contact us for further assistance:
          </p>
          <p className="mb-2 text-gray-800">
            <span className="font-semibold">Email:</span> example@email.com
          </p>
          <p className="mb-6 text-gray-800">
            <span className="font-semibold">Twitter:</span> @example_twitter
          </p>
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