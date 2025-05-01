
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AcronymLoadingState from "@/components/resources/AcronymLoadingState";
import AcronymErrorState from "@/components/resources/AcronymErrorState";
import AcronymDetailCard from "@/components/resources/AcronymDetailCard";
import { AnimatePresence, motion } from "framer-motion";
import { useAcronymDetail } from "@/hooks/useAcronymDetail";

const AcronymDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const {
    acronym,
    loading,
    error,
    userInteracted,
    handleCopyLink,
    handleLike,
    handleDislike
  } = useAcronymDetail(slug);

  return (
    <>
      <Helmet>
        <title>
          {acronym ? `${acronym.acronym} - ${acronym.full_name}` : loading ? "Loading..." : "Acronym Details"} | SAPP Security
        </title>
        <meta 
          name="description" 
          content={acronym ? `Learn about ${acronym.acronym} (${acronym.full_name}) in the security industry` : "Technical acronym details"} 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-slate-50 pt-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <AcronymLoadingState />
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AcronymErrorState error={error} />
              </motion.div>
            ) : acronym && (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <AcronymDetailCard
                  acronym={acronym}
                  userInteracted={userInteracted}
                  handleCopyLink={handleCopyLink}
                  handleLike={handleLike}
                  handleDislike={handleDislike}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
      
      <Footer />
    </>
  );
};

export default AcronymDetail;
