
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { DocumentListItem } from './DocumentListItem';
import type { ClientDocument } from '@/types/profile';

interface DocumentsListProps {
  documents: ClientDocument[];
  onShare: (document: ClientDocument) => void;
  onDownload: (document: ClientDocument) => void;
  onDelete: (documentId: string) => void;
  getCategoryColor: (categoryId?: string) => string;
}

export const DocumentsList: React.FC<DocumentsListProps> = ({
  documents,
  onShare,
  onDownload,
  onDelete,
  getCategoryColor,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Documents ({documents.length})</CardTitle>
        <CardDescription>
          Manage your uploaded documents and links
        </CardDescription>
      </CardHeader>
      <CardContent>
        {documents.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">No documents found</p>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {documents.map(document => (
              <DocumentListItem
                key={document.id}
                document={document}
                onShare={onShare}
                onDownload={onDownload}
                onDelete={onDelete}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
