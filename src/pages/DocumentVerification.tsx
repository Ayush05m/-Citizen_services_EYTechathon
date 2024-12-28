import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { documents } from '@/services/api';
import { Document } from '@/types';

export default function DocumentVerification() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');

  const { data: userDocuments, refetch } = useQuery<Document[]>(
    'user-documents',
    () => documents.getAll()
  );

  const uploadMutation = useMutation(
    async (formData: FormData) => {
      return documents.upload(formData);
    },
    {
      onSuccess: () => {
        refetch();
        setSelectedFile(null);
        setDocumentType('');
      },
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !documentType) return;

    const formData = new FormData();
    formData.append('document', selectedFile);
    formData.append('type', documentType);
    
    uploadMutation.mutate(formData);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Upload New Document</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select document type</option>
              <option value="aadhar">Aadhar Card</option>
              <option value="pan">PAN Card</option>
              <option value="income">Income Certificate</option>
              <option value="residence">Residence Proof</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="input-field"
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={uploadMutation.isLoading}
          >
            {uploadMutation.isLoading ? 'Uploading...' : 'Upload Document'}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Your Documents</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {userDocuments?.map((doc: Document) => (
            <div key={doc.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold mb-2">{doc.type}</h3>
                  <p className="text-sm text-gray-600">
                    Status: <span className="capitalize">{doc.status}</span>
                  </p>
                </div>
                <span className={`px-2 py-1 rounded text-sm ${
                  doc.status === 'verified' ? 'bg-green-100 text-green-800' :
                  doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 