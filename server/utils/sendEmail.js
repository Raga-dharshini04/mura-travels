import nodemailer from 'nodemailer'

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_PASSWORD,
    },
  })
}

export const sendBookingEmailToAdmin = async (booking, tripTitle) => {
  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"MURA Tourism Bookings" <${process.env.EMAIL_FROM}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking — ${tripTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee">
          <div style="background:#0a0a0a;padding:24px 32px;text-align:center">
            <h1 style="color:#C9A84C;font-size:22px;margin:0;letter-spacing:0.15em">✦MURA TOURISM</h1>
            <p style="color:#8B8070;font-size:12px;margin:6px 0 0;letter-spacing:0.1em;text-transform:uppercase">New Booking Received</p>
          </div>
          <div style="padding:32px">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888;width:120px">Trip</td>
                <td style="padding:12px 0;font-weight:600;color:#111">${tripTitle}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">Name</td>
                <td style="padding:12px 0;color:#111">${booking.name}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">Email</td>
                <td style="padding:12px 0;color:#111">${booking.email}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">Phone</td>
                <td style="padding:12px 0;color:#111">${booking.phone}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">People</td>
                <td style="padding:12px 0;color:#111">${booking.numberOfPeople}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">Message</td>
                <td style="padding:12px 0;color:#111">${booking.message || '—'}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#888">Total</td>
                <td style="padding:12px 0;font-weight:700;font-size:18px;color:#C9A84C">$${booking.totalPrice}</td>
              </tr>
            </table>
          </div>
          <div style="background:#f9f9f9;padding:16px 32px;text-align:center;border-top:1px solid #eee">
            <p style="color:#aaa;font-size:12px;margin:0">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    })
    console.log('Admin email sent ✅')
  } catch (err) {
    console.error('Admin email failed:', err.message)
  }
}

export const sendConfirmationEmailToCustomer = async (booking, tripTitle) => {
  try {
    const transporter = createTransporter()
    await transporter.sendMail({
      from: `"MURA Tourism Travel" <${process.env.EMAIL_FROM}>`,
      to: booking.email,
      subject: `Booking Confirmed — ${tripTitle}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee">
          <div style="background:#0a0a0a;padding:24px 32px;text-align:center">
            <h1 style="color:#C9A84C;font-size:22px;margin:0;letter-spacing:0.15em">✦ TORIUM</h1>
            <p style="color:#8B8070;font-size:12px;margin:6px 0 0;letter-spacing:0.1em;text-transform:uppercase">Booking Confirmation</p>
          </div>
          <div style="padding:32px">
            <h2 style="font-size:20px;color:#111;margin:0 0 8px">Hi ${booking.name}! 👋</h2>
            <p style="color:#666;font-size:14px;line-height:1.7;margin:0 0 24px">
              Thank you for booking <strong>${tripTitle}</strong> with Torium.<br/>
              Our team will contact you shortly on <strong>${booking.phone}</strong> or <strong>${booking.email}</strong> to confirm your spot.
            </p>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888;width:120px">Trip</td>
                <td style="padding:12px 0;font-weight:600;color:#111">${tripTitle}</td>
              </tr>
              <tr style="border-bottom:1px solid #f0f0f0">
                <td style="padding:12px 0;color:#888">People</td>
                <td style="padding:12px 0;color:#111">${booking.numberOfPeople}</td>
              </tr>
              <tr>
                <td style="padding:12px 0;color:#888">Total Price</td>
                <td style="padding:12px 0;font-weight:700;font-size:18px;color:#C9A84C">$${booking.totalPrice}</td>
              </tr>
            </table>
          </div>
          <div style="background:#0a0a0a;padding:24px 32px;text-align:center">
            <p style="color:#C9A84C;font-size:14px;margin:0;letter-spacing:0.1em">✦MURA TOURISM</p>
            <p style="color:#8B8070;font-size:12px;margin:8px 0 0">We'll be in touch soon. Thank you for choosing us!</p>
          </div>
        </div>
      `,
    })
    console.log('Customer email sent ✅')
  } catch (err) {
    console.error('Customer email failed:', err.message)
  }
}