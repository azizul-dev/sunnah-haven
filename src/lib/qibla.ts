const KAABA = { lat: 21.4225, lng: 39.8262 };

export function getQiblaAngle(lat: number, lng: number): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLng = toRad(KAABA.lng - lng);
  const y = Math.sin(dLng);
  const x =
    Math.cos(toRad(lat)) * Math.tan(toRad(KAABA.lat)) -
    Math.sin(toRad(lat)) * Math.cos(dLng);
  const angle = (Math.atan2(y, x) * 180) / Math.PI;
  return (angle + 360) % 360;
}
