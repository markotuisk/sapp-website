
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Trash2, 
  Users,
  ExternalLink,
  Eye
} from 'lucide-react';
import { format } from 'date-fns';
import type { ClientDocument } from '@/types/profile';

interface DocumentListItemProps {
  document: ClientDocument;
  onShare: (document: ClientDocument) => void;
  onDownload: (document: ClientDocument) => void;
  onDelete: (documentId: string) => void;
  getCategoryColor: (categoryId?: string) => string;
}

export const DocumentListItem: React.FC<DocumentListItemProps> = ({
  document,
  onShare,
  onDownload,
  onDelete,
  getCategoryColor,
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex-shrink-0">
          {document.document_type === 'link' ? (
            <ExternalLink className="h-8 w-8 text-blue-500" />
          ) : (
            <FileText className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium truncate">
              {document.custom_name || document.original_name}
            </h4>
            {document.document_type === 'link' && (
              <Badge variant="outline" className="text-xs">
                Link
              </Badge>
            )}
            {document.is_confidential && (
              <Badge variant="destructive" className="text-xs">
                Confidential
              </Badge>
            )}
            {document.category && (
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ borderColor: getCategoryColor(document.category_id) }}
              >
                {document.category.name}
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">
            {document.document_type === 'file' ? (
              <>
                {formatFileSize(document.file_size)} • 
                Uploaded {format(new Date(document.created_at), 'MMM d, yyyy')} • 
                Downloaded {document.download_count} times
              </>
            ) : (
              <>
                Added {format(new Date(document.created_at), 'MMM d, yyyy')} • 
                Viewed {document.download_count} times
              </>
            )}
          </p>
          {document.description && (
            <p className="text-sm text-gray-600 mt-1 truncate">
              {document.description}
            </p>
          )}
          {document.tags && document.tags.length > 0 && (
            <div className="flex gap-1 mt-2">
              {document.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          onClick={() => onShare(document)}
          size="sm"
          variant="outline"
          title="Share document"
        >
          <Users className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onDownload(document)}
          size="sm"
          variant="outline"
          title={document.document_type === 'link' ? 'Open link' : 'Download'}
        >
          {document.document_type === 'link' ? (
            <Eye className="h-4 w-4" />
          ) : (
            <Download className="h-4 w-4" />
          )}
        </Button>
        <Button
          onClick={() => onDelete(document.id)}
          size="sm"
          variant="outline"
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
