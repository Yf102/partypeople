import styles from '../styles/Home.module.css'
import { getPartners } from 'services/partners'
import store from 'store/store'
import { PartnerApiType, PartnerCardType } from 'services/types/partners'
import { useEffect, useState } from 'react'
import { calcGreatCircle } from 'utils/helpers/great-circle-distance'
import { GreatCircleParamType } from 'services/types/greatCircle'
import PartnerCard from 'components/PartnerCard'

type IndexProps = {
  partners: PartnerApiType
}

const LATITUDE_PSI_SOFIA = 42.6665921
const LONGITUDE_PSI_SOFIA = 23.351723
const SOFIA_OFFICE = {
  name: 'PSInteractive',
  latitude: LATITUDE_PSI_SOFIA,
  longitude: LONGITUDE_PSI_SOFIA,
}

const Home = ({ partners }: IndexProps) => {
  const [pd, setPd] = useState<PartnerCardType[]>([])
  useEffect(() => {
    const _pd = partners
      .map((partner) => {
        const gcParams: GreatCircleParamType = {
          latitude1_deg: SOFIA_OFFICE.latitude,
          longitude1_deg: SOFIA_OFFICE.longitude,
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
      .sort((p1, p2) => p1.id - p2.id)
    setPd(_pd)
  }, [partners])

  return (
    <div className={styles.container}>
      <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
        <div className='col-span-12 px-3 md:px-6'>
          {pd.map((p, i) => {
            return (
              <PartnerCard
                key={i}
                id={p.id}
                distance={p.distance}
                name={p.name}
              />
            )
          })}
        </div>
      </div>
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
