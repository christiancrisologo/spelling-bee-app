// AIzaSyBJkBhbPCkk6erimb9Wk6TYYjKVM5JgAm0
const appendDataToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  range: string,
  values: any
) => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to append data to sheet')
  }

  return response.json()
}
