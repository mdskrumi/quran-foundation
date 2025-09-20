'use server';

import { Fetch } from '@/lib/fetch';
import { createQueryParams, daysToSeconds } from '@/lib/utils';

export interface Translation {
  id: number;
  name: string;
  author_name: string;
  slug: string;
  language_name: string;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  text_uthmani?: string;
  text_indopak?: string;
  text_imlaei_simple?: string;
  text_imlaei?: string;
  text_uthmani_simple?: string;
  text_uthmani_tajweed?: string;
  text_qpc_hafs?: string;
  qpc_uthmani_hafs?: string;
  text_qpc_nastaleeq_hafs?: string;
  text_qpc_nastaleeq?: string;
  text_indopak_nastaleeq?: string;
  image_url?: string;
  image_width?: number;
  page_number: number;
  juz_number: number;
  translations: Array<{
    id: number;
    resource_id: number;
    text: string;
  }>;
}

export interface RandomVerseResponse {
  verse: Verse;
}

export interface TranslationsResponse {
  translations: Translation[];
}

export async function getRandomVerse(translationId: string = '85', textFields: string[] = ['text_uthmani']): Promise<RandomVerseResponse> {
  const fields = textFields.join(',');

  const queryParams = {
    fields,
    translations: translationId,
  };

  const response = await Fetch({
    endpoint: `/verses/random?${createQueryParams(queryParams)}`,
  });

  return response.data;
}

export async function getTranslations(): Promise<TranslationsResponse> {
  const response = await Fetch({ endpoint: `/resources/translations`, revalidate: daysToSeconds(7) });
  return response.data;
}
