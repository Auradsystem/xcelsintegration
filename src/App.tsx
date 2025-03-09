import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import Layout from './components/Layout';
import ParkingVisualization from './components/ParkingVisualization';
import CameraView from './components/CameraView';
import ControlPanel from './components/ControlPanel';
import NotificationPanel from './components/NotificationPanel';
import StatisticsPanel from './components/StatisticsPanel';
import ActionPlan from './components/ActionPlan';
import ProcessVisualization from './components/ProcessVisualization';

function App() {
  return (
    <SimulationProvider>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ParkingVisualization />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CameraView />
              <div className="space-y-6">
                <ControlPanel />
                <ActionPlan />
              </div>
            </div>
            <ProcessVisualization />
          </div>
          <div className="space-y-6">
            <NotificationPanel />
            <StatisticsPanel />
          </div>
        </div>
      </Layout>
    </SimulationProvider>
  );
}

export default App;
