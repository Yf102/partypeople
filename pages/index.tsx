import styles from '../styles/Home.module.css'
import { getPartners } from 'services/partners'
import store from 'store/store'
import { PartnerCardType } from 'services/types/partners'
import { useEffect, useState } from 'react'
import { calcGreatCircle } from 'utils/helpers/great-circle-distance'
import { GreatCircleParamType } from 'services/types/greatCircle'
import PartnerCard from 'components/PartnerCard'
import { homeSchema } from 'utils/schemas/home'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  ContactsFormInput,
  IndexProps,
  MainLocation,
} from 'services/types/home'
import HomeForm from 'components/HomeForm'
import EmptyCard from 'components/EmptyCard'

const Home = ({ partners }: IndexProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactsFormInput>({
    resolver: yupResolver(homeSchema()),
  })

  const [mainLocation, setMainLocation] = useState<MainLocation | undefined>()
  const [pd, setPd] = useState<PartnerCardType[]>([])

  const onSubmit: SubmitHandler<ContactsFormInput> = async (info) => {
    if (info.latitude && info.longitude) {
      setMainLocation({
        name: 'PSInteractive',
        latitude: info.latitude,
        longitude: info.longitude,
      })
    }
  }

  useEffect(() => {
    if (!partners || !mainLocation) return
    const _pd = partners
      .map((partner) => {
        const gcParams: GreatCircleParamType = {
          latitude1_deg: mainLocation.latitude,
          longitude1_deg: mainLocation.longitude,
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
  }, [partners, mainLocation])

  return (
    <div data-testid='home-element' className={styles.container}>
      <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
        <div className='col-span-12 px-3 md:px-6'>
          <HomeForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
          />
          {mainLocation &&
            ((pd.length > 0 &&
              pd.map((p, i) => {
                return (
                  <PartnerCard
                    key={i}
                    id={p.id}
                    distance={p.distance}
                    name={p.name}
                  />
                )
              })) || <EmptyCard />)}
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
