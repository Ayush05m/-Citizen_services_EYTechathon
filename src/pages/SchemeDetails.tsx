import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { schemes } from '@/services/api';
import { Scheme } from '@/types';

export default function SchemeDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: scheme, isLoading } = useQuery<Scheme>(
    ['scheme', id],
    () => id ? schemes.getById(id) : Promise.reject('No ID provided')
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!scheme) {
    return <div>Scheme not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{scheme.title}</h1>
        <p className="text-gray-600 mb-6">{scheme.description}</p>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Eligibility Criteria</h2>
            <ul className="list-disc pl-5 space-y-2">
              {scheme.eligibilityCriteria.map((criteria: string, index: number) => (
                <li key={index}>{criteria}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Required Documents</h2>
            <ul className="list-disc pl-5 space-y-2">
              {scheme.requiredDocuments.map((doc: string, index: number) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Benefits</h2>
            <ul className="list-disc pl-5 space-y-2">
              {scheme.benefits.map((benefit: string, index: number) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </section>

          {scheme.applicationDeadline && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <p className="font-semibold">
                Application Deadline: {new Date(scheme.applicationDeadline).toLocaleDateString()}
              </p>
            </div>
          )}

          <div className="mt-8">
            <button className="btn-primary">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
} 