import React, { useEffect, useRef } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Bell, CheckCircle, AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react';

const NotificationPanel: React.FC = () => {
  const { notifications, acknowledgeNotification } = useSimulation();
  const notificationEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new notifications arrive
  useEffect(() => {
    if (notificationEndRef.current) {
      notificationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [notifications]);
  
  const getNotificationIcon = (level: string) => {
    switch (level) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Bell className="h-5 w-5 mr-2 text-red-600" />
          XCELS Notifications
        </h2>
        <span className="bg-gray-900 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full border border-red-900">
          {notifications.length}
        </span>
      </div>
      
      <div className="h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {notifications.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Shield className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-md border-l-4 ${
                  notification.read ? 'bg-gray-900 bg-opacity-50' : 'bg-gray-900'
                } ${
                  notification.level === 'info'
                    ? 'border-blue-500'
                    : notification.level === 'warning'
                    ? 'border-amber-500'
                    : notification.level === 'error'
                    ? 'border-red-600'
                    : 'border-green-500'
                }`}
              >
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    {getNotificationIcon(notification.level)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-400' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {notification.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${notification.read ? 'text-gray-500' : 'text-gray-300'}`}>
                      {notification.message}
                    </p>
                    
                    {!notification.read && (
                      <div className="mt-2 flex justify-between items-center">
                        <button
                          className="text-xs text-red-600 hover:text-red-500 flex items-center"
                          onClick={() => acknowledgeNotification(notification.id)}
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Acknowledge
                        </button>
                        
                        <span className="text-xs text-gray-500">
                          XCELS-NOTIF-{notification.id.substring(0, 6)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={notificationEndRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
