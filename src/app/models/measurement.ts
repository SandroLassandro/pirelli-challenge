/**
 * Telemetry measurement
 */
export interface IMeasurement {
  /**
   * Timestamp
   */
  timestamp: Date;
  /**
   * Pressure
   */
  pressure: number;
  /**
   * Position of the tyre
   */
  position: string;
  /**
   * Temperature
   */
  temperature: number;
  /**
   * Omega
   */
  omega: number;
  /**
   * Speed
   */
  speed: number;
  /**
   * Identifier of the car
   */
  carId: string;
}
