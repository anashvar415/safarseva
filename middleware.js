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

module.exports.sendMailtoUser = async (req, res, next) => {
  
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});
  const { status, userEmail, title, checkIn, checkOut } = req.bookingDetails;
let mailOptions;
  if (status === 'Confirmed') {
   mailOptions={to: userEmail,
        from: `"Safarseva Team"${process.env.EMAIL}` ,subject :'✅ Booking Confirmed',
    html : `
      <h2>Your booking at ${title} is confirmed</h2>
      <p><strong>Check-in:</strong> ${checkIn}</p>
      <p><strong>Check-out:</strong> ${checkOut}</p>
    `}
  } else if (status === 'Cancelled') {
     mailOptions={to: userEmail,
        from: `"Safarseva Team"${process.env.EMAIL}`,
    subject : '❌ Booking Cancelled',
    html :`<h2>Your booking at ${title} has been cancelled.</h2>`
  }} else {
    return next();
  }


  try {
    await transporter.sendMail(mailOptions);
    next();
  } catch (err) {
     req.flash("error "," Mail not sent.");
     res.redirect("/payment");
  }
};
