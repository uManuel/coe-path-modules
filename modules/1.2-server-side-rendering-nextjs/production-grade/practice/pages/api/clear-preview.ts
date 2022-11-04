import { NextApiResponse } from 'next'

export default function handler(req, res:NextApiResponse) {
    // clears the preview cookie
    res.clearPreviewData()
    res.end('preview disabled')
}