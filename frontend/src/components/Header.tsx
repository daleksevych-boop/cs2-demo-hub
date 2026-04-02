import { UserProfile, logout } from '../api/client';

interface HeaderProps {
  user: UserProfile;
}

function Header({ user }: HeaderProps) {
  async function handleLogout() {
    await logout();
    window.location.href = '/';
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-bold">
            <span className="text-accent">CS2</span>
            <span className="text-white ml-1">Demo Hub</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user.avatar && (
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-9 h-9 rounded-full border-2 border-accent"
            />
          )}
          <span className="text-white font-medium">{user.displayName}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm rounded-lg border border-border text-text-muted hover:border-accent hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
