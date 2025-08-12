export default function RaceSubrace({ data }) {
  if (!data) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Subraces</h2>
      {data.subraces && data.subraces.length > 0 ? (
        <ul className="list-disc list-inside">
          {data.subraces.map((subrace, idx) => (
            <li key={idx}>
              <strong>{subrace.name}</strong>:{" "}
              {subrace.description || "No description"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No subraces available.</p>
      )}
    </section>
  );
}
