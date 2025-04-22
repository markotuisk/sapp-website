
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AcronymsResource from "@/components/resources/AcronymsResource";

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Technical Resources - SAPP Security</title>
      </Helmet>
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Resources</h1>
        <AcronymsResource />
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
