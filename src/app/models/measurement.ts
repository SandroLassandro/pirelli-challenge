/**
 * Telemetry measurement
 */
export interface IMeasurement {
  timeStamp: Date;
  pressure: number;
  position: ITyrePosition;
  temperature: number;
  omega: number;
  speed: number;
  carId: string;
}

/**
 * Tyre position
 */
export enum ITyrePosition {
  FrontLeft = 'Front Left',
  RearLeft = 'Rear Left',
  RearRight = 'Rear Right',
  FrontRight = 'Front Right'
}