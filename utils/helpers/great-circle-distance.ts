import {
  GreatCircleParamType,
  GreatCircleType,
} from 'services/types/greatCircle'

const MEAN_EARTH_RADIUS_KM = 6371

const prepareGC = (params: GreatCircleParamType): GreatCircleType => {
  const gc = {
    ...params,
    latitude1_rad: 0,
    longitude1_rad: 0,
    latitude2_rad: 0,
    longitude2_rad: 0,
    central_angle_rad: 0,
    central_angle_deg: 0,
    distance_kilometres: 0,
    valid: true,
  }

  validateDeg(gc)

  return gc
}

const validateDeg = (params: GreatCircleType) => {
  params.valid = !(params.latitude1_deg < -90.0 || params.latitude1_deg > 90.0)

  if (params.longitude1_deg < -180.0 || params.longitude1_deg > 180.0) {
    params.valid = false
  }

  if (params.latitude2_deg < -90.0 || params.latitude2_deg > 90.0) {
    params.valid = false
  }

  if (params.longitude2_deg < -180.0 || params.longitude2_deg > 180.0) {
    params.valid = false
  }
}

const rad_to_deg = (rad: number) => {
  return rad * (180 / Math.PI)
}

const deg_to_rad = (degrees: number) => {
  return degrees * (Math.PI / 180)
}

const calculateRadians = (gc: GreatCircleType) => {
  gc.latitude1_rad = deg_to_rad(gc.latitude1_deg)
  gc.longitude1_rad = deg_to_rad(gc.longitude1_deg)

  gc.latitude2_rad = deg_to_rad(gc.latitude2_deg)
  gc.longitude2_rad = deg_to_rad(gc.longitude2_deg)
}

const calculateCentralAngle = (gc: GreatCircleType) => {
  const longitudes_abs_diff =
    gc.longitude1_rad > gc.longitude2_rad
      ? gc.longitude1_rad - gc.longitude2_rad
      : gc.longitude2_rad - gc.longitude1_rad

  gc.central_angle_rad = Math.acos(
    Math.sin(gc.latitude1_rad) * Math.sin(gc.latitude2_rad) +
      Math.cos(gc.latitude1_rad) *
        Math.cos(gc.latitude2_rad) *
        Math.cos(longitudes_abs_diff)
  )

  gc.central_angle_deg = rad_to_deg(gc.central_angle_rad)
}

const calculateDistance = (gc: GreatCircleType) => {
  gc.distance_kilometres = MEAN_EARTH_RADIUS_KM * gc.central_angle_rad
}

const calcGreatCircle = (params: GreatCircleParamType) => {
  const gc = prepareGC(params)

  if (gc.valid) {
    calculateRadians(gc)
    calculateCentralAngle(gc)
    calculateDistance(gc)
  }

  return gc
}

export { calcGreatCircle }
