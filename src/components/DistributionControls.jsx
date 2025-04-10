import React from 'react';
import { getDistributionType } from '../utils/distributionUtils';

const DistributionControls = ({ 
  skewness, 
  setSkewness, 
  stdDev, 
  setStdDev, 
  mean, 
  setMean 
}) => {
  return (
    <div className="controls-container">
      <h3>Controles de la distribución</h3>
      
      <div className="distribution-type">
        <h4>{getDistributionType(skewness)}</h4>
      </div>
      
      <div className="control">
        <label>Asimetría ({skewness.toFixed(2)})</label>
        <input
          type="range"
          className="slider"
          min="-1"
          max="1"
          step="0.05"
          value={skewness}
          onChange={(e) => setSkewness(parseFloat(e.target.value))}
        />
        <div className="slider-labels">
          <span>-1</span>
          <span>0</span>
          <span>1</span>
        </div>
      </div>
      
      <div className="control">
        <label>Media ({mean.toFixed(2)})</label>
        <input
          type="range"
          className="slider"
          min="-5"
          max="5"
          step="0.5"
          value={mean}
          onChange={(e) => setMean(parseFloat(e.target.value))}
        />
      </div>
      
      <div className="control">
        <label>Desviación estándar ({stdDev.toFixed(2)})</label>
        <input
          type="range"
          className="slider"
          min="0.5"
          max="3"
          step="0.1"
          value={stdDev}
          onChange={(e) => setStdDev(parseFloat(e.target.value))}
        />
      </div>
      
      <div className="help-text">
        <p>
          <strong>Asimetría:</strong> Controla el sesgo de la distribución.<br />
          <strong>Media:</strong> Desplaza toda la distribución.<br />
          <strong>Desviación estándar:</strong> Controla el ancho de la campana.
        </p>
      </div>
    </div>
  );
};

export default DistributionControls;