import { useState, useEffect } from 'react';
import { getAllVersions, getComponentVersion, VersionInfo } from '@/lib/versionTracker';
import { useQuery } from '@tanstack/react-query';
import { getActualPages } from '@/components/version-info/utils';

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
      const actualPages = getActualPages();
      
      setBuildInfo({
        currentBuild: coreComponent.version,
        buildDate: coreComponent.initial_date,
        lastUpdated: coreComponent.last_update,
        frameworkVersion: 'React 18.3.1',
        tailwindVersion: '2.5.2',
        componentCount: versions.length,
        totalPages: actualPages.length,
        totalServices: 19, // Update to match the length of technicalServices array in calculateCodebaseMetrics
        supportedLanguages: 4
      });
    }
  }, [versions]);

  return { buildInfo, isLoading, error, refetch };
};
