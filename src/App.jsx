import React from 'react';
import GaussianDistribution from './components/GaussianDistribution';
import DistributionControls from './components/DistributionControls';
import StatisticalMeasures from './components/StatisticalMeasures';
import Footer from './components/Footer';
import { useGaussianData } from './hooks/useGaussianData';
import './App.css';

function App() {
  const {
    mean,
    setMean,
    stdDev,
    setStdDev,
    skewness,
    setSkewness,
    distributionData
  } = useGaussianData();

  return (
    <div className="app">
      
      <div className="main-content">
        <div className="distribution-display">
          <GaussianDistribution 
            distributionData={distributionData} 
            width={800} 
            height={400} 
          />
          <StatisticalMeasures statistics={distributionData.statistics} />
        </div>
        
        <div className="side-panel">
          <DistributionControls 
            skewness={skewness}
            setSkewness={setSkewness}
            stdDev={stdDev}
            setStdDev={setStdDev}
            mean={mean}
            setMean={setMean}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;