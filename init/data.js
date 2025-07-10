const sampleListings = [
  {
    "_id": "685b0c0090b8e8499924b6d9",
    "title": "Cozy Beachfront Cottage",
    "description": "Escape to this charming beachfront cottage for a relaxing getaway. Enj…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,beach&sig=1"
    },
    "price": 1500,
    "location": "Malibu",
    "reviews": [ /* existing reviews */ ],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Beach",
    "geometry": {
      "type": "Point",
      "coordinates": [-118.7798, 34.0259]
    },
    "__v": 1
  },
  {
    "_id": "685b0c0090b8e8499924b6da",
    "title": "Modern Loft in Downtown",
    "description": "Stay in the heart of the city in this stylish loft apartment. Perfect …",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,loft&sig=2"
    },
    "price": 1200,
    "location": "New York City",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Boutique",
    "geometry": {
      "type": "Point",
      "coordinates": [-74.0060, 40.7128]
    },
    "__v": 1
  },
  {
    "_id": "685b0c0090b8e8499924b6db",
    "title": "Mountain Retreat",
    "description": "Unplug and unwind in this peaceful mountain cabin. Surrounded by natur…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,mountain&sig=3"
    },
    "price": 1000,
    "location": "Aspen",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Resort",
    "geometry": {
      "type": "Point",
      "coordinates": [-106.8241, 39.1911]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6dc",
    "title": "Historic Villa in Tuscany",
    "description": "Experience the charm of Tuscany in this beautifully restored villa. Ex…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,villa&sig=4"
    },
    "price": 2500,
    "location": "Florence",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [11.2558, 43.7696]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6dd",
    "title": "Secluded Treehouse Getaway",
    "description": "Live among the treetops in this unique treehouse retreat. A true natur…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,treehouse&sig=5"
    },
    "price": 800,
    "location": "Portland",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Homestay",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.6765, 45.5231]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6de",
    "title": "Beachfront Paradise",
    "description": "Step out of your door onto the sandy beach. This beachfront condo offe…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,cancun&sig=6"
    },
    "price": 2000,
    "location": "Cancun",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Beach",
    "geometry": {
      "type": "Point",
      "coordinates": [-86.8515, 21.1619]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6df",
    "title": "Rustic Cabin by the Lake",
    "description": "Spend your days fishing and kayaking on the serene lake. This cozy cab…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,cabin&sig=7"
    },
    "price": 900,
    "location": "Lake Tahoe",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Resort",
    "geometry": {
      "type": "Point",
      "coordinates": [-120.0324, 39.0968]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e0",
    "title": "Luxury Penthouse with City Views",
    "description": "Indulge in luxury living with panoramic city views from this stunning …",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,penthouse&sig=8"
    },
    "price": 3500,
    "location": "Los Angeles",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [-118.2437, 34.0522]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e1",
    "title": "Ski-In/Ski-Out Chalet",
    "description": "Hit the slopes right from your doorstep in this ski-in/ski-out chalet …",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,chalet&sig=9"
    },
    "price": 3000,
    "location": "Verbier",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Resort",
    "geometry": {
      "type": "Point",
      "coordinates": [7.2245, 46.0967]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e2",
    "title": "Safari Lodge in the Serengeti",
    "description": "Experience the thrill of the wild in a comfortable safari lodge. Witne…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,safari&sig=10"
    },
    "price": 4000,
    "location": "Serengeti National Park",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Boutique",
    "geometry": {
      "type": "Point",
      "coordinates": [34.8333, -2.3333]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e3",
    "title": "Historic Canal House",
    "description": "Stay in a piece of history in this beautifully preserved canal house i…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,canal&sig=11"
    },
    "price": 1800,
    "location": "Amsterdam",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Boutique",
    "geometry": {
      "type": "Point",
      "coordinates": [4.9041, 52.3676]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e4",
    "title": "Private Island Retreat",
    "description": "Have an entire island to yourself for a truly exclusive and unforgetta…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,island&sig=12"
    },
    "price": 10000,
    "location": "Fiji",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [178.0650, -17.7134]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e5",
    "title": "Charming Cottage in the Cotswolds",
    "description": "Escape to the picturesque Cotswolds in this quaint and charming cottag…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,cottage&sig=13"
    },
    "price": 1200,
    "location": "Cotswolds",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Homestay",
    "geometry": {
      "type": "Point",
      "coordinates": [-1.8333, 51.8333]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e6",
    "title": "Historic Brownstone in Boston",
    "description": "Step back in time in this elegant historic brownstone located in the h…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,boston&sig=14"
    },
    "price": 2200,
    "location": "Boston",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Boutique",
    "geometry": {
      "type": "Point",
      "coordinates": [-71.0589, 42.3601]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e7",
    "title": "Beachfront Bungalow in Bali",
    "description": "Relax on the sandy shores of Bali in this beautiful beachfront bungalo…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,bali&sig=15"
    },
    "price": 1800,
    "location": "Bali",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Beach",
    "geometry": {
      "type": "Point",
      "coordinates": [115.1889, -8.4095]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e8",
    "title": "Mountain View Cabin in Banff",
    "description": "Enjoy breathtaking mountain views from this cozy cabin in the Canadian…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,banff&sig=16"
    },
    "price": 1500,
    "location": "Banff",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Resort",
    "geometry": {
      "type": "Point",
      "coordinates": [-115.5727, 51.1784]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6e9",
    "title": "Art Deco Apartment in Miami",
    "description": "Step into the glamour of the 1920s in this stylish Art Deco apartment …",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,miami&sig=17"
    },
    "price": 1600,
    "location": "Miami",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Boutique",
    "geometry": {
      "type": "Point",
      "coordinates": [-80.1918, 25.7617]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6ea",
    "title": "Tropical Villa in Phuket",
    "description": "Escape to a tropical paradise in this luxurious villa with a private i…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,phuket&sig=18"
    },
    "price": 3000,
    "location": "Phuket",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [98.3883, 7.8804]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6eb",
    "title": "Historic Castle in Scotland",
    "description": "Live like royalty in this historic castle in the Scottish Highlands. E…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,castle&sig=19"
    },
    "price": 4000,
    "location": "Scottish Highlands",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [-4.0000, 57.0000]
    },
    "__v": 0
  },
  {
    "_id": "685b0c0090b8e8499924b6ec",
    "title": "Desert Oasis in Dubai",
    "description": "Experience luxury in the middle of the desert in this opulent oasis in…",
    "image": {
      "filename": "listing image",
      "url": "https://source.unsplash.com/800x600/?hotel,dubai&sig=20"
    },
    "price": 5000,
    "location": "Dubai",
    "reviews": [],
    "owner": "685af93bb4c5679151d59b8b",
    "category": "Luxury",
    "geometry": {
      "type": "Point",
      "coordinates": [55.2708, 25.2048]
    },
    "__v": 0
  }
];
module.exports ={data: sampleListings};