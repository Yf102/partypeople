import styles from '../styles/Home.module.css'
import { getPartners } from 'services/partners'
import store from 'store/store'
import {
  PartnerApiType,
  PartnerDistanceType,
  PartnerType,
} from 'services/types/partners'
import { useEffect, useState } from 'react'
import { calcGreatCircle } from 'utils/helpers/great-circle-distance'
import { GreatCircleParamType } from 'services/types/greatCircle'

type IndexProps = {
  partners: PartnerApiType
}

const LATITUDE_PSI_SOFIA = 42.6665921
const LONGITUDE_PSI_SOFIA = 23.351723
const sofiaOffice = {
  name: 'PSInteractive',
  latitude: LATITUDE_PSI_SOFIA,
  longitude: LONGITUDE_PSI_SOFIA,
}

const Home = ({ partners }: IndexProps) => {
  const [pd, setPd] = useState<PartnerDistanceType[]>([])
  useEffect(() => {
    const _pd = partners
      .map((partner) => {
        const gcParams: GreatCircleParamType = {
          latitude1_deg: sofiaOffice.latitude,
          longitude1_deg: sofiaOffice.longitude,
          latitude2_deg: partner.latitude,
          longitude2_deg: partner.longitude,
        }

        return {
          id: partner.partner_id,
          name: partner.name,
          distance: calcGreatCircle(gcParams).distance_kilometres,
        }
      })
      .filter((partner) => partner.distance <= 100)
    setPd(_pd)
  }, [partners])

  return (
    <div className={styles.container}>
      <ol>
        {pd.map((p, i) => {
          return (
            <div key={i}>
              <div>Id: {p.id}</div>
              <div>Name: {p.name}</div>
              <div>Distance: {p.distance} km</div>
            </div>
          )
        })}
      </ol>
    </div>
  )
}

export default Home

// For SSR (performance gain)
export const getStaticProps = async () => {
  const { dispatch } = store

  const { data: partners } = await dispatch(getPartners.initiate(null))

  return {
    props: {
      partners,
    },
    revalidate: 86400,
  }
}
