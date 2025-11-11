// src/app/ai-dashboard/page.tsx
import { fetchAllIPOs } from "@/lib/api";
import AIDashboard from "@/components/AIDashboard";

export const revalidate = 300;

export default async function AIDashboardPage() {
  const allIPOs = await fetchAllIPOs();

  return <AIDashboard allIpos={allIPOs} />;
}