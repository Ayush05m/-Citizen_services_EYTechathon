import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Access Government Services with AI Assistance
        </h1>
        <p className="text-xl text-gray-600">
          Discover eligible schemes, verify documents, and get personalized guidance
          all in one place.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Find Eligible Schemes</h2>
          <p className="text-gray-600 mb-4">
            Our AI system helps you discover government schemes you're eligible for
            based on your profile.
          </p>
          <Link to="/schemes" className="btn-primary inline-block">
            Explore Schemes
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
          <p className="text-gray-600 mb-4">
            Quick and secure document verification using advanced AI technology.
          </p>
          <Link to="/verify-documents" className="btn-primary inline-block">
            Verify Documents
          </Link>
        </div>
      </div>
    </div>
  );
} 