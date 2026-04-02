import { User, getLogoutUrl } from '../api/client';

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="bg-cs2-card border-b border-cs2-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-cs2-accent font-bold text-xl">CS2 Demo Hub</span>
      </div>
      <div className="flex items-center gap-4">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.displayName}
            className="w-9 h-9 rounded-full border-2 border-cs2-accent"
          />
        )}
        <span className="text-cs2-text font-medium hidden sm:block">{user.displayName}</span>
        <a
          href={getLogoutUrl()}
          className="bg-cs2-border hover:bg-cs2-border/70 text-cs2-text text-sm px-4 py-2 rounded-lg transition-colors"
        >
          Logout
        </a>
      </div>
    </header>
  );
}
