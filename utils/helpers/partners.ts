import path from 'path'
import { promises as fs } from 'fs'

const getPartnersFromFile = async () => {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'DB')

  //Read the txt data file
  const fileContents = await fs.readFile(
    jsonDirectory + '/partners.txt',
    'utf8'
  )

  const partnersArr = fileContents
    .split('\n')
    .filter((partnerStr) => !!partnerStr)
    .map((partner) => {
      const _partner = JSON.parse(partner)
      _partner.latitude = Number(_partner.latitude)
      _partner.longitude = Number(_partner.longitude)
      return _partner
    })

  return partnersArr
}

export { getPartnersFromFile }
