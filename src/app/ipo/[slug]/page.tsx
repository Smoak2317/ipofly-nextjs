import { notFound } from "next/navigation";
import { fetchAllIPOs, fetchIPOBySlug, slugify } from "@/lib/api";
import { generateIPOMetadata, generateStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo";
import IpoDetail from "@/components/IpoDetail";
import Link from "next/link";

export const revalidate = 300;

export async function generateStaticParams() {
  const ipos = await fetchAllIPOs();
  return ipos.map((ipo) => ({
    slug: slugify(ipo.name),
  }));
}

// ✅ FIXED FOR NEXT.JS 15
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const ipo = await fetchIPOBySlug(params.slug);

  if (!ipo) {
    return { title: "IPO Not Found | IpoFly" };
  }

  return generateIPOMetadata(ipo);
}

// ✅ FIXED FOR NEXT.JS 15
export default async function IPOPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const ipo = await fetchIPOBySlug(params.slug);

  if (!ipo) {
    notFound();
  }

  const structuredData = generateStructuredData(ipo);
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: "Home", url: "https://smoak2317.github.io/ipofly-frontend" },
    { name: "IPOs", url: "https://smoak2317.github.io/ipofly-frontend" },
    { name: ipo.name, url: `https://smoak2317.github.io/ipofly-frontend/ipo/${params.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Home</Link></li>
          <li className="text-gray-500">/</li>
          <li><Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">IPOs</Link></li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">{ipo.name}</li>
        </ol>
      </nav>

      <IpoDetail ipo={ipo} />
    </>
  );
}