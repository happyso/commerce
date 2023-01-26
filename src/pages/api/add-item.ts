// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_KEY })

const databaseId = process.env.NOTION_DATABASE_ID

async function addItem(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
      },
    })
    console.log(response)
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query
  if (name === null) {
    res.status(400).json({ message: `No name` })
  }
  try {
    await addItem(String(name))
    res.status(200).json({ message: `Success ${name}` })
  } catch (error) {
    res.status(400).json({ message: `Failed ${name}` })
  }
}
