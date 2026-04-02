import { User } from '../api/client';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-accent font-bold text-xl">CS2 Demo Hub</span>
        </div>
        <div className="flex items-center gap-3">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-9 h-9 rounded-full border-2 border-accent"
            />
          )}
          <span className="text-gray-300 font-medium hidden sm:block">
            {user.displayName}
          </span>
          <button
            onClick={onLogout}
            className="bg-border hover:bg-gray-600 text-gray-300 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
