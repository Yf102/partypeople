import path from 'path'
import { promises as fs } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { PartnerApiType } from 'services/types/partners'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PartnerApiType>
) {
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
      let _partner = JSON.parse(partner)
      _partner.latitude = Number(_partner.latitude)
      _partner.longitude = Number(_partner.longitude)
      return _partner
    })

  //Return the content of the data file in json format
  res.status(200).json(partnersArr)
}
