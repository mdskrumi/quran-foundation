import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Loading() {
  const placeholders = Array.from({ length: 3 });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">Loading Juz...</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {placeholders.map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <CardTitle className="bg-muted mx-auto h-6 w-1/2 rounded" />
              <CardContent className="bg-muted mx-auto h-6 w-2/3 rounded" />
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
