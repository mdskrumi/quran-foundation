import { Fetch } from '@/lib/fetch';

export default async function Page() {
  const response = await Fetch({ endpoint: 'chapters' });

  console.log(response.data);

  return <div>asdasd</div>;
}
