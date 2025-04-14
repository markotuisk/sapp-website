
const FeaturesSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-sapp-blue/10 rounded-full px-4 py-1.5 mb-4">
            <h3 className="text-sm font-medium text-sapp-blue tracking-wider">Our Approach</h3>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6">
            Comprehensive Digital Protection
          </h2>
          
          <p className="text-sapp-gray max-w-3xl mx-auto mb-8">
            Our multi-layered approach to cyber security ensures comprehensive protection for your digital infrastructure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/ccaa80f3-bbe5-46f3-a853-d7007fbff022.png"
                alt="Threat Detection" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Threat Detection & Response</h3>
              <p className="text-sapp-gray text-sm">
                Our advanced threat detection systems identify and neutralize cyber threats before they can impact your business.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/fc9a9c2e-5129-4b70-89e2-7617a4e5578a.png"
                alt="Data Encryption" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Data Encryption & Protection</h3>
              <p className="text-sapp-gray text-sm">
                We implement robust encryption protocols to ensure your sensitive data remains secure at all times.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-md overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img 
                src="/lovable-uploads/85184084-bca0-497c-8950-601f002a465f.png"
                alt="Security Training" 
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-sapp-dark mb-3">Security Awareness Training</h3>
              <p className="text-sapp-gray text-sm">
                We provide comprehensive security training to help your team recognize and avoid potential security threats.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
