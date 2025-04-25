import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from 'lucide-react';

const AboutSAPP = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const { t } = useLanguage();

  const features = [
    {
      title: t('innovativeSolutions'),
      description: t('innovativeSolutionsDescription'),
      icon: <Rocket className="h-6 w-6 text-sapp-blue" />,
    },
    {
      title: t('clientCentricApproach'),
      description: t('clientCentricApproachDescription'),
      icon: <Rocket className="h-6 w-6 text-sapp-blue" />,
    },
    {
      title: t('globalExpertise'),
      description: t('globalExpertiseDescription'),
      icon: <Rocket className="h-6 w-6 text-sapp-blue" />,
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span 
            ref={ref}
            className={cn(
              "inline-block mb-4 transition-all duration-500",
              inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            )}
          >
            <h3 className="uppercase text-sapp-blue text-[19px] leading-[77px] tracking-[3.62px] font-medium">
              FOUNDERS ON A MISSION
            </h3>
          </span>
          <h2 
            className={cn(
              "text-3xl md:text-4xl font-display font-bold text-sapp-dark mb-6 transition-all duration-500 delay-100",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="text-[#20798C]">{t('aboutSappTitle')}</span>
          </h2>
          <p 
            className={cn(
              "text-sapp-gray text-lg transition-all duration-500 delay-200",
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {t('aboutSappDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-gray-100 flex flex-col">
              <CardHeader>
                {feature.icon}
                <CardTitle className="text-xl text-sapp-dark mt-3">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-sapp-gray text-sm min-h-[80px]">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSAPP;
