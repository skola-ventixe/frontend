import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import Nav from "@/components/nav/nav";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-grid">
      <Nav />
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export default MainLayout;
