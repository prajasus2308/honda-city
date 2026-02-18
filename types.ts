export enum TrimLevel {
  SV = 'SV',
  V = 'V',
  VX = 'VX',
  ZX = 'ZX'
}

export type FuelType = 'Petrol' | 'Diesel';

export interface CarFeature {
  title: string;
  description: string;
  icon: string;
}

export interface CarSpecs {
    transmission: string;
    mileage: string;
    power: string;
    torque: string;
    fuelType: string;
}

// The resolved object used by UI components
export interface CarVariant {
  name: TrimLevel;
  price: string;
  features: string[];
  engine: string;
  description?: string;
  specs?: CarSpecs;
}

// The source data structure holding both fuel types
export interface VariantDefinition {
  name: TrimLevel;
  features: string[];
  description: string;
  config: {
    [key in FuelType]: {
      price: string;
      engine: string;
      specs: CarSpecs;
    }
  }
}

export interface CarColor {
  name: string;
  hex: string;
  bgGradient: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isLoading?: boolean;
}