
const ImageBannerSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="relative rounded-xl overflow-hidden">
          <img 
            src="/lovable-uploads/234f523c-dec6-4bb9-8b48-d308fc61a7ec.png"
            alt="Security Audit Technology" 
            className="w-full h-64 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sapp-dark/70 to-transparent flex items-center">
            <div className="px-10 max-w-lg">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                Identify Security Vulnerabilities
              </h3>
              <p className="text-white/90">
                Our comprehensive audits help you identify and address security gaps before they can be exploited.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageBannerSection;
