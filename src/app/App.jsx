import { useEffect, Component } from 'react';
import { ToastProvider } from '../components/ui/Toast';
import { appStore } from '../store/appStore';
import { useSettingsLoader } from '../hooks/useSettingsLoader';
import AppRoutes from './AppRoutes';

// 1. Error Boundary to catch routing crashes
class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red', background: '#ffeeee', zIndex: 99999 }}>
          <h1>AppRoutes Crashed!</h1>
          <pre>{this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppInitializer() {
  const { loading } = useSettingsLoader();

  useEffect(() => {
    appStore.initTheme();
    return undefined;
  }, []);

  // Debug: Print the loading state to the console
  console.log("AppInitializer loading state:", loading);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-secondary dark:bg-black">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <p className="text-sm font-medium text-gray-500">Loading Retailer...</p>
          {/* VISIBLE DEBUG: If this shows, useSettingsLoader is stuck */}
          <p style={{ fontSize: 10, color: 'gray' }}>Debug: loading is true</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* VISIBLE DEBUG: If this shows but screen is blank, AppRoutes is empty */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, background: 'green', color: 'white', padding: 5, zIndex: 9999, fontSize: 10 }}>
        AppRoutes is Mounted
      </div>
      <AppErrorBoundary>
        <AppRoutes />
      </AppErrorBoundary>
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInitializer />
    </ToastProvider>
  );
}
