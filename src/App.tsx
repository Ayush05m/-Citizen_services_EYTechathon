import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard';
import SchemeDetails from './pages/SchemeDetails';
import DocumentVerification from './pages/DocumentVerification';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schemes/:id" element={<SchemeDetails />} />
              <Route path="/verify-documents" element={<DocumentVerification />} />
            </Routes>
          </Layout>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
