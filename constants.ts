import { TrimLevel, VariantDefinition, CarColor } from './types';

export const CAR_COLORS: CarColor[] = [
  { name: 'Radiant Red', hex: '#880015', bgGradient: 'from-red-900 to-black' },
  { name: 'Platinum White', hex: '#eeeeee', bgGradient: 'from-gray-100 to-gray-900' },
  { name: 'Golden Brown', hex: '#5D4037', bgGradient: 'from-amber-900 to-black' },
  { name: 'Modern Steel', hex: '#455A64', bgGradient: 'from-slate-700 to-black' },
];

export const VARIANTS_DATA: VariantDefinition[] = [
  {
    name: TrimLevel.SV,
    features: ["4 Airbags", "8-inch Touchscreen", "Climate Control", "Projector Headlamps"],
    description: "The entry into the world of supremacy. The SV grade offers essential luxury and safety without compromise.",
    config: {
      Petrol: {
        price: "₹11.82 Lakh",
        engine: "1.5L i-VTEC",
        specs: {
          transmission: "6-Speed MT",
          mileage: "17.8 kmpl",
          power: "121 PS",
          torque: "145 Nm",
          fuelType: "Petrol"
        }
      },
      Diesel: {
        price: "₹13.45 Lakh",
        engine: "1.5L i-DTEC",
        specs: {
          transmission: "6-Speed MT",
          mileage: "24.1 kmpl",
          power: "100 PS",
          torque: "200 Nm",
          fuelType: "Diesel"
        }
      }
    }
  },
  {
    name: TrimLevel.V,
    features: ["Honda Connect", "Multi-View Rear Camera", "Diamond Cut Alloys", "Cruise Control"],
    description: "Advanced connectivity meets comfort. The V grade introduces Next Gen Honda Connect and stylish Diamond Cut Alloy wheels.",
    config: {
      Petrol: {
        price: "₹12.70 Lakh",
        engine: "1.5L i-VTEC",
        specs: {
          transmission: "6-Speed MT / CVT",
          mileage: "18.4 kmpl",
          power: "121 PS",
          torque: "145 Nm",
          fuelType: "Petrol"
        }
      },
      Diesel: {
        price: "₹14.35 Lakh",
        engine: "1.5L i-DTEC",
        specs: {
          transmission: "6-Speed MT",
          mileage: "24.1 kmpl",
          power: "100 PS",
          torque: "200 Nm",
          fuelType: "Diesel"
        }
      }
    }
  },
  {
    name: TrimLevel.VX,
    features: ["Sunroof", "6 Airbags", "Walk Away Auto Lock", "7-inch TFT Meter"],
    description: "Experience the open sky. The VX grade adds a One-Touch Electric Sunroof and enhanced safety with 6 airbags.",
    config: {
      Petrol: {
        price: "₹13.85 Lakh",
        engine: "1.5L i-VTEC",
        specs: {
          transmission: "6-Speed MT / CVT",
          mileage: "18.4 kmpl",
          power: "121 PS",
          torque: "145 Nm",
          fuelType: "Petrol"
        }
      },
      Diesel: {
        price: "₹15.55 Lakh",
        engine: "1.5L i-DTEC",
        specs: {
          transmission: "6-Speed MT",
          mileage: "24.1 kmpl",
          power: "100 PS",
          torque: "200 Nm",
          fuelType: "Diesel"
        }
      }
    }
  },
  {
    name: TrimLevel.ZX,
    features: ["Full LED Headlamps", "Lane Watch Camera", "Leather Upholstery", "Ambient Lighting"],
    description: "The absolute pinnacle. Features full LED headlamps, luxurious leather upholstery, and the LaneWatch camera.",
    config: {
      Petrol: {
        price: "₹15.10 Lakh",
        engine: "1.5L i-VTEC",
        specs: {
          transmission: "6-Speed MT / CVT",
          mileage: "18.4 kmpl",
          power: "121 PS",
          torque: "145 Nm",
          fuelType: "Petrol"
        }
      },
      Diesel: {
        price: "₹16.80 Lakh",
        engine: "1.5L i-DTEC",
        specs: {
          transmission: "6-Speed MT",
          mileage: "24.1 kmpl",
          power: "100 PS",
          torque: "200 Nm",
          fuelType: "Diesel"
        }
      }
    }
  }
];

export const GEMINI_SYSTEM_INSTRUCTION = `
You are the "Honda Genius", an advanced AI assistant for the Honda City 5th Gen website.
Your tone is sophisticated, futuristic, and helpful.
Key facts about the car:
- Design: Sharp LED headlamps, bold front grille, sporty silhouette.
- Interior: Premium leather, 8-inch touchscreen, Alexa/Google integration.
- Performance (Petrol): 1.5L i-VTEC, 121 PS, 145 Nm.
- Performance (Diesel): 1.5L i-DTEC, 100 PS, 200 Nm (High Torque).
- Safety: Honda Sensing (ADAS), 6 Airbags, Lane Watch, ABS/EBD.
- Variants: SV, V, VX, ZX.

Keep answers concise (under 50 words) unless asked for details.
Focus on the premium and futuristic aspects of the vehicle.
`;