import * as yup from 'yup'

export const homeSchema = () =>
  yup
    .object({
      latitude: yup.number().required('number.latitude.required'),
      longitude: yup.number().required('number.longitude.required'),
    })
    .required()
