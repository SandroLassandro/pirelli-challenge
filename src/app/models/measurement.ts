/**
 * Telemetry measurement
 */
export interface IMeasurement {
  timestamp: Date;
  pressure: number;
  position: string;
  // position: TyrePosition;
  temperature: number;
  omega: number;
  speed: number;
  carId: string;
}

/**
 * Tyre position
 */
export enum TyrePosition {
  FrontLeft = 'Front Left',
  RearLeft = 'Rear Left',
  RearRight = 'Rear Right',
  FrontRight = 'Front Right'
}

/**
 * Telemetry measurements grouped by carId
 */
export type Measurements = { [carId: string]: IMeasurement[] };