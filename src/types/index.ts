export interface User {
  id: string;
  name: string;
  email: string;
  documents: Document[];
}

export interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  benefits: string[];
  applicationDeadline?: string;
}

export interface Document {
  id: string;
  type: string;
  status: 'pending' | 'verified' | 'rejected';
  url: string;
  uploadedAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
} 