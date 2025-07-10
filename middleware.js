module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; 
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
module.exports.saveReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    } 
    next();
}
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports.sendMailtoUser = async (req, res, next) => {
  const { status, email, hotelName, checkIn, checkOut } = req.bookingDetails;

  let subject = '', html = '';

  if (status === 'Confirmed') {
    subject = '✅ Booking Confirmed';
    html = `
      <h2>Your booking at ${hotelName} is confirmed</h2>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
    `;
  } else if (status === 'Cancelled') {
    subject = '❌ Booking Cancelled';
    html = `<h2>Your booking at ${hotelName} has been cancelled.</h2>`;
  } else {
    return next();
  }

  try {
    await transporter.sendMail({
      from: '"Safar Seva" <no-reply@safarseva.com>',
      to: email,
      subject,
      html
    });
    next();
  } catch (err) {
     req.flash("error "," Mail not sent.");
     res.redirect("/payment");
  }
};
