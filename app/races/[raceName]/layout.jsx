import ClientRacesLayout from "./ClientRacesLayout";

export default async function Layout({ children, params }) {
  const { raceName } = await params;
  return (
    <ClientRacesLayout currentRace={raceName}>
      {children}
    </ClientRacesLayout>
  );
}
