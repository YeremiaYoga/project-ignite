import ClientClassesLayout from "./ClientClassesLayout";

export default async function Layout({ children, params }) {
  const { className } = await params;
  return (
    <ClientClassesLayout currentClass={className}>
      {children}
    </ClientClassesLayout>
  );
}
