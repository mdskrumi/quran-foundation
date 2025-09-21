import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import SCRIPT_OPTIONS from '@/app/constants/scripts';
import { PaginationControls } from '@/components/juz/pagination';
import { ScriptSelect } from '@/components/juz/script-select';
import { TranslateSelect } from '@/components/juz/translate-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Fetch } from '@/lib/fetch';
import { createQueryParams, daysToSeconds } from '@/lib/utils';

export default async function JuzPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page?: string; script?: string; translations?: string };
}) {
  const { id } = params;

  const page = parseInt(searchParams.page || '1') || 1;
  const script = searchParams.script ?? SCRIPT_OPTIONS[0].value;
  const translations = searchParams.translations;

  const juzId = parseInt(id);
  if (isNaN(juzId) || juzId < 1 || juzId > 30) {
    notFound();
  }

  const queryParam: { [key: string]: string } = {
    page: page.toString(),
    fields: script,
  };

  if (translations) {
    queryParam.translations = translations;
  }

  const {
    data: { verses, pagination },
  } = await Fetch({ endpoint: `verses/by_juz/${juzId}?${createQueryParams(queryParam)}`, revalidate: daysToSeconds(7) });
  const { data: translationsData } = await Fetch({ endpoint: `/resources/translations`, revalidate: daysToSeconds(7) });

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between gap-1">
        <Link href={`/juz/${juzId - 1}?${createQueryParams({ ...queryParam, page: '1', script: script })}`}>
          <Button disabled={juzId === 1}>
            <ChevronLeft />
          </Button>
        </Link>
        <h1 className="mb-8 text-center text-3xl font-bold">
          Juz #{juzId} - Page {page}
        </h1>
        <Link href={`/juz/${juzId + 1}?${createQueryParams({ ...queryParam, page: '1', script: script })}`}>
          <Button disabled={juzId === 3}>
            <ChevronRight />
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col items-center justify-end gap-3 sm:flex-row">
        {translationsData && translationsData?.translations && (
          <TranslateSelect translations={translations} options={translationsData.translations} />
        )}
        <ScriptSelect script={script} options={SCRIPT_OPTIONS} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {verses?.map((verse: any) => (
          <Card key={verse.id}>
            <CardHeader>
              <div className="text-center">
                <p
                  className="font-arabic text-right text-2xl leading-relaxed sm:text-3xl md:text-4xl"
                  style={{ fontFamily: 'Amiri, "Times New Roman", serif' }}
                  dir="rtl"
                >
                  {verse[script]}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {verse.translations && verse.translations.length > 0 && (
                <div className="border-t pt-6">
                  <p className="text-foreground text-lg leading-relaxed italic">{`"${verse.translations[0].text}"`}</p>
                </div>
              )}
            </CardContent>
            <div className="text-muted-foreground mt-4 text-center text-sm">
              <span>— {verse.verse_key}</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <PaginationControls id={juzId} pagination={pagination} script={script} translations={translations} />
      </div>
    </div>
  );
}
