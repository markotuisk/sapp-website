
export interface UserPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  document_notifications: boolean;
  theme: string;
  language: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentCategory {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: string;
  created_at: string;
}

export interface DocumentPermission {
  id: string;
  document_id: string;
  user_id: string;
  permission_type: 'view' | 'download';
  granted_by: string;
  created_at: string;
  user?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

export interface DocumentActivity {
  id: string;
  document_id: string;
  user_id: string;
  activity_type: 'view' | 'download' | 'share' | 'unshare';
  created_at: string;
  metadata?: any;
  user?: {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
  };
}

// Simplified ClientDocument interface that doesn't depend on missing database tables
export interface ClientDocument {
  id: string;
  user_id: string;
  category_id?: string;
  file_name: string;
  original_name: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  description?: string;
  tags?: string[];
  is_confidential: boolean;
  download_count: number;
  last_downloaded_at?: string;
  uploaded_by?: string;
  created_at: string;
  updated_at: string;
  category?: DocumentCategory;
  custom_name?: string;
  document_type: 'file' | 'link';
  external_url?: string;
  permissions?: DocumentPermission[];
  activity?: DocumentActivity[];
}
