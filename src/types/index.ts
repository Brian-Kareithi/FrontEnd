export interface GeoLocation {
  lat: number;
  lon: number;
  city?: string;
  region?: string;
  country?: string;
}

export interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  icon: string;
  pressure: number;
  visibility: number;
  uv_index: number;
}

export interface DailyForecast {
  date: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  icon: string;
  humidity: number;
  wind_speed: number;
  rain: number;
  sunrise: string;
  sunset: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  icon: string;
  rain: number;
}

export interface WeatherResponse {
  location: { name: string; lat: number; lon: number; city?: string; region?: string; country?: string };
  current: CurrentWeather;
  forecast: DailyForecast[];
  hourly?: HourlyForecast[];
  ai_summary: string | null;
  last_updated: string;
}

export type RiskLevel = 'low' | 'moderate' | 'high' | 'extreme';

export interface RiskFactor {
  type: 'drought' | 'heavy_rain' | 'wind' | 'frost' | 'heat';
  level: RiskLevel;
  description: string;
}

export interface AdvisoryRecommendation {
  category: string;
  message: string;
  priority: 'info' | 'warning' | 'critical';
  timing?: string;
}

export interface FarmerAdvisory {
  location: GeoLocation;
  crop_type: string;
  current_weather: CurrentWeather;
  forecast: DailyForecast[];
  risks: RiskFactor[];
  recommendations: AdvisoryRecommendation[];
  ai_insight: string | null;
  generated_at: string;
}

export interface FavoriteLocation {
  id: string;
  name: string;
  lat: number;
  lon: number;
  saved_at: string;
}
