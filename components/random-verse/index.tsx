'use client';

import { Loader2, RefreshCw } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { getRandomVerse, getTranslations, type Translation, type Verse } from './actions';

const textScriptOptions = [
  { value: 'text_uthmani', label: 'Uthmani Script', description: 'Standard Uthmani script' },
  { value: 'text_indopak', label: 'Indo-Pak Script', description: 'Indo-Pakistani style' },
  { value: 'text_imlaei_simple', label: 'Simple Imlaei', description: 'Simplified Imlaei script' },
  { value: 'text_imlaei', label: 'Imlaei Script', description: 'Traditional Imlaei script' },
  { value: 'text_uthmani_simple', label: 'Simple Uthmani', description: 'Simplified Uthmani script' },
  { value: 'text_uthmani_tajweed', label: 'Uthmani Tajweed', description: 'Uthmani with Tajweed marks' },
  { value: 'text_qpc_hafs', label: 'QPC Hafs', description: 'Quran Publishing Complex Hafs' },
  { value: 'qpc_uthmani_hafs', label: 'QPC Uthmani Hafs', description: 'QPC Uthmani Hafs version' },
  { value: 'text_qpc_nastaleeq_hafs', label: 'QPC Nastaliq Hafs', description: 'QPC Nastaliq Hafs style' },
  { value: 'text_qpc_nastaleeq', label: 'QPC Nastaliq', description: 'QPC Nastaliq script' },
  { value: 'text_indopak_nastaleeq', label: 'Indo-Pak Nastaliq', description: 'Indo-Pakistani Nastaliq style' },
];

export default function RandomVerseComponent() {
  const [verse, setVerse] = useState<Verse | null>(null);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [selectedTextScript, setSelectedTextScript] = useState<string>(textScriptOptions[0].value);
  const [loading, setLoading] = useState(true);

  const loadRandomVerse = useCallback(
    async (translationId: string | null = selectedTranslation, textScript: string = selectedTextScript) => {
      if (!translationId) {
        return;
      }

      try {
        setLoading(true);
        const data = await getRandomVerse(translationId, [textScript]);
        setLoading(false);
        setVerse(data.verse);
      } catch (error) {
        console.error('Error loading random verse:', error);
      }
    },
    [selectedTranslation, selectedTextScript],
  );

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setLoading(true);
        const data = await getTranslations();
        setLoading(false);
        setTranslations(data.translations);
        setSelectedTranslation(data.translations[0].id.toString());
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };
    loadTranslations();
  }, []);

  useEffect(() => {
    const loadInitialVerse = async () => {
      await loadRandomVerse();
    };

    loadInitialVerse();
  }, [loadRandomVerse]);

  const handleTranslationChange = async (translationId: string) => {
    setSelectedTranslation(translationId);
  };

  const handleTextScriptChange = async (textScript: string) => {
    setSelectedTextScript(textScript);
  };

  const handleRefresh = async () => {
    setLoading(true);
    await loadRandomVerse();
    setLoading(false);
  };

  // Get the selected text content
  const getSelectedText = () => {
    if (!verse) return '';
    return (verse[selectedTextScript as keyof Verse] as string) || '';
  };

  return (
    <div className="flex h-full min-h-screen flex-col items-center justify-center">
      <Card className="mx-auto w-full">
        <CardHeader className="space-y-4">
          <div className="mb-7 flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Random Quran Verse</CardTitle>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading} className="gap-2">
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          <div className="flex flex-col justify-around gap-3 sm:flex-row">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <label htmlFor="text-script-select" className="text-sm font-medium whitespace-nowrap">
                Arabic Script:
              </label>
              <Select value={selectedTextScript} onValueChange={handleTextScriptChange}>
                <SelectTrigger className="w-full sm:w-[350px]">
                  <SelectValue placeholder="Select Arabic script" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {textScriptOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{option.label}</span>
                        <span className="text-muted-foreground text-xs">{option.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedTranslation && translations && (
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <label htmlFor="translation-select" className="text-sm font-medium whitespace-nowrap">
                  Translation:
                </label>
                <Select value={selectedTranslation} onValueChange={handleTranslationChange}>
                  <SelectTrigger className="w-full sm:w-[350px]">
                    <SelectValue placeholder="Select a translation" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {translations.map((translation) => (
                      <SelectItem key={translation.id} value={translation.id.toString()}>
                        <div className="flex flex-col items-start">
                          <span className="font-medium">{translation.name}</span>
                          <span className="text-muted-foreground text-xs">
                            {translation.language_name} • {translation.author_name}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {verse && (
            <div className={cn('space-y-6', { 'opacity-50': loading })}>
              {/* Verse Reference */}
              <div className="text-center">
                <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
                  Surah {verse.verse_key.split(':')[0]} • Verse {verse.verse_number}
                </span>
              </div>

              {/* Arabic Text */}
              <div className="text-center">
                <p
                  className="font-arabic text-right text-2xl leading-relaxed sm:text-3xl md:text-4xl"
                  style={{ fontFamily: 'Amiri, "Times New Roman", serif' }}
                  dir="rtl"
                >
                  {getSelectedText()}
                </p>
                <div className="text-muted-foreground mt-2 text-sm">
                  <span className="capitalize">{textScriptOptions.find((opt) => opt.value === selectedTextScript)?.label}</span>
                </div>
              </div>

              {/* Translation */}
              {verse.translations && verse.translations.length > 0 && (
                <div className="border-t pt-6">
                  <p className="text-muted-foreground text-lg leading-relaxed italic">{`"${verse.translations[0].text}"`}</p>
                  <div className="text-muted-foreground mt-4 text-sm">
                    <span>— {verse.verse_key}</span>
                  </div>
                </div>
              )}

              {/* Verse Details */}
              <div className="text-muted-foreground grid grid-cols-2 gap-4 border-t pt-4 text-sm sm:grid-cols-4">
                <div className="text-center">
                  <div className="font-medium">Juz</div>
                  <div>{verse.juz_number}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Page</div>
                  <div>{verse.page_number}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Hizb</div>
                  <div>{verse.hizb_number}</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">Ruku</div>
                  <div>{verse.ruku_number}</div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-muted-foreground ml-2 text-sm">Loading new verse...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
