import Link from 'next/link';

import { Button } from '../ui/button';

const Footer = () => {
  return (
    <footer className="mt-8 w-full border-t bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between p-4 text-sm text-gray-600 md:flex-row">
        <p>{`© ${new Date().getFullYear()} Qur'an Explorer. All rights reserved.`}</p>
        <div className="mt-2 flex space-x-4 md:mt-0">
          <Button variant={'link'}>
            <Link href="/about">{'About'}</Link>
          </Button>
          <Button variant={'link'}>
            <Link href="/contact">{'Contact'}</Link>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
