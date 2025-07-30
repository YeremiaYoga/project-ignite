import dynamic from "next/dynamic";
import path from "path";
import fs from "fs/promises";

export default async function ClassPage({ params }) {
  const { className } = params;

  try {
    const classPath = path.join(process.cwd(), "data/classes", className);

    const [tableData, coreTraits, classFeatures, subclassData] = await Promise.all([
      import(`@/data/classes/${className}/tableData.js`).then(m => m.default),
      import(`@/data/classes/${className}/coreTraits.js`).then(m => m.default),
      import(`@/data/classes/${className}/classFeatures.js`).then(m => m.default).catch(() => null),
      import(`@/data/classes/${className}/subclassData.js`).then(m => m.default).catch(() => null),
    ]);

    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold capitalize">{className}</h1>
        <pre className="mt-4 text-sm bg-gray-900 p-4 rounded">
          {JSON.stringify({ tableData, coreTraits, classFeatures, subclassData }, null, 2)}
        </pre>
      </main>
    );
  } catch (err) {
    return (
      <main className="p-6 text-red-500">
        <h1>Error loading class: {className}</h1>
        <p>{err.message}</p>
      </main>
    );
  }
}
