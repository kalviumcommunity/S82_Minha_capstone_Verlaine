import { useState } from 'react';
import axios from '../services/api';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadedPath, setUploadedPath] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const { data } = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setUploadedPath(data.filePath);
      toast.success('File uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card w-full max-w-md mx-auto animate-slide-up">
      <h3 className="text-xl font-serif text-rose-800 mb-4">Upload Image</h3>
      <form onSubmit={handleUpload} className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-rose-100 file:text-rose-700"
          disabled={loading}
          aria-label="File upload"
        />
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={loading}
          aria-label="Upload file"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Uploading...
            </span>
          ) : (
            'Upload'
          )}
        </button>
      </form>
      {uploadedPath && (
        <div className="mt-4">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}${uploadedPath}`}
            alt="Uploaded file"
            className="w-full rounded-lg border border-rose-200"
          />
        </div>
      )}
    </div>
  );
}