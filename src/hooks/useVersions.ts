
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
    totalUpdates: 0
  });

  useEffect(() => {
    if (versions && versions.length > 0) {
      // Find the core app component or use the first component
      const coreComponent = versions.find(v => v.component_id === 'app-core') || versions[0];
      
      // Calculate total updates
      const totalUpdates = versions.reduce((total, component) => total + component.update_count, 0);
      
      setBuildInfo({
        currentBuild: coreComponent.version,
        buildDate: coreComponent.initial_date,
        lastUpdated: coreComponent.last_update,
        frameworkVersion: 'React 18.3.1', // These could be stored in DB too if needed
        tailwindVersion: '2.5.2',
        componentCount: versions.length,
        totalUpdates: totalUpdates
      });
    }
  }, [versions]);

  return {
    buildInfo,
    isLoading,
    error,
    refetch // Return the refetch function from useAllVersions
  };
};
