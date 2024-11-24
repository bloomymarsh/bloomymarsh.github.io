// script.js
document.addEventListener('DOMContentLoaded', function() {
  coffeeShops.forEach((coffeeShop, index) => {
    coffeeShopListContainer.innerHTML += generateCoffeeShopHTML(coffeeShop, index);
  });
});


// 2a. Array
const coffeeShops = [
  {
    name: "Korbrick Coffee Co.",
    location: "Chelsea/West Village",
    address: "24 9th Ave, New York, NY 10014",
    image:
      "https://dw82ptradz9jo.cloudfront.net/daylog/6203524894d75733cd3bcbb2/103f254a-3d21-4245-a4ce-3949405fa679",
    website: "https://www.kobricks.com/",
    rating: 4.4
  },
  {
    name: "Foreigner NYC",
    location: "Chelsea/West Village",
    address: "64 W 21st St, New York, NY 10010",
    image:
      "https://foreigner.nyc/cdn/shop/files/Foreigner-Cafe_1500x.jpg?v=1677702944",
    website: "https://foreigner.nyc/",
    rating: 4.5
  },
  {
    name: "Coffee Project NY",
    location: "Chelsea/West Village",
    address: "155 7th Ave, New York, NY 10011",
    image:
      "https://www.worldcoffeeportal.com/getattachment/8cca3aa5-db6e-4d8b-8891-71eb943a8b1d/cafe-location-chelsea-interior-2-1200x800.jpg.aspx?lang=en-GB&width=700&height=466",
    website: "https://coffeeprojectny.com/",
    rating: 4.5
  },
  {
    name: "Stumptown Coffee Roasters",
    location: "Nomad/Soho",
    address: "18 W 29th St, New York, NY 10001",
    image:
      "https://stumptown-content.imgix.net/1fSMAQzO5aJLaon5QH9zsq/21b06749ec6fccda378551c6280b306b/STC_Shopify_Locations_Ace_New_York_STC_Shopify_Locations_Hero1.jpg?w=1400&auto=format,compress",
    website: "https://www.stumptowncoffee.com/",
    rating: 4.5
  },
  {
    name: "La Cabra",
    location: "Nomad/Soho",
    address: "284 Lafayette St, New York, NY 10012",
    image:
      "https://cdn.accentuate.io/85761458369/20312978522305/New_York_2022_La_Cabra_Coffee32_tiny-v1687435340678.jpg?1536x1920",
    website: "https://www.lacabra.dk/pages/new-york",
    rating: 4.5
  },
  {
    name: "The Lost Draft",
    location: "Nomad/Soho",
    address: "398 Broome St, New York, NY 10013",
    image:
      "https://dailycoffeenews.com/wp-content/uploads/2022/09/The-Lost-Draft-NYC-coffee-bar.jpeg",
    website: "https://www.thelostdraft.com/",
    rating: 4.4
  },
  {
    name: "Librae Bakery",
    location: "East Village",
    address: "35 Cooper Sq, New York, NY 10003",
    image:
      "https://fastly.4sqi.net/img/general/600x600/141934822_ModhaH0H7KmiH6GyVYCwfin2_AADFe2UyaEeL7Mhkic.jpg",
    website: "https://www.libraebakery.com/",
    rating: 4.6
  },
  {
    name: "Ludlow Coffee Supply",
    location: "East Village",
    address: "176 Ludlow St, New York, NY 10002",
    image:
      "https://i.pinimg.com/originals/f8/dc/31/f8dc31b66d9b86f6e337784ece0443a2.jpg",
    website: "http://www.ludlowcoffeesupply.com/",
    rating: 4.2
  },
  {
    name: "Culture Espresso",
    location: "Midtown/Hell's Kitchen",
    address: "307 W 38th St, New York, NY 10018",
    image:
      "https://images.squarespace-cdn.com/content/v1/5d5728dc255291000172fa57/1567695613293-6FTXNH8FZG8GNKW9GHA9/2019-culture-espresso-38th-002.jpg?format=2500w",
    website: "https://www.cultureespresso.com/",
    rating: 4.6
  },
  {
    name: "Black Fox Coffee",
    location: "Midtown/Hell's Kitchen",
    address: "438 W 33rd St, New York, NY 10001",
    image:
      "https://manhattanwestnyc.com/wp-content/uploads/2021/08/7L1A2144.jpg",
    website: "https://blackfoxcoffee.com/",
    rating: 4.6
  },
  {
    name: "Partners Coffee",
    location: "Midtown/Hell's Kitchen",
    address: "152 W 52nd St, New York, NY 10019",
    image:
      "https://www.partnerscoffee.com/cdn/shop/files/Untitled_1000_x_100_px.jpg?v=1692720216&width=1000",
    website: "https://www.partnerscoffee.com/",
    rating: 4.6
  },
  {
    name: "Joe Coffee Company",
    location: "Columbia",
    address: "Pulitzer Hall, 2950 Broadway, New York, NY 10027",
    image:
      "https://joecoffeecompany.com/wp-content/uploads/2018/08/1O0A0154-Edit-1920x1280.jpg",
    website: "https://joecoffeecompany.com/",
    rating: 3.5
  },
  {
    name: "Dear Mama",
    location: "Columbia",
    address: "611 W 129th St, New York, NY 10027",
    image:
      "https://fy2019annualreport.cufo.columbia.edu/sites/default/files/styles/cu_crop/public/content/Dear%20Mama%203.JPG?itok=ZfwTuEAP",
    website: "http://www.dearmamacoffee.com/",
    rating: 4.4
  },
  {
    name: "Devocion",
    location: "Brooklyn",
    address: "69 Grand St, Brooklyn, NY 11249",
    image:
      "https://www.devocion.com/cdn/shop/files/DowntownBK_Devocion_LizClayman_002_3.jpg?v=1659652393",
    website: "https://www.devocion.com/",
    rating: 4.6
  },
  {
    name: "SEY Coffee",
    location: "Brooklyn",
    address: "18 Grattan St, Brooklyn, NY 11206",
    image:
      "https://bklyner.com/content/images/bklyner/wp-content/uploads/2019/11/fullsizeoutput_18d.jpeg",
    website: "https://www.seycoffee.com/",
    rating: 4.6
  }
];

// 2b. Styling Automation

// Calling the HTML ID in line 89...
const coffeeShopListContainer = document.getElementById("coffeeShopList");

// ...to insert the array as a series of continuous content displayed in the HTML
coffeeShops.forEach((coffeeShop, index) => {
  coffeeShopListContainer.innerHTML += generateCoffeeShopHTML(
    coffeeShop,
    index
  );
});
// To randomly generate coffee shop carousel cards inside the modal
function generateCarouselBoxes(excludedIndex) {
  let carouselBoxes = "";
  const numberOfBoxes = 6; // Number of boxes you want to show
  let selectedIndices = new Set();

  while (selectedIndices.size < numberOfBoxes) {
    let randomIndex = Math.floor(Math.random() * coffeeShops.length);
    if (randomIndex !== excludedIndex) {
      selectedIndices.add(randomIndex);
    }
  }

  selectedIndices.forEach((index) => {
    carouselBoxes += `
      <div class="box">
        <img src="${coffeeShops[index].image}">
        <div>
          <p class="container1">${coffeeShops[index].name}</p>
        </div>
      </div>
    `;
  });
  
  return carouselBoxes;
}

// and here's what needs to be inserted
function generateCoffeeShopHTML(coffeeShop, index) {
return `
<div class="col">
    // <div class="card h-100" data-bs-toggle="modal" data-bs-target="#coffeeShopModal${index}"
        data-coffee-shop="${JSON.stringify(coffeeShop)}">
        <img src="${coffeeShop.image}" class="card-img-top" alt="${coffeeShop.name}">
        <div class="card-body">
            <h6 class="card-title">${coffeeShop.name}</h6>
            <p class="card-text">${coffeeShop.location}</p>
        </div>
    </div>
</div>

<div class="modal fade" id="coffeeShopModal${index}" tabindex="-1" aria-labelledby="coffeeShopModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="coffeeShopModalLabel">More Information</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h1>${coffeeShop.name}</h1>
                <br>
                <img src="${coffeeShop.image}">
                <br><br>
                <p><b>Location:</b> ${coffeeShop.location}</p>
                <p><b>Address:</b> ${coffeeShop.address}</p>
                <p><b>Website:</b> <a href="${coffeeShop.website}" target="_blank"
                        style="color: #334226;">${coffeeShop.website} </a></p>
                <p><b>Rating:</b> ${coffeeShop.rating}</p>
 <p><b>You might also like:</b></p>
                <!-- Recommendation Carousel -->
                <div id="carouselRecommendation${index}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="card_carousel_container">
                                ${generateCarouselBoxes(index)}
                                <!-- Add more carousel items as needed -->
                            </div>
                            <button class="carousel-control-prev" type="button"
                                data-bs-target="#carouselRecommendation${index}" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button"
                                data-bs-target="#carouselRecommendation${index}" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                        
                    </div>
                </div>
                <!-- End of Recommendation Carousel -->
            </div>
        </div>
    </div>
</div>
`;
}

// ––––––––––––––––––––

// ––––––––––––––––––––





document.getElementById('survey-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission

  // Get the location input value
  const location = document.getElementById('location').value;

  // Display a message with the entered location
  if (location) {
    alert('Thank you for submitting your squirrel sighting at ' + location);
  } else {
    alert('Please enter a location.');
  }
});
