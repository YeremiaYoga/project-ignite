// layout.jsx (server component)
import ClientClassesLayout from "./ClientClassesLayout";

export default function Layout({ children, params }) {
  return (
    <ClientClassesLayout currentClass={params.className}>
      {children}
    </ClientClassesLayout>
  );
}
