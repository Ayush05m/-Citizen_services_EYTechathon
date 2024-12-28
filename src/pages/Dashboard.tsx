import { useQuery } from 'react-query';
import { useAppSelector } from '@/hooks/redux';
import { schemes } from '@/services/api';
import { Scheme } from '@/types';

export default function Dashboard() {
  const { user } = useAppSelector(state => state.auth);
  const { data: recommendedSchemes, isLoading } = useQuery<Scheme[]>(
    'recommended-schemes',
    () => schemes.getAll()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg">
            <h3 className="font-semibold mb-2">Documents Status</h3>
            <p>{user?.documents?.length || 0} documents uploaded</p>
          </div>
          <div className="p-4 bg-primary-50 rounded-lg">
            <h3 className="font-semibold mb-2">Profile Completion</h3>
            <p>80% complete</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Recommended Schemes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {recommendedSchemes?.map((scheme: Scheme) => (
            <div key={scheme.id} className="border p-4 rounded-lg">
              <h4 className="font-semibold mb-2">{scheme.title}</h4>
              <p className="text-gray-600 mb-2">{scheme.description}</p>
              <button className="btn-primary">Check Eligibility</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 