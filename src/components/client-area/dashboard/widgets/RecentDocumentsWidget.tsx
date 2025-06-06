
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  FileText, 
  Download, 
  Eye, 
  ExternalLink,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface RecentDocument {
  id: string;
  file_name: string;
  custom_name?: string;
  document_type: 'file' | 'link';
  external_url?: string;
  last_downloaded_at?: string;
  download_count: number;
  created_at: string;
  file_size?: number;
  mime_type: string;
}

interface RecentDocumentsWidgetProps {
  compact?: boolean;
  maxItems?: number;
}

export const RecentDocumentsWidget: React.FC<RecentDocumentsWidgetProps> = ({
  compact = false,
  maxItems = 5
}) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<RecentDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchRecentDocuments();
    }
  }, [user]);

  const fetchRecentDocuments = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('client_documents')
        .select('*')
        .eq('user_id', user?.id)
        .order('last_downloaded_at', { ascending: false, nullsLast: true })
        .order('created_at', { ascending: false })
        .limit(maxItems);

      if (error) throw error;

      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching recent documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown size';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  };

  const getFileIcon = (mimeType: string, documentType: string) => {
    if (documentType === 'link') {
      return ExternalLink;
    }
    
    if (mimeType.includes('image')) return Eye;
    if (mimeType.includes('pdf')) return FileText;
    if (mimeType.includes('document') || mimeType.includes('word')) return FileText;
    return FileText;
  };

  const handleDocumentAction = async (doc: RecentDocument) => {
    if (doc.document_type === 'link') {
      window.open(doc.external_url || doc.file_name, '_blank');
    } else {
      // Handle file download
      try {
        const { data, error } = await supabase.storage
          .from('client-documents')
          .download(doc.file_name);

        if (error) throw error;

        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = doc.custom_name || doc.file_name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Update download count
        await supabase
          .from('client_documents')
          .update({
            download_count: doc.download_count + 1,
            last_downloaded_at: new Date().toISOString(),
          })
          .eq('id', doc.id);

        fetchRecentDocuments();
      } catch (error) {
        console.error('Error downloading document:', error);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader className={compact ? "pb-2" : ""}>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className={`flex items-center gap-2 ${compact ? "text-lg" : ""}`}>
              <FileText className="h-5 w-5" />
              Recent Documents
            </CardTitle>
            {!compact && (
              <CardDescription>
                Your most recently accessed documents
              </CardDescription>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={fetchRecentDocuments}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className={compact ? "pt-0" : ""}>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No documents yet</p>
            <p className="text-sm">Documents you access will appear here</p>
          </div>
        ) : (
          <ScrollArea className={compact ? "h-48" : "h-64"}>
            <div className="space-y-3">
              {documents.map((doc) => {
                const IconComponent = getFileIcon(doc.mime_type, doc.document_type);
                const displayName = doc.custom_name || doc.file_name;
                const lastAccessed = doc.last_downloaded_at || doc.created_at;
                
                return (
                  <div key={doc.id} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 group">
                    <div className="p-2 bg-blue-100 rounded">
                      <IconComponent className="h-4 w-4 text-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`${compact ? 'text-sm' : ''} font-medium text-gray-900 truncate`}>
                        {displayName}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {doc.document_type}
                        </Badge>
                        
                        {doc.document_type === 'file' && (
                          <span className="text-xs text-gray-500">
                            {formatFileSize(doc.file_size)}
                          </span>
                        )}
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(new Date(lastAccessed), { addSuffix: true })}
                        </div>
                      </div>
                      
                      {doc.download_count > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          <Download className="h-3 w-3 inline mr-1" />
                          {doc.download_count} download{doc.download_count !== 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDocumentAction(doc)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {doc.document_type === 'link' ? (
                        <ExternalLink className="h-4 w-4" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
