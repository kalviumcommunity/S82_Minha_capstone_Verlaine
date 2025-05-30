import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function JournalEditForm({ initialValue, onSubmit, onCancel }) {
  const [content, setContent] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Content cannot be empty');
      return;
    }
    onSubmit(content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <textarea
        className="input-field"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="How’s your skin feeling today?"
        aria-label="Edit journal entry"
      />
      <div className="flex gap-4">
        <button type="submit" className="btn-primary" aria-label="Save entry">Save</button>
        <button type="button" onClick={onCancel} className="btn-secondary" aria-label="Cancel">Cancel</button>
      </div>
    </form>
  );
}