
import { Helmet } from 'react-helmet-async';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Page Not Found | SAPP Security</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <PublicLayout>
        <div className="py-16 bg-slate-50 min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-8xl font-bold text-sapp-blue mb-4">404</div>
              <h1 className="text-4xl font-display font-bold text-sapp-dark mb-4">Page Not Found</h1>
              <p className="text-sapp-gray text-lg mb-8">
                Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-sapp-blue hover:bg-sapp-blue/90">
                  <Link to="/">
                    <Home className="h-4 w-4 mr-2" />
                    Back to Homepage
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/news">
                    <Search className="h-4 w-4 mr-2" />
                    Browse News
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </div>
  );
};

export default NotFound;
