import ClassHeader from "@/components/ClassHeaderName";
import ClassTable from "./ClassTable";
import ClassFeatures from "./ClassFeatures";

export default async function ClassPage({ params }) {
  const className = (await params).className.replace(/-/g, "_");
  try {
    const [classData, classFeatures, subclassData] = await Promise.all([
      import(`@/data/classes/${className}/classData.js`).then((m) => m.default),
      import(`@/data/classes/${className}/classFeatures.js`)
        .then((m) => m.default)
        .catch(() => null),
      import(`@/data/classes/${className}/subclassData.js`)
        .then((m) => m.default)
        .catch(() => null),
    ]);

    return (
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
          <header className="text-left border-b border-gray-700 pb-2">
            <ClassHeader classId={className} />
          </header>

          <section className="text-gray-300 space-y-4 text-sm sm:text-base">
            {classData.descriptionClass.map((desc, i) => {
              if (desc.color === "white") {
                return (
                  <p key={i} className="italic font-medium">
                    {desc.text}
                  </p>
                );
              } else if (desc.color === "gray") {
                return (
                  <p
                    key={i}
                    className="text-xs sm:text-sm text-gray-400 italic"
                  >
                    {desc.text}
                  </p>
                );
              } else {
                return (
                  <p key={i} className="text-sm text-white">
                    {desc.text}
                  </p>
                );
              }
            })}
          </section>

          <div className="overflow-x-auto">
            <ClassTable tableData={classData} nameClass={className} />
          </div>

          <ClassFeatures classId={className} />
        </div>
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
