import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fetch } from '@/lib/fetch';

export default async function Page() {
  const { data } = await Fetch({ endpoint: 'juzs' });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Select a Juz</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {data?.juzs.map(({ id, verses_count }: { id: number; verses_count: number }) => (
          <Link key={id} href={`/juz/${id}?page=1`}>
            <Card className="cursor-pointer transition-shadow duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-center">Juz #{id}</CardTitle>
                <CardContent className="text-muted-foreground mt-3 text-center">Total Verses: {verses_count}</CardContent>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
