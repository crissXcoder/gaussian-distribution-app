import { useState, useEffect } from 'react';
import { generateSkewedNormalData } from '../utils/distributionUtils';

/**
 * Hook personalizado para manejar los datos de distribución gaussiana
 */
export const useGaussianData = () => {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [skewness, setSkewness] = useState(0);
  const [distributionData, setDistributionData] = useState({ data: [], statistics: {} });

  // Regenerar datos cuando cambian los parámetros
  useEffect(() => {
    const newData = generateSkewedNormalData(mean, stdDev, skewness);
    setDistributionData(newData);
  }, [mean, stdDev, skewness]);

  return {
    mean,
    setMean,
    stdDev,
    setStdDev,
    skewness,
    setSkewness,
    distributionData
  };
};