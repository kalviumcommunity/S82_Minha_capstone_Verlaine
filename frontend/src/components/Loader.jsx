import { Loader2 } from 'lucide-react';

export default function Loader({ fullScreen = false }) {
  return (
    <div className={`flex items-center justify-center ${fullScreen ? 'min-h-screen' : ''}`}>
      <Loader2 className="animate-spin text-rose-600" size={32} aria-label="Loading" />
    </div>
  );
}