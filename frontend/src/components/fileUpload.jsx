import { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadedPath(res.data.filePath);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Upload a File</h2>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input file-input-bordered w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
        >
          Upload
        </button>
      </form>

      {uploadedPath && (
        <div className="mt-6 text-center">
          <p className="text-gray-600">Uploaded file:</p>
          <img
            src={`http://localhost:5000${uploadedPath}`}
            alt="Uploaded"
            className="mt-2 max-w-full h-auto rounded-xl border"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
