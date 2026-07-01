const json = (response, status, body) => {
  response.status(status).json(body)
}

const escapeHtml = value =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return json(response, 405, { error: 'Method not allowed' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.DEMO_TO_EMAIL || 'karim@maisonmatch.ai'
  const from = process.env.DEMO_FROM_EMAIL

  if (!apiKey || !from) {
    return json(response, 500, { error: 'Email service is not configured.' })
  }

  const { name = '', boutique = '', email = '', presence = '', pos = '', message = '' } = request.body || {}

  if (!name.trim() || !boutique.trim() || !email.trim()) {
    return json(response, 400, { error: 'Name, boutique, and email are required.' })
  }

  const submittedAt = new Date().toISOString()
  const subject = `MaisonMatch demo request — ${boutique}`
  const text = [
    'New MaisonMatch demo request',
    '',
    `Name: ${name}`,
    `Boutique: ${boutique}`,
    `Email: ${email}`,
    `Website / Instagram: ${presence || 'Not provided'}`,
    `POS platform: ${pos || 'Not selected'}`,
    `Submitted at: ${submittedAt}`,
    '',
    'Message:',
    message || 'Not provided'
  ].join('\n')

  const rows = [
    ['Name', name],
    ['Boutique', boutique],
    ['Email', email],
    ['Website / Instagram', presence || 'Not provided'],
    ['POS platform', pos || 'Not selected'],
    ['Submitted at', submittedAt],
    ['Message', message || 'Not provided']
  ]

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#171716;line-height:1.5">
      <h1 style="font-family:Georgia,serif;font-weight:500">New MaisonMatch demo request</h1>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:680px">
        ${rows.map(([label, value]) => `
          <tr>
            <td style="border:1px solid #ddd;background:#f7f7f5;font-weight:700;width:180px">${escapeHtml(label)}</td>
            <td style="border:1px solid #ddd">${escapeHtml(value)}</td>
          </tr>
        `).join('')}
      </table>
    </div>
  `

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      text,
      reply_to: email
    })
  })

  if (!resendResponse.ok) {
    const details = await resendResponse.text()
    console.error('Resend email failed:', details)
    return json(response, 502, { error: 'Email could not be sent.' })
  }

  return json(response, 200, { ok: true })
}
