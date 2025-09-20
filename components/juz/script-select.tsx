'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScriptOption {
  value: string;
  label: string;
  description: string;
}

export function ScriptSelect({ script, options }: { script: string; options: ScriptOption[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('script', value);
    params.set('page', params.get('page') ?? '1');
    const translations = params.get('translations');
    if (translations) {
      params.set('translations', translations);
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={script} onValueChange={handleChange}>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select script" />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
