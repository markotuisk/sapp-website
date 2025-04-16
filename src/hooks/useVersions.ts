import { useState, useEffect } from 'react';
import { getAllVersions, getComponentVersion, VersionInfo } from '@/lib/versionTracker';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook to fetch all component versions
 */
export const useAllVersions = () => {
  return useQuery({
    queryKey: ['versions'],
    queryFn: getAllVersions,
    refetchOnWindowFocus: false,
  });
};

/**
 * Custom hook to fetch a specific component's version info
 */
export const useComponentVersion = (componentId: string) => {
  return useQuery({
    queryKey: ['version', componentId],
    queryFn: () => getComponentVersion(componentId),
    refetchOnWindowFocus: false,
    enabled: !!componentId,
  });
};

/**
 * Custom hook to get build information from all version data
 */
export const useBuildInfo = () => {
  const { data: versions, isLoading, error, refetch } = useAllVersions();
  const [buildInfo, setBuildInfo] = useState({
    currentBuild: '',
    buildDate: '',
    lastUpdated: '',
    frameworkVersion: 'React 18.3.1',
    tailwindVersion: '2.5.2',
    componentCount: 0,
    totalPages: 0,
    totalServices: 8,
    supportedLanguages: 4
  });

  useEffect(() => {
    if (versions && versions.length > 0) {
      // Find the core app component or use the first component
      const coreComponent = versions.find(v => v.component_id === 'app-core') || versions[0];
      
      // Count different types of components
      let totalPages = 0;
      let totalServices = 0;
      let supportedLanguages = 4; // English, German, Dutch, French
      
      versions.forEach(component => {
        const id = component.component_id.toLowerCase();
        
        if (id.includes('page') || 
            id.includes('index') || 
            id.endsWith('-hero') || 
            id.includes('audit-') ||
            id.includes('cyber-') || 
            id.includes('event-') || 
            id.includes('install-')) {
          totalPages++;
        }
        
        if (id.includes('service') || 
            id.includes('feature') || 
            id.includes('capabilities') ||
            id.includes('solution')) {
          totalServices++;
        }
      });
      
      setBuildInfo({
        currentBuild: coreComponent.version,
        buildDate: coreComponent.initial_date,
        lastUpdated: coreComponent.last_update,
        frameworkVersion: 'React 18.3.1',
        tailwindVersion: '2.5.2',
        componentCount: versions.length,
        totalPages,
        totalServices,
        supportedLanguages
      });
    }
  }, [versions]);

  return { buildInfo, isLoading, error, refetch };
};
