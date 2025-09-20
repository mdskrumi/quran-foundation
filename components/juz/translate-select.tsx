'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import SCRIPT_OPTIONS from '@/app/constants/scripts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TranslateOption {
  name: string;
  language_name: string;
  id: string;
}

export function TranslateSelect({ translations, options }: { translations?: string; options: TranslateOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'none') {
      params.delete('translations');
    } else {
      params.set('translations', value);
    }

    params.set('page', params.get('page') ?? '1');
    params.set('script', params.get('script') ?? SCRIPT_OPTIONS[0].value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={translations} onValueChange={handleChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select Translation" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">No translation</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt.id} value={opt.id.toString()}>
            <p>
              <span>{opt.name}</span> <span className="text-xs font-bold capitalize">({opt.language_name})</span>
            </p>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
