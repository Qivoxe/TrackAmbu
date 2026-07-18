export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface Ambulance {
  id: string;
  driverName: string;
  hospital: string;
  location: Location;
  status: 'available' | 'dispatched' | 'arrived' | 'enroute_hospital';
  type: 'BLS' | 'ALS' | 'ICU';
  eta?: number;
}

export interface Hospital {
  id: string;
  name: string;
  location: Location;
  specialties: string[];
  distance?: number;
}

export interface Booking {
  id: string;
  patientName: string;
  emergencyType: string;
  location: Location;
  status: 'pending' | 'confirmed' | 'picked_up' | 'delivered';
  ambulance?: Ambulance;
  hospital?: Hospital;
  createdAt: Date;
}

export interface CitizenAlert {
  id: string;
  ambulanceId: string;
  route: Location[];
  radius: number;
  message: string;
  timestamp: Date;
}
