const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const listing = require('./models/listing.js');
const Booking = require('./models/booking.js')
const review = require('./models/review.js');
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate")
const passport = require('passport');
const user = require('./models/user.js');
const LocalStrategy = require('passport-local');
if(process.env.NODE_ENV !== "production") {
require('dotenv').config();
}
const helmet = require('helmet');

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
        "'unsafe-inline'"
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
        "https://cdn.jsdelivr.net"
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
      upgradeInsecureRequests: [],
    },
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
app.get('/listings/:id/book',isLoggedIn, async (req, res) => {
    const listingData = await listing.findById(req.params.id);
    res.render("./listing/book.ejs",{listingData})



})
app.post('/listings/:id/book', async (req, res) => {
  const { checkIn, checkOut } = req.body;
  const listingData = await listing.findById(req.params.id);
const _id=req.params.id;
  const requestedStart = new Date(checkIn);
  const requestedEnd = new Date(checkOut);

  const isUnavailable = listingData.unavailableDates.some(range => {
    return (
      requestedStart <= new Date(range.end) &&
      requestedEnd >= new Date(range.start)
    );
  });

  if (isUnavailable) {
    req.flash("error","Selected dates not available")
    res.redirect(`/listing/${_id}/book`)
  }

  const booking = new Booking({
    userId: req.user._id,
    listingId: listingData._id,
    checkIn: requestedStart,
    checkOut: requestedEnd
  });

  await booking.save();
  res.send(' proceed to payment'); 

});

app.listen(8080,()=> {
    console.log("connected to server ");
});
