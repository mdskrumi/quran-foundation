import Link from 'next/link';

import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="w-full shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-2xl">
          {"Qur'an Explorer"}
        </Link>

        <nav className="flex items-center space-x-4">
          <Button asChild variant="default">
            <Link href="/random-verse">{'Random Verse'}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
