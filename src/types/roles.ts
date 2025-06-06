
export type AppRole = 'admin' | 'client' | 'manager' | 'support';

export interface UserProfile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  phone_country_code?: string;
  phone_local_number?: string;
  organization_type?: string;
  department?: string;
  job_title?: string;
  avatar_url?: string;
  organization_id?: string;
  created_at: string;
  updated_at: string;
  organization?: {
    id: string;
    name: string;
    description?: string;
  };
}

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  assigned_at: string;
  assigned_by?: string;
}

export interface ClientData {
  id: string;
  user_id: string;
  organization_id?: string;
  company_name?: string;
  industry?: string;
  company_size?: string;
  subscription_tier: string;
  account_status: string;
  created_at: string;
  updated_at: string;
}

export interface UserWithProfile {
  id: string;
  email: string;
  profile?: UserProfile;
  roles: AppRole[];
  clientData?: ClientData;
}
