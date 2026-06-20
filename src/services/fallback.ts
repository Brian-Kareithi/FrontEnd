const NOW = new Date().toISOString();
const DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i);
  return d.toISOString().split('T')[0];
});

export function resolve(lat: number, lon: number) {
  return {
    location: { name: 'Nairobi, Kenya', lat, lon, city: 'Nairobi', country: 'KE' },
    current: {
      temp: 24, feels_like: 23, humidity: 65, wind_speed: 12,
      condition: 'Partly Cloudy', icon: '02d', pressure: 1013,
      visibility: 10, uv_index: 7,
    },
    forecast: DAYS.map((date, i) => ({
      date, temp_max: 26 + i % 3, temp_min: 16 + i % 2,
      condition: ['Sunny', 'Cloudy', 'Light Rain', 'Partly Cloudy', 'Sunny', 'Cloudy', 'Clear'][i],
      icon: ['01d', '02d', '10d', '02d', '01d', '04d', '01d'][i],
      humidity: 55 + i * 3, wind_speed: 10 + i * 2, rain: [0, 0, 2.5, 0.5, 0, 0, 0][i],
      sunrise: '06:30', sunset: '18:45',
    })),
    hourly: Array.from({ length: 12 }, (_, i) => ({
      time: `${String(6 + i).padStart(2, '0')}:00`,
      temp: 18 + i, condition: 'Clear', icon: '01d', rain: 0,
    })),
    ai_summary: 'Generally favorable conditions for the week ahead. Temperatures will be mild with occasional cloud cover. A chance of light rain mid-week.',
    last_updated: NOW,
  };
}

export function advise(lat: number, lon: number, crop: string) {
  return {
    location: { lat, lon, city: 'Nairobi', country: 'KE' },
    crop_type: crop,
    current_weather: {
      temp: 24, feels_like: 23, humidity: 65, wind_speed: 12,
      condition: 'Partly Cloudy', icon: '02d', pressure: 1013,
      visibility: 10, uv_index: 7,
    },
    forecast: DAYS.slice(0, 3).map((date) => ({
      date, temp_max: 27, temp_min: 17,
      condition: 'Partly Cloudy', icon: '02d',
      humidity: 60, wind_speed: 10, rain: 0.2,
      sunrise: '06:30', sunset: '18:45',
    })),
    risks: [{ type: 'drought' as const, level: 'low' as const, description: 'Adequate soil moisture expected. No drought concerns.' }],
    recommendations: [{ category: 'general', message: 'Conditions look favorable. Continue routine care.', priority: 'info' as const }],
    ai_insight: 'Mild conditions expected. Good for general farm activities.',
    generated_at: NOW,
  };
}
