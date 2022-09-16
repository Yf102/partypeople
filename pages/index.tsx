import styles from '../styles/Home.module.css'
import { getPartners } from 'services/partners'
import store from 'store/store'
import { PartnerApiType } from 'services/types/partners'

type IndexProps = {
  partners: PartnerApiType
}

const Home = ({ partners }: IndexProps) => {
  return (
    <div className={styles.container}>
      <ol>
        {partners?.map((p, i) => {
          return (
            <div key={i}>
              <b>Id: </b> <span>{p.partner_id}</span>
              <br />
              <b>Name: </b> <span>{p.name}</span>
              <br />
              <b>Longitude: </b> <span>{p.longitude}</span>
              <br />
              <b>Latitude: </b> <span>{p.latitude}</span>
              <br />
              <br />
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
