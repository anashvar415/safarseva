const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const booking = require('./models/booking.js')
const review = require('./models/review.js');
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate")
const passport = require('passport');
const user = require('./models/user.js');
const LocalStrategy = require('passport-local');
const { sendMailtoUser} = require('./middleware');


if(process.env.NODE_ENV !== "production") {
require('dotenv').config();
}
const helmet = require('helmet');

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      
      scriptSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://api.mapbox.com",
        "'unsafe-inline'",
        "'unsafe-eval'"
      ],
      
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net",
        "https://cdnjs.cloudflare.com",
        "https://fonts.googleapis.com",
        "https://api.mapbox.com",
        "'unsafe-inline'"
      ],
      
      fontSrc: [
        "'self'",
        "https://fonts.googleapis.com",
        "https://fonts.gstatic.com",
        "https://cdn.jsdelivr.net",
         "https://cdnjs.cloudflare.com"
      ],
      
      imgSrc: [
        "'self'",
        "data:",
        "https://res.cloudinary.com",
        "https://images.unsplash.com",
        "https://cdn.jsdelivr.net"
      ],
      
      connectSrc: [
        "'self'",
        "https://api.mapbox.com",
        "https://events.mapbox.com"
      ],
      
      objectSrc: ["'none'"],
     
      workerSrc: ["'self'", "blob:"],
      
      upgradeInsecureRequests: []
    }
  })
);
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

app.engine('ejs', ejsmate);
const session = require('express-session');
const MongoStore = require('connect-mongo');
const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_URL,
    crypto: {
        secret:'aVeryLongRandomSecretString123!@#'},

        touchAfter: 24 * 60 * 60 ,});
const isLoggedIn = require('./middleware.js').isLoggedIn;

store.on('error', function(e) {
    console.log('Session store error', e);})

const multer = require('multer');

const storage=require('./cloudconfig.js').storage;
const upload = multer({ storage });





app.use(methodoverride("_method"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const nodemailer = require("nodemailer");


sessionOptions = {
    store,
    secret     :"aVeryLongRandomSecretString123!@#",
 
    resave     : false, 
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionOptions));
app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



const dbUrl=  process.env.ATLAS_URL;


async function main(){
await mongoose.connect(dbUrl);

        
    }
    main().then(()=>{    console.log("connected to db");}
)
.catch((err)=>{
        console.log(err);
    });




const flash = require('connect-flash');
const { saveReturnTo } = require('./middleware.js');
const reviewList = require('./models/review.js');
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user; 
 
  next();
});
app.get('/', (req, res) => {
    res.redirect('/listing');
});

app.get('/dashboard',isLoggedIn, async (req, res) => {
  const current = await user.findById(req.user._id)
    const listings = await listing.find({ owner: current._id }).populate('reviews');

    const bookings = await booking.find({ userId: current._id  }).populate({
      path: 'listingId',
      populate: { path: 'owner' }
    });


    res.render('./users/user.ejs', {
      user:current,
      listings,
      bookings });
});

app.get('/listing/:id/bookings', isLoggedIn,async (req, res) => {
  const listingData = await listing.findById(req.params.id);
  const bookings = await booking.find({ listingId: listingData._id }).populate('userId');
  res.render('./listing/listingBooking', { listing:listingData, bookings });
});
app.post('/bookings/:id/confirm', async (req, res, next) => {
  
    const updated = await booking.findByIdAndUpdate(req.params.id, { status: 'Confirmed' }, { new: true }).populate('listingId');

    req.bookingDetails = {
      email: req.user.email,
      hotelName: updated.listingId.name,
      checkIn: updated.checkIn,
      checkOut: updated.checkOut,
      status: updated.status
    };

    next(); 
  }, sendMailtoUser, (req, res) => {
  res.redirect("/dashboard");
});
app.post('/bookings/:id/cancel', async (req, res, next) => {
 
    const updated = await booking.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true }).populate('listingId');

    req.bookingDetails = {
      email: req.user.email,
      hotelName: updated.listingId.name,
      checkIn: updated.checkIn,
      checkOut: updated.checkOut,
      status: updated.status
    };

    next(); 
}, sendMailtoUser, (req, res) => {
  res.redirect("/dashboard");
});

app.get('/signup', (req, res) => {
    res.render('./users/signup.ejs');});

app.post('/signup', async (req, res) => {
    try {let{username, email, password} = req.body;
    const newUser = new user({ username, email });
   const registerdUser= await user.register(newUser, password);
 
  req.login(registerdUser, (err) => {
    if (err) {
      return next(err);
      
    }
    req.flash("success"," welcome to SafarSeva");
  res.redirect('/listing');
  })
   }
  catch (e) {
  
    req.flash("error", "user exists.");
    res.redirect('/signup');
  }
});





app.get('/login', (req, res) => {
    res.render('./users/login.ejs');});



app.post('/login',saveReturnTo, passport.authenticate('local', 
    { failureRedirect: '/login', failureFlash: true }), 
async (req, res) => {
    req.flash("success", "Welcome back to SafarSeva");
    res.redirect(res.locals.returnTo || '/listing'); 
});
app.get('/listing/category/:category', async (req, res) => {
    const { category } = req.params;
    
    
      let  alllist = await listing.find({
            category: { $regex: category, $options: 'i' } 
    })
            
           if (alllist.length === 0) {
       req.flash('error', 'No property found for this category.');
    return res.redirect(`/listing`);}
  
    res.render('./listing/index.ejs', { alllist });
});
app.get('/listing', async (req, res) => {
    const { search } = req.query;
    let alllist;
    if (search && search.trim() !== "") {
        alllist = await listing.find({
            $or: [
                { title: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ]

        });
    } else {
        alllist = await listing.find({});
    }
    res.render('./listing/index.ejs', { alllist });
});


app.get('/listing', async (req, res) => {
    const alllist = await listing.find({});
   
        res.render('./listing/index.ejs', { alllist });
    });
    app.get("/listing/new", isLoggedIn, (req, res) => {
   
    res.render('./listing/new.ejs');
});
  
   

   app.post('/listing/:id/reviews',isLoggedIn, async (req, res) => {
    let {id}= req.params;
    const listingData = await listing.findById(id);
    const newReview = new review(req.body.review);
    const reviewAuthor = req.user._id;
    newReview.author = reviewAuthor;
    listingData.reviews.push(newReview);
    await newReview.save();
    await listingData.save();
    res.redirect(`/listing/${id}`);
});
app.post('/listing/:id/reviews/:reviewId', isLoggedIn,async(req, res) => {
    let {id, reviewId} = req.params;
    
       const reviews= await reviewList.findById(reviewId);
    if( !reviews.author.equals(res.locals.currentUser._id) ){
        req.flash("error", "You are not authorized to edit this review.");
        return res.redirect(`/listing/${id}`);}
    
   
await review.findByIdAndDelete(reviewId);
    res.redirect(`/listing/${id}`);
});


app.get("/listing/:id", async (req, res) => {
        let {id}= req.params;
        const listingData = await listing.findById(id).populate({path: 'reviews', populate: { path: 'author'}}
        ).populate('owner');
        res.render('./listing/show.ejs', { listingData });
    });
    app.get("/listing/:id/edit", isLoggedIn,async (req, res) => {
       let {id}= req.params;
       const foundListing = await listing.findById(id);
    if( !foundListing.owner._id.equals(res.locals.currentUser._id) ){
        req.flash("error", "You are not authorized to edit this review.");
        return res.redirect(`/listing/${id}`);}
        const listingData = await listing.findById(id);
        res.render('./listing/edit.ejs', { listingData });
    });
app.post('/listing', isLoggedIn,upload.single('listing[image]'),async (req, res) => {
 
 
 
 
    let response=await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
 limit:1
})
  .send()
  
if (!response.body.features || response.body.features.length === 0) {
    req.flash('error', 'Location not found. Please enter a valid location.');
    return res.redirect('/listing/new');
  }
  
    let url = req.file.path ;



   let filename = req.file.filename;
   
    const newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
  
   let saved =await newListing.save();
    console.log(saved);
    res.redirect('/listing');
});


app.get('/logout', isLoggedIn, (req, res) => {
    req.logout((err) => {   
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).send('Internal Server Error');
        }
        req.flash("success", "Logged out successfully");
        res.redirect('/listing');
    })});


    app.put("/listing/:id", upload.single('listing[image]'),async (req,res)=>{
        let {id}= req.params;
        const updateData = { ...req.body.listing };

    if (req.file) {
        updateData.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.findByIdAndUpdate(id, updateData);
       res.redirect('/listing');
    })

app.delete("/listing/:id", isLoggedIn,async (req, res) => {
        let {id}= req.params;
        
    const foundListing = await listing.findById(id);
    
   
        await review.deleteMany({ _id: { $in: foundListing.reviews } });
    
          
        
     await   listing.findByIdAndDelete(id);
         res.redirect('/listing');
});
app.get('/listing/:id/book',isLoggedIn, async (req, res) => {
    const listingData = await listing.findById(req.params.id);
    res.render("./listing/book.ejs",{listingData})



});
app.post('/listing/:id/book', isLoggedIn, async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const listingData = await listing.findById(req.params.id);

  if (!checkIn || !checkOut) {
    req.flash("error", "Please select valid check-in and check-out dates.");
    return res.redirect(`/listing/${req.params.id}/book`);
  }

  const requestedStart = new Date(checkIn);
  const requestedEnd = new Date(checkOut);

  const isUnavailable = (listingData.unavailableDates || []).some(range => {
    return (
      requestedStart <= new Date(range.end) &&
      requestedEnd >= new Date(range.start)
    );
  });

  if (isUnavailable) {
    req.flash("error", "Selected dates are not available.");
    return res.redirect(`/listing/${req.params.id}/book`);
  }

  const newBooking = new booking({
    userId: req.user._id,
    listingId: listingData._id,
    checkIn: requestedStart,
    checkOut: requestedEnd
  });

  await newBooking.save();

  if (!listingData.unavailableDates) {
    listingData.unavailableDates = [];
  }

  listingData.unavailableDates.push({ start: requestedStart, end: requestedEnd });
  await listingData.save();

  res.redirect('/payment');
});
app.get('/payment', isLoggedIn, async (req, res,next) => {
  const bookingData = await booking.findOne({ userId: req.user._id })
    .sort({createdAt:-1})
    .populate('listingId');

  if (!bookingData) {
    req.flash("error", "No booking found");
    return res.redirect("/dashboard");
  }
bookingData.status='Confirmed';
 
    await bookingData.save();

    req.bookingDetails = {
      email: req.user.email,
      hotelName: bookingData.listingId.name,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      status: bookingData.status
    };

    res.locals.data = {
      listingData: bookingData.listingId,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      transactionId: 'TXN' + Math.floor(Math.random() * 1000000000)
    };

    next(); }
    , sendMailtoUser, (req, res) => {
  const { listingData, checkIn, checkOut, transactionId } = res.locals.data;
  res.render('./listing/payment.ejs', {
    listingData,
    checkIn,
    checkOut,
    transactionId
  });
});

  app.get('/forget', (req,res)=>{
    
    res.render('./users/forget.ejs'); 
    })
    app.post("/forget", async (req, res) => {
    const { email } = req.body;
  
    try {
      const users = await user.findOne({ email });
      if (!users) {
        req.flash("error", "Email not registered.");
        return res.redirect("/forget");
      }
  
     
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      users.Code = code;
      users.CodeExpires = Date.now() + 10 * 60 * 1000; 
      await users.save();
    
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD , 
        }
      });
  
      const mailOptions = {
        to: user.email,
        from: `"Safarseva Team"${process.env.EMAIL}`
  ,
        subject: "Password Reset Code",
        text: `Your password reset code is: ${code}. It expires in 10 minutes.`
      };
  
      await transporter.sendMail(mailOptions);
      
      req.flash("success", "Reset code sent to your email.");
      res.redirect('/forget'); 
    } catch (err) {
      console.error(err);
      req.flash("error", "Error sending reset code.");
      res.redirect("/forget");
    }
  });
  app.post('/verify',async (req,res)=>{
  const code = req.body['verification'];
  const users = await user.findOne({ Code:code });
  console.log(users);
   
  if(users!=null){req.session.username = users.username;
  
    res.render('reset',{ username: users.username })
   
  }
  else 
  {
    req.flash('error','Invalid code');
    res.redirect('/forget')
  }
  
  })
  app.post('/reset', async (req, res) => {
    const { Repassword } = req.body;
    const username = req.session.username;
    
  
    if (!username) {
      return res.redirect('/login');
    }
  
    try {
      const users = await user.findOne({ username });
  
      if (!users) {
        req.flash("error","user not exist");
        res.redirect('/forget')
      }
  
      await user.setPassword(Repassword); 
      await user.save(); 
      
  
      
      req.flash('success', 'Password reset successful. Please log in.');
      res.redirect('/login');
    } catch (err) {
      req.flash("error","error occured");
      res.redirect("/forget")
    }
  });
  

app.listen(8080,()=> {
    console.log("connected to server ");
});
