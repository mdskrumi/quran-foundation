import Link from 'next/link';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page() {
  const juzArray = Array.from({ length: 3 }, (_, i) => i + 1);

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Select a Juz</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {juzArray.map((juz) => (
          <Link key={juz} href={`/juz/${juz}?page=1`}>
            <Card className="cursor-pointer transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Juz #{juz}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
