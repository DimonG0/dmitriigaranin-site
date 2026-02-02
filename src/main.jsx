import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';

// Проверка поддержки браузером необходимых API
const checkBrowserCompatibility = () => {
  const errors = [];
  
  if (typeof window === 'undefined') {
    errors.push('This application requires a browser environment');
  }
  
  if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported. Some animations may not work.');
  }
  
  if (!window.ResizeObserver) {
    console.warn('ResizeObserver not supported. Some layout features may be limited.');
  }
  
  return errors;
};

// Анализ производительности и предупреждения
const performanceCheck = () => {
  if (import.meta.env.PROD) {
    // Только в production режиме
    const hasHardwareAcceleration = 
      'accelerometer' in window || 
      'gyroscope' in window ||
      'getGamepads' in navigator;
    
    if (!hasHardwareAcceleration) {
      console.info('For optimal experience, enable hardware acceleration in your browser');
    }
  }
};

// Инициализация приложения
const initApp = () => {
  try {
    // Проверка совместимости браузера
    const compatibilityErrors = checkBrowserCompatibility();
    if (compatibilityErrors.length > 0) {
      console.error('Browser compatibility issues:', compatibilityErrors);
    }
    
    // Проверка производительности
    performanceCheck();
    
    // Поиск корневого элемента
    const rootElement = document.getElementById('root');
    
    if (!rootElement) {
      throw new Error('Root element not found. Make sure there is a <div id="root"></div> in index.html');
    }
    
    // Проверка структуры DOM перед монтированием
    if (!document.head.querySelector('meta[name="viewport"]')) {
      console.warn('Viewport meta tag is missing. Responsive design may not work properly.');
    }
    
    // Создание корня React
    const root = ReactDOM.createRoot(rootElement);
    
    // Отображение приложения
    root.render(
      <React.StrictMode>
        <ErrorBoundary fallback={
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#0a0a0a',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            zIndex: 9999
          }}>
            <div>
              <h1 style={{ color: '#D4AF37', marginBottom: '1rem' }}>Critical Error</h1>
              <p>The application failed to load. Please refresh the page or contact support.</p>
              <button 
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '2rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#D4AF37',
                  color: '#0a0a0a',
                  border: 'none',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em'
                }}
              >
                Reload Application
              </button>
            </div>
          </div>
        }>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    
    // Логирование успешного запуска
    console.log(`%c Dmitrii Garanin Portfolio`, 
      'background: #0a0a0a; color: #D4AF37; font-size: 16px; font-weight: bold; padding: 8px; border: 1px solid #D4AF37;');
    console.log('%c Application initialized successfully', 'color: #4CAF50; font-weight: bold;');
    
    // Отслеживание ошибок ресурсов
    window.addEventListener('error', (event) => {
      if (event.target.tagName === 'IMG' || event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK') {
        console.warn(`Resource failed to load: ${event.target.src || event.target.href}`);
      }
    }, true);
    
    // Обработка offline состояния
    window.addEventListener('offline', () => {
      console.warn('Network connection lost. Some features may not work.');
    });
    
    window.addEventListener('online', () => {
      console.info('Network connection restored.');
    });
    
  } catch (error) {
    // Критическая ошибка инициализации
    console.error('Failed to initialize application:', error);
    
    // Отображение fallback UI
    document.body.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #0a0a0a;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        text-align: center;
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div>
          <h1 style="color: #D4AF37; margin-bottom: 1rem; font-size: 2rem;">
            Application Error
          </h1>
          <p style="margin-bottom: 1.5rem; opacity: 0.8;">
            We're experiencing technical difficulties.
          </p>
          <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 0.5rem; margin-bottom: 2rem;">
            <code style="color: #ff6b6b; font-size: 0.9rem;">
              ${error.message}
            </code>
          </div>
          <div>
            <button onclick="window.location.reload()" style="
              padding: 0.75rem 1.5rem;
              background: #D4AF37;
              color: #0a0a0a;
              border: none;
              border-radius: 9999px;
              cursor: pointer;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              margin-right: 1rem;
            ">
              Try Again
            </button>
            <button onclick="window.location.href='mailto:support@dmitriigaranin.com'" style="
              padding: 0.75rem 1.5rem;
              background: transparent;
              color: #D4AF37;
              border: 1px solid #D4AF37;
              border-radius: 9999px;
              cursor: pointer;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            ">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    `;
    
    // Отправка ошибки в систему мониторинга (в production)
    if (import.meta.env.PROD) {
      // Здесь можно интегрировать с Sentry, LogRocket и т.д.
      // sendErrorToMonitoring(error);
    }
  }
};

// Запуск приложения при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Экспорт для тестов и отладки
if (import.meta.env.DEV) {
  window.__REACT_APP_INITIALIZED__ = true;
  window.__REACT_APP_VERSION__ = import.meta.env.VITE_APP_VERSION || 'development';
}