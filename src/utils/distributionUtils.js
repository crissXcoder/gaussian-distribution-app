/**
 * Genera datos para una distribución normal con asimetría ajustable
 * @param {number} mean - Media de la distribución
 * @param {number} stdDev - Desviación estándar
 * @param {number} skewness - Asimetría (-1 a 1, 0 es simétrica)
 * @param {number} sampleSize - Cantidad de puntos a generar
 * @returns {Array} - Puntos x,y para dibujar la distribución
 */
export const generateSkewedNormalData = (mean = 0, stdDev = 1, skewness = 0, sampleSize = 100) => {
    const data = [];
    const range = stdDev * 4;
    const step = (range * 2) / sampleSize;
    
    // Determinar los valores relativos para moda, mediana y media basados en asimetría
    let modePosition, medianPosition, meanPosition;
    
    // Para una distribución normal sin sesgo, todos coinciden
    if (skewness === 0) {
      modePosition = mean;
      medianPosition = mean;
      meanPosition = mean;
    } 
    // Para sesgo positivo (cola a la derecha)
    else if (skewness > 0) {
      const shift = skewness * stdDev * 2;
      modePosition = mean - shift * 0.7;
      medianPosition = mean - shift * 0.3;
      meanPosition = mean;
    } 
    // Para sesgo negativo (cola a la izquierda)
    else {
      const shift = Math.abs(skewness) * stdDev * 2;
      modePosition = mean + shift * 0.7;
      medianPosition = mean + shift * 0.3;
      meanPosition = mean;
    }
  
    // Generar puntos de la distribución con la asimetría deseada
    for (let i = 0; i < sampleSize; i++) {
      const x = mean - range + i * step;
      
      // Función base normal
      let y = Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI));
      
      // Aplicar asimetría mediante una transformación
      if (skewness !== 0) {
        const skewFactor = 1 + skewness * (x - mean) / stdDev;
        y = y * Math.max(0.1, skewFactor);
      }
      
      data.push({ x, y });
    }
  
    return {
      data,
      statistics: {
        mean: meanPosition,
        median: medianPosition,
        mode: modePosition
      }
    };
  };
  
  /**
   * Obtiene un nombre descriptivo para el tipo de distribución según su asimetría
   * @param {number} skewness - Valor de asimetría
   * @returns {string} - Descripción de la distribución
   */
  export const getDistributionType = (skewness) => {
    if (skewness < -0.05) return "Asimetría Negativa";
    if (skewness > 0.05) return "Asimetría Positiva";
    return "Normal (sin asimetría)";
  };