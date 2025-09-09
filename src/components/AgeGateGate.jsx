// Server Component (JS)
import { cookies } from 'next/headers';
import AgeYearOverlay from '../components/AgeYearOverlay';

export default async function AgeGateGate() {
  const cookieStore = await cookies(); // await in Next 15 [docs]
  const verified = cookieStore.get('age_verified')?.value === '1';
  if (verified) return null;
  return <AgeYearOverlay />;
}
