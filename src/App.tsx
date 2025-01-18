import ErrorBoundary from 'components/ErrorBoundary';
import Topbar from 'layout/components/Topbar';
import { AppRoutes } from 'pages/EntryPoints';
import Home from 'pages/Home';
import Providers from 'Providers';
import { useCallback } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  const routes = useCallback(() => [
    ...AppRoutes.filter((route) => route.path && route.component).map((validRoute) => ({
      path: validRoute.path,
      element: <validRoute.component />
    })),
    {
      path: '*',
      element: <Home />
    }
  ], []);

  return (
     <BrowserRouter>
      <ErrorBoundary>
        <Providers>
            <Topbar />
            <Routes>
              {routes().map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
        </Providers>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
