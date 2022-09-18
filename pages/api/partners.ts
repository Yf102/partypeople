import { NextApiRequest, NextApiResponse } from 'next'
import { PartnerApiType } from 'services/types/partners'
import { getPartnersFromFile } from 'utils/helpers/partners'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PartnerApiType>
) {
  // API CREATED JUST TO DEMONSTRATE THE API FUNCTIONALITY
  const partners = await getPartnersFromFile()
  res.status(200).json(partners)
}
