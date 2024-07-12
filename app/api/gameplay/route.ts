'use server'

import { sql } from '@vercel/postgres'

export async function insert(data: any) {
  const {
    playerName,
    totalSeconds,
    wrongAnswers,
    correctAnswers,
    rating,
    level,
    difficulty,
  } = data
  try {
    console.log({
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    })
    const query = `
      INSERT INTO gameplay (
        playerName,
        totalSeconds,
        wrongAnswers,
        correctAnswers,
        rating,
        level,
        difficulty,
        date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, DEFAULT)
    `
    const values = [
      playerName,
      totalSeconds,
      wrongAnswers,
      correctAnswers,
      rating,
      level,
      difficulty,
    ]

    await sql.query(query, values)

    return { message: 'Gameplay data inserted successfully' }
  } catch (error) {
    console.error('Error inserting gameplay data:', error)
  }
}

// export async function POST(req: NextRequest) {
//   const {
//     playerName,
//     totalSeconds,
//     wrongAnswers,
//     correctAnswers,
//     rating,
//     level,
//     difficulty,
//   } = await req.json()

//   const client = new Client({
//     connectionString: process.env.POSTGRES_URL,
//   })

//   try {
//     await client.connect()
//     const query = `
//       INSERT INTO gameplay (
//         playerName,
//         totalSeconds,
//         wrongAnswers,
//         correctAnswers,
//         rating,
//         level,
//         difficulty,
//         date
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, DEFAULT)
//     `
//     const values = [
//       playerName,
//       totalSeconds,
//       wrongAnswers,
//       correctAnswers,
//       rating,
//       level,
//       difficulty,
//     ]
//     await client.query(query, values)
//     await client.end()

//     return NextResponse.json({ message: 'Gameplay data inserted successfully' })
//   } catch (error) {
//     console.error('Error inserting gameplay data:', error)
//     return NextResponse.json(
//       { error: 'Error inserting gameplay data' },
//       { status: 500 }
//     )
//   }
// }
