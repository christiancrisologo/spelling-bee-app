const players = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Chloe',
    level: 'advance',
    score: 0,
  },
];

const words = [
  {
    "word": "aerobics",
    "level": "easy",
    "dictionary": "exercise that strengthens the heart and lungs",
    "image_url": ""
  },
  {
    "word": "Agassi",
    "level": "medium",
    "dictionary": "famous tennis player (Andre Agassi)",
    "image_url": ""
  },
  {
    "word": "allotment",
    "level": "medium",
    "dictionary": "a small plot of land for gardening",
    "image_url": ""
  },
  {
    "word": "aluminium",
    "level": "medium",
    "dictionary": "a lightweight metal (aluminum in US spelling)",
    "image_url": ""
  },
  {
    "word": "amateur",
    "level": "easy",
    "dictionary": "someone who does something for pleasure, not for money",
    "image_url": ""
  },
  {
    "word": "anchovy",
    "level": "medium",
    "dictionary": "a small saltwater fish",
    "image_url": ""
  },
  {
    "word": "antonym",
    "level": "medium",
    "dictionary": "a word with opposite meaning",
    "image_url": ""
  },
  {
    "word": "apparel",
    "level": "medium",
    "dictionary": "clothing",
    "image_url": ""
  },
  {
    "word": "apprentice",
    "level": "medium",
    "dictionary": "someone who is learning a trade from a skilled person",
    "image_url": ""
  },
  {
    "word": "artificial",
    "level": "medium",
    "dictionary": "made by humans, not natural",
    "image_url": ""
  },
  {
    "word": "ascertain",
    "level": "hard",
    "dictionary": "to find out something for sure",
    "image_url": ""
  },
  {
    "word": "asparagus",
    "level": "medium",
    "dictionary": "a green vegetable with long, thin stalks",
    "image_url": ""
  },
  {
    "word": "barramundi",
    "level": "hard",
    "dictionary": "a large, white saltwater fish",
    "image_url": ""
  },
  {
    "word": "Belarus",
    "level": "hard",
    "dictionary": "a country in Eastern Europe",
    "image_url": ""
  },
  {
    "word": "Belgium",
    "level": "easy",
    "dictionary": "a country in Western Europe",
    "image_url": ""
  },
  {
    "word": "billionaire",
    "level": "easy",
    "dictionary": "someone who has one billion dollars or more",
    "image_url": ""
  },
  {
    "word": "biodiversity",
    "level": "hard",
    "dictionary": "the variety of life on Earth",
    "image_url": ""
  },
  {
    "word": "blackcurrant",
    "level": "medium",
    "dictionary": "a small, dark purple berry",
    "image_url": ""
  },
  {
    "word": "boardercross",
    "level": "hard",
    "dictionary": "a snowboard race down a course with jumps and banks",
    "image_url": ""
  },
  {
    "word": "bocce",
    "level": "medium",
    "dictionary": "italian lawn bowling game",
    "image_url": ""
  },
  {
    "word": "Botswana",
    "level": "hard",
    "dictionary": "a country in Southern Africa",
    "image_url": ""
  },
  {
    "word": "cacao",
    "level": "medium",
    "dictionary": "the dried seeds of the cacao tree, used to make chocolate",
    "image_url": ""
  },
  {
    "word": "cafeteria",
    "level": "easy",
    "dictionary": "a large dining hall, typically at a school or institution"
  },
  {
    "word": "calculus",
    "level": "hard",
    "dictionary": "the branch of mathematics concerned with the relationships between infinitesimals"
  },
  {
    "word": "canister",
    "level": "medium",
    "dictionary": "a cylindrical container, typically made of metal"
  },
  {
    "word": "catalyst",
    "level": "medium",
    "dictionary": "a substance that increases the rate of a reaction without being used up"
  },
  {
    "word": "catamaran",
    "level": "medium",
    "dictionary": "a boat with two hulls connected by a deck"
  },
  {
    "word": "champagne",
    "level": "easy",
    "dictionary": "a sparkling white wine produced in the Champagne region of France"
  },
  {
    "word": "chipolata",
    "level": "medium",
    "dictionary": "a small sausage"
  },
  {
    "word": "cirrus",
    "level": "medium",
    "dictionary": "wispy, feathery clouds, composed of ice crystals"
  },
  {
    "word": "cumulus",
    "level": "easy",
    "dictionary": "puffy, white clouds with flat bases"
  },
  {
    "word": "decompression",
    "level": "medium",
    "dictionary": "the reduction of pressure on a gas or liquid"
  },
  {
    "word": "diffraction",
    "level": "medium",
    "dictionary": "the bending of light or other waves around the edges of an obstacle"
  },
  {
    "word": "diffusion",
    "level": "medium",
    "dictionary": "the spontaneous net movement of molecules or atoms from a region of high concentration to a region of low concentration"
  },
  {
    "word": "effigy",
    "level": "medium",
    "dictionary": "a figure, typically resembling a person, that is burned or mutilated in public as a punishment or warning"
  },
  {
    "word": "eiderdown",
    "level": "medium",
    "dictionary": "the soft down of eider ducks, used to make quilts and pillows"
  },
  {
    "word": "eloquent",
    "level": "medium",
    "dictionary": "fluent or persuasive in speaking or writing"
  },
  {
    "word": "emancipate",
    "level": "medium",
    "dictionary": "to set free from legal, social, or political restriction"
  },
  {
    "word": "empathetic",
    "level": "medium",
    "dictionary": "showing an ability to understand and share the feelings of another"
  },
  {
    "word": "encapsulate",
    "level": "medium",
    "dictionary": "to enclose or surround completely"
  },
  {
    "word": "encryption",
    "level": "medium",
    "dictionary": "the process of converting information or data into a form that cannot be easily understood by unauthorized people"
  },
  {
    "word": "erudition",
    "level": "hard",
    "dictionary": "the quality of having or showing great knowledge or learning"
  },
  {
    "word": "escarpment",
    "level": "medium",
    "dictionary": "a long, steep cliff"
  },
  {
    "word": "espouse",
    "level": "medium",
    "dictionary": "to adopt or support (an idea or cause)"
  },
  {
    "word": "excellence",
    "level": "easy",
    "dictionary": "the quality of being outstanding or extremely good"
  },
  {
    "word": "exceptional",
    "level": "medium",
    "dictionary": "far above average or normal"
  },
  {
    "word": "exhaustion",
    "level": "easy",
    "dictionary": "the state of being completely tired out"
  },
  {
    "word": "expostulate",
    "level": "hard",
    "dictionary": "to argue strongly, typically in protest"
  },
  {
    "word": "falsetto",
    "level": "medium",
    "dictionary": "a very high register of the voice, especially in men"
  },
  {
    "word": "familiarity",
    "level": "easy",
    "dictionary": "the state of knowing or being known about something"
  },
  {
    "word": "figurative",
    "level": "medium",
    "dictionary": "not meant to be taken literally"
  },
  {
    "word": "finicky",
    "level": "medium",
    "dictionary": "very particular about what one likes or dislikes"
  },
  {
    "word": "flagrant",
    "level": "medium",
    "dictionary": "done without any attempt to hide"
  },
  {
    "word": "fluoride",
    "level": "medium",
    "dictionary": "a compound containing fluorine, used in toothpaste to prevent tooth decay"
  },
  {
    "word": "forage",
    "level": "medium",
    "dictionary": "to search for food or provisions"
  },
  {
    "word": "fracas",
    "level": "hard",
    "dictionary": "a noisy argument or fight"
  },
  {
    "word": "fragmentary",
    "level": "medium",
    "dictionary": "existing in fragments or incomplete parts"
  },
  {
    "word": "frivolity",
    "level": "medium",
    "dictionary": "lack of seriousness or importance"
  },
  {
    "word": "gauze",
    "level": "easy",
    "dictionary": "a thin, loose fabric used for bandages and dressings"
  },
  {
    "word": "gazetteer",
    "level": "hard",
    "dictionary": "a geographical dictionary"
  },
  {
    "word": "generic",
    "level": "easy",
    "dictionary": "relating to a general type of something rather than to a particular example"
  },
  {
    "word": "generosity",
    "level": "easy",
    "dictionary": "the quality of being kind and generous"
  },
  {
    "word": "genotype",
    "level": "hard",
    "dictionary": "the genetic constitution of an organism"
  },
  {
    "word": "genteel",
    "level": "hard",
    "dictionary": "refined and polite in a way that is old-fashioned"
  },
  {
    "word": "geyser",
    "level": "easy",
    "dictionary": "a hot spring that intermittently erupts, ejecting a column of hot water and steam"
  },
  {
    "word": "gibberish",
    "level": "easy",
    "dictionary": "nonsense language",
    "image_url": ""
  },
  {
    "word": "glutinous",
    "level": "medium",
    "dictionary": "sticky or gluey",
    "image_url": ""
  },
  {
    "word": "grievance",
    "level": "medium",
    "dictionary": "a complaint or cause for complaint",
    "image_url": ""
  },
  {
    "word": "guava",
    "level": "easy",
    "dictionary": "a tropical fruit with sweet, white flesh",
    "image_url": "[Image of Guava fruit]"
  },
  {
    "word": "Gulpilil",
    "level": "hard",
    "dictionary": "Australian Aboriginal actor (1950-2021)",
    "image_url": "[Image of David Gulpilil]"
  },
  {
    "word": "gymnastics",
    "level": "medium",
    "dictionary": "physical exercises requiring strength, flexibility, and coordination",
    "image_url": "[Image of Gymnast performing]"
  },
  {
    "word": "harangue",
    "level": "hard",
    "dictionary": "a long, angry speech",
    "image_url": ""
  },
  {
    "word": "heavyweight",
    "level": "easy",
    "dictionary": "in boxing, the weight class above light heavyweight",
    "image_url": "[Image of Heavyweight boxer]"
  },
  {
    "word": "Helsinki",
    "level": "medium",
    "dictionary": "the capital of Finland",
    "image_url": "[Image of Helsinki city]"
  },
  {
    "word": "hereditary",
    "level": "medium",
    "dictionary": "passed on from a parent to their child",
    "image_url": ""
  },
  {
    "word": "hibernation",
    "level": "easy",
    "dictionary": "a state of dormancy in animals during winter",
    "image_url": "[Image of Hibernating animal]"
  },
  {
    "word": "hibiscus",
    "level": "easy",
    "dictionary": "a flowering shrub with large, showy flowers",
    "image_url": "[Image of Hibiscus flower]"
  },
  {
    "word": "Hillary",
    "level": "easy",
    "dictionary": "a female given name",
    "image_url": ""
  },
  {
    "word": "hominid",
    "level": "medium",
    "dictionary": "any member of the family Hominidae, including humans and their closest extinct relatives",
    "image_url": "[Image of Hominid skull]"
  },
  {
    "word": "Honduras",
    "level": "medium",
    "dictionary": "a country in Central America",
    "image_url": "[Image of Honduras flag]"
  },
  {
    "word": "horizontal",
    "level": "easy",
    "dictionary": "parallel to the horizon; across",
    "image_url": ""
  },
  {
    "word": "horticulture",
    "level": "medium",
    "dictionary": "the art or science of growing fruits, vegetables, and flowers",
    "image_url": "[Image of Horticulture garden]"
  },
  {
    "word": "hydraulic",
    "level": "medium",
    "dictionary": "operated by or using a liquid under pressure",
    "image_url": ""
  },
  {
    "word": "hypocrisy",
    "level": "medium",
    "dictionary": "the behavior of pretending to have moral standards or beliefs that one does not really hold",
    "image_url": ""
  },
  {
    "word": "igneous",
    "level": "medium",
    "dictionary": "formed by fire or great heat",
    "image_url": "[Image of Igneous rock]"
  },
  {
    "word": "immediately",
    "level": "easy",
    "dictionary": "without delay",
    "image_url": ""
  },
  {
    "word": "impropriety",
    "level": "medium",
    "dictionary": "unsuitableness",
    "image_url": ""
  },
  {
    "word": "incubator",
    "level": "medium",
    "dictionary": "apparatus for hatching eggs",
    "image_url": ""
  },
  {
    "word": "indefensible",
    "level": "medium",
    "dictionary": "impossible to justify",
    "image_url": ""
  },
  {
    "word": "indemnified",
    "level": "hard",
    "dictionary": "compensated for loss",
    "image_url": ""
  },
  {
    "word": "indigestion",
    "level": "medium",
    "dictionary": "discomfort after eating",
    "image_url": ""
  },
  {
    "word": "inexplicable",
    "level": "medium",
    "dictionary": "impossible to explain",
    "image_url": ""
  },
  {
    "word": "inflammatory",
    "level": "medium",
    "dictionary": "causing inflammation",
    "image_url": ""
  },
  {
    "word": "inhospitable",
    "level": "medium",  
    "dictionary": "not friendly or welcoming",
    "image_url": ""
  },
  {
    "word": "inoperable",
    "level": "medium",
    "dictionary": "not able to be operated",
    "image_url": ""
  },
  {
    "word": "insatiable",
    "level": "medium",
    "dictionary": "impossible to satisfy",
    "image_url": ""
  },
  {
    "word": "insolvency",
    "level": "hard",
    "dictionary": "inability to pay debts",
    "image_url": ""
  },
  {
    "word": "instigator",
    "level": "medium",
    "dictionary": "a person who causes something to happen",
    "image_url": ""
  },
  {
    "word": "insubordinate",
    "level": "medium",
    "dictionary": "disobedient to authority",
    "image_url": ""
  },
  {
    "word": "insufferable",
    "level": "hard",
    "dictionary": "unbearably unpleasant",
    "image_url": ""
  },
  {
    "word": "insurrection",
    "level": "hard",
    "dictionary": "a violent uprising against authority",
    "image_url": ""
  },
  {
    "word": "intelligence",
    "level": "easy",
    "dictionary": "the ability to acquire and apply knowledge and skills",
    "image_url": ""
  },
  {
    "word": "interference",
    "level": "medium",
    "dictionary": "disturbance or interruption"
  },
  {
    "word": "intolerable",
    "level": "medium",
    "dictionary": "unbearably bad or unpleasant"
  },
  {
    "word": "intractable",
    "level": "hard",
    "dictionary": "difficult to deal with or control"
  },
  {
    "word": "intransigent",
    "level": "hard",
    "dictionary": "refusing to change one's mind or cooperate"
  },
  {
    "word": "invariably",
    "level": "medium",
    "dictionary": "always; without exception"
  },
  {
    "word": "investigation",
    "level": "medium",
    "dictionary": "a close examination or inquiry"
  },
  {
    "word": "invigorate",
    "level": "medium",
    "dictionary": "to give strength or energy to"
  },
  {
    "word": "involuntary",
    "level": "medium",
    "dictionary": "not done or happening by choice"
  },
  {
    "word": "isometrics",
    "level": "hard",
    "dictionary": "muscle exercises involving static contractions"
  },
  {
    "word": "itinerant",
    "level": "medium",
    "dictionary": "traveling from place to place"
  },
  {
    "word": "jacaranda",
    "level": "medium",
    "dictionary": "a flowering tree with beautiful blue or violet flowers",
    "image_url": "[jacaranda tree image]"
  },
  {
    "word": "jamboree",
    "level": "medium",
    "dictionary": "a large and noisy celebration"
  },
  {
    "word": "jeopardy",
    "level": "medium",
    "dictionary": "danger or risk"
  },
  {
    "word": "jonquil",
    "level": "medium",
    "dictionary": "a small yellow bulb flower",
    "image_url": "[jonquil flower image]"
  },
  {
    "word": "judiciary",
    "level": "hard",
    "dictionary": "the system of courts of law in a country"
  },
  {
    "word": "justifiable",
    "level": "medium",
    "dictionary": "able to be justified or explained"
  },
  {
    "word": "Kalahari",
    "level": "medium",
    "dictionary": "a large desert in southern Africa",
    "image_url": "[Kalahari desert image]"
  },
  {
    "word": "Keneally",
    "level": "hard",
    "dictionary": "This could be a surname"
  },
  {
    "word": "Kewell",
    "level": "hard",
    "dictionary": "This could be a surname"
  },
  {
    "word": "knapsack",
    "level": "medium",
    "dictionary": "a backpack or rucksack"
  },
    {
      "word": "kombucha",
      "level": "medium",
      "dictionary": "fermented tea drink",
      "image_url": "https://www.istockphoto.com/photos/kombucha"
    },
    {
      "word": "laborious",
      "level": "hard",
      "dictionary": "requiring a lot of effort",
      "image_url": null
    },
    {
      "word": "lacklustre",
      "level": "medium",
      "dictionary": "showing a lack of enthusiasm",
      "image_url": null
    },
    {
      "word": "lacrosse",
      "level": "easy",
      "dictionary": "team sport using a stick with a net",
      "image_url": "https://www.istockphoto.com/photos/lacrosse"
    },
    {
      "word": "lexicography",
      "level": "hard",
      "dictionary": "the study of words and their meanings",
      "image_url": null
    },
    {
      "word": "lichen",
      "level": "medium",
      "dictionary": "a fungus growing in symbiosis with algae",
      "image_url": "https://www.istockphoto.com/photos/lichen"
    },
    {
      "word": "lieutenant",
      "level": "medium",
      "dictionary": "military officer ranking below captain",
      "image_url": "https://www.istockphoto.com/photos/lieutenant"
    },
    {
      "word": "liquidate",
      "level": "hard",
      "dictionary": "to sell off assets to raise money",
      "image_url": null
    },
    {
      "word": "litany",
      "level": "hard",
      "dictionary": "a long, formal prayer or recitation",
      "image_url": null
    },
    {
      "word": "llama",
      "level": "easy",
      "dictionary": "South American domesticated relative of the alpaca",
      "image_url": "https://unsplash.com/s/photos/llama"
    },
    {
      "word": "longitude",
      "level": "medium",
      "dictionary": "angular distance east or west of the prime meridian",
      "image_url": "https://www.shutterstock.com/search/longitude"
    },
    {
      "word": "ludicrous",
      "level": "medium",  
      "dictionary": "completely absurd",
      "image_url": null
    },
    {
      "word": "mackerel",
      "level": "easy",
      "dictionary": "a type of oily saltwater fish",
      "image_url": "https://www.istockphoto.com/photos/mackerel"
    },
    {
      "word": "Madagascar",
      "level": "medium",
      "dictionary": "large island country off the southeast coast of Africa",
      "image_url": "https://www.istockphoto.com/photos/madagascar"
    },
    {
      "word": "magnificent",
      "level": "medium",
      "dictionary": "grand, impressive, or beautiful",
      "image_url": null
    }
];


module.exports = {
  players,
  words
};
