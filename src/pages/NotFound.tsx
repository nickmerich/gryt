
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isApiRoute = location.pathname.startsWith('/api/');
  const isIntegrationRoute = location.pathname.includes('/auth/');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Page Not Found
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            {isApiRoute 
              ? "The API endpoint you're trying to access doesn't exist."
              : isIntegrationRoute
              ? "This integration endpoint is not available. Please check your integration setup."
              : "Sorry, we couldn't find the page you're looking for."
            }
          </p>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500 font-mono break-all">
              {location.pathname}
            </p>
          </div>

          {isIntegrationRoute && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                If you're trying to connect an integration, please go to the Integrations page and try again.
              </p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button 
              asChild 
              className="flex-1"
              variant="default"
            >
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="flex-1"
              onClick={() => window.history.back()}
            >
              <span className="flex items-center justify-center gap-2 cursor-pointer">
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </span>
            </Button>
          </div>

          {isIntegrationRoute && (
            <Button asChild variant="secondary" className="w-full">
              <Link to="/integrations" className="flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                View Integrations
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
