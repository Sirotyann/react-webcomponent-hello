// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    username: string
    password: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log('--------------- login -----------------')
    const body = req.body
    console.log('body:', body)
    console.log('username:', body.username)
    res.status(200).json({ username: body.username, password: body.password })
}
