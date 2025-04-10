import React from 'react';

const StatisticalMeasures = ({ statistics }) => {
  const { mean, median, mode } = statistics;
  
  return (
    <div className="measures-container">
      <h3>Medidas estadísticas</h3>
      <div className="measures">
        <div className="measure">
          <span className="measure-dot" style={{ backgroundColor: '#03045E' }}></span>
          <span>Moda: {mode ? mode.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="measure">
          <span className="measure-dot" style={{ backgroundColor: '#0077B6' }}></span>
          <span>Mediana: {median ? median.toFixed(2) : 'N/A'}</span>
        </div>
        <div className="measure">
          <span className="measure-dot" style={{ backgroundColor: '#00B4D8' }}></span>
          <span>Media: {mean ? mean.toFixed(2) : 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticalMeasures;