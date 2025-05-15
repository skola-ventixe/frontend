import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Nav from "@/components/nav/nav";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-grid">
      <Nav />
      <Header />
      <main className="flex-grow p-4">{children}</main>
      <Footer />
    </div>
  );
}
export default MainLayout;
