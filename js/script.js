// Quiz Questions and Options
let selectedGender = null;

// DOM Elements
const startQuizBtn = document.getElementById('startQuiz');
const genderSection = document.getElementById('genderSection');
const quizSection = document.getElementById('quizSection');
const questionContainer = document.getElementById('questionContainer');
const resultsSection = document.getElementById('resultsSection');
const perfumeResults = document.getElementById('perfumeResults');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Start button scrolls to gender selection
    startQuizBtn.addEventListener('click', function() {
        genderSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Gender selection
    const genderOptions = document.querySelectorAll('.gender-option');
    genderOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            genderOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Store selected gender based on index
            const genders = ['feminine', 'masculine', 'neutral'];
            selectedGender = genders[index];
            
            // Show quiz section after short delay
            setTimeout(() => {
                quizSection.classList.remove('hidden');
                quizSection.scrollIntoView({ behavior: 'smooth' });
                initializeQuiz();
            }, 500);
        });
    });
});

function initializeQuiz() {
    currentQuestion = 0;
    userResponses = [];
    showQuestion();
}

function startQuiz() {
    // Reset all states
    currentQuestion = 0;
    userResponses = [];
    selectedGender = null;

    // Reset section visibility
    resultsSection.classList.add('hidden');
    quizSection.classList.add('hidden');
    genderSection.classList.remove('hidden');

    // Clear any previous results
    perfumeResults.innerHTML = '';
    questionContainer.innerHTML = '';

    // Remove selected state from gender options
    const genderOptions = document.querySelectorAll('.gender-option');
    genderOptions.forEach(opt => opt.classList.remove('selected'));

    // Scroll to gender selection
    genderSection.scrollIntoView({ behavior: 'smooth' });
}

const questions = {
    feminine: [
        {
            id: 1,
            text: "How would you describe your ideal evening?",
            options: [
                { 
                    text: "A sophisticated dinner party", 
                    personality: "elegant",
                    image: "images/photo-1545128485-c400e7702796.jpg"
                },
                { 
                    text: "A relaxing spa night", 
                    personality: "relaxed",
                    image: "images/photo-1540555700478-4be289fbecef.jpg"
                },
                { 
                    text: "Dancing the night away", 
                    personality: "vibrant",
                    image: "images/photo-1545128485-c400e7702796.jpg"
                },
                { 
                    text: "Reading by candlelight", 
                    personality: "romantic",
                    image: "images/photo-1540555700478-4be289fbecef.jpg"
                }
            ]
        },
        {
            id: 2,
            text: "Which environment makes you feel most at peace?",
            options: [
                { 
                    text: "A blooming garden", 
                    personality: "floral",
                    image: "images/photo-1585320806297-9794b3e4eeae.jpg"
                },
                { 
                    text: "A beachside retreat", 
                    personality: "fresh",
                    image: "images/photo-1507525428034-b723cf961d3e.jpg"
                },
                { 
                    text: "A luxury boutique", 
                    personality: "sophisticated",
                    image: "images/photo-1604014237800-1c9102c219da.jpg"
                },
                { 
                    text: "A cozy café", 
                    personality: "warm",
                    image: "images/photo-1554118811-1e0d58224f24.jpg"
                }
            ]
        },
        {
            id: 3,
            text: "What's your preferred style aesthetic?",
            options: [
                { 
                    text: "Classic and timeless", 
                    personality: "elegant",
                    image: "images/photo-1490481651871-ab68de25d43d.jpg"
                },
                { 
                    text: "Bold and dramatic", 
                    personality: "vibrant",
                    image: "images/photo-1524504388940-b1c1722653e1.jpg"
                },
                { 
                    text: "Soft and romantic", 
                    personality: "romantic",
                    image: "images/photo-1524504388940-b1c1722653e1.jpg"
                },
                { 
                    text: "Modern minimalist", 
                    personality: "fresh",
                    image: "images/photo-1554412933-514a83d2f3c8.jpg"
                }
            ]
        },
        {
            id: 4,
            text: "What's your favorite season?",
            options: [
                { 
                    text: "Spring with blooming flowers", 
                    personality: "floral",
                    image: "images/photo-1490750967868-88aa4486c946.jpg"
                },
                { 
                    text: "Summer by the beach", 
                    personality: "fresh",
                    image: "images/photo-1507525428034-b723cf961d3e.jpg"
                },
                { 
                    text: "Cozy autumn evenings", 
                    personality: "warm",
                    image: "images/photo-1601979031925-424e53b6caaa.jpg"
                },
                { 
                    text: "Elegant winter nights", 
                    personality: "elegant",
                    image: "images/photo-1517299321609-52687d1bc55a.jpg"
                }
            ]
        },
        {
            id: 5,
            text: "What's your preferred accessory style?",
            options: [
                { 
                    text: "Delicate pearls", 
                    personality: "elegant",
                    image: "images/photo-1606760227091-3dd870d97f1d.jpg"
                },
                { 
                    text: "Colorful statement pieces", 
                    personality: "vibrant",
                    image: "images/photo-1515562141207-7a88fb7ce338.jpg"
                },
                { 
                    text: "Vintage-inspired jewelry", 
                    personality: "romantic",
                    image: "images/photo-1515562141207-7a88fb7ce338.jpg"
                },
                { 
                    text: "Minimalist designs", 
                    personality: "fresh",
                    image: "images/photo-1599643478518-a784e5dc4c8f.jpg"
                }
            ]
        }
    ],
    masculine: [
        {
            id: 1,
            text: "What's your ideal weekend activity?",
            options: [
                { 
                    text: "Adventure sports", 
                    personality: "adventurous",
                    image: "images/photo-1514924013411-cbf25faa35bb.jpg"
                },
                { 
                    text: "Business networking", 
                    personality: "sophisticated",
                    image: "images/photo-1511216335778-7cb8f49fa7a3.jpg"
                },
                { 
                    text: "Forest hiking", 
                    personality: "natural",
                    image: "images/photo-1501554728187-ce583db33af7.jpg"
                },
                { 
                    text: "Urban exploration", 
                    personality: "modern",
                    image: "images/photo-1514924013411-cbf25faa35bb.jpg"
                }
            ]
        },
        {
            id: 2,
            text: "Which environment inspires you most?",
            options: [
                { 
                    text: "A modern city skyline", 
                    personality: "modern",
                    image: "images/photo-1514565131-fce0801e5785.jpg"
                },
                { 
                    text: "Dense forest", 
                    personality: "natural",
                    image: "images/photo-1511497584788-876760111969.jpg"
                },
                { 
                    text: "Luxury car showroom", 
                    personality: "sophisticated",
                    image: "images/photo-1503376780353-7e6692767b70.jpg"
                },
                { 
                    text: "Mountain summit", 
                    personality: "adventurous",
                    image: "images/photo-1464822759023-fed622ff2c3b.jpg"
                }
            ]
        },
        {
            id: 3,
            text: "What's your signature style?",
            options: [
                { 
                    text: "Sharp suits", 
                    personality: "sophisticated",
                    image: "images/photo-1507679799987-c73779587ccf.jpg"
                },
                { 
                    text: "Casual luxury", 
                    personality: "modern",
                    image: "images/photo-1516826957135-700dedea698c.jpg"
                },
                { 
                    text: "Outdoor gear", 
                    personality: "adventurous",
                    image: "images/photo-1507679799987-c73779587ccf.jpg"
                },
                { 
                    text: "Eco-conscious fashion", 
                    personality: "natural",
                    image: "images/photo-1523381294911-8d3cead13475.jpg"
                }
            ]
        },
        {
            id: 4,
            text: "What's your ideal vacation?",
            options: [
                { 
                    text: "Mountain expedition", 
                    personality: "adventurous",
                    image: "images/photo-1464822759023-fed622ff2c3b.jpg"
                },
                { 
                    text: "Luxury city break", 
                    personality: "sophisticated",
                    image: "images/photo-1542314831-068cd1dbfeeb.jpg"
                },
                { 
                    text: "Desert adventure", 
                    personality: "natural",
                    image: "images/photo-1509316785289-025f5b846b35.jpg"
                },
                { 
                    text: "Tech conference", 
                    personality: "modern",
                    image: "images/photo-1505373877841-8d25f7d46678.jpg"
                }
            ]
        },
        {
            id: 5,
            text: "What's your preferred watch style?",
            options: [
                { 
                    text: "Classic chronograph", 
                    personality: "sophisticated",
                    image: "images/photo-1523170335258-f5ed11844a49.jpg"
                },
                { 
                    text: "Smart watch", 
                    personality: "modern",
                    image: "images/photo-1579586337278-3befd40fd17a.jpg"
                },
                { 
                    text: "Sports tracker", 
                    personality: "adventurous",
                    image: "images/photo-1523275335684-37898b6baf30.jpg"
                },
                { 
                    text: "Eco-friendly timepiece", 
                    personality: "natural",
                    image: "images/photo-1508057198894-247b23fe5ade.jpg"
                }
            ]
        }
    ],
    "neutral": [
        {
            id: 1,
            text: "What attracts you most in a scent?",
            options: [
                { 
                    text: "Complex layered notes", 
                    personality: "sophisticated",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "Natural ingredients", 
                    personality: "organic",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "Unique combinations", 
                    personality: "creative",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "Clean, pure scents", 
                    personality: "minimalist",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                }
            ]
        },
        {
            id: 2,
            text: "How do you express your creativity?",
            options: [
                { 
                    text: "Through art", 
                    personality: "creative",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "In nature", 
                    personality: "organic",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "With technology", 
                    personality: "minimalist",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                },
                { 
                    text: "Through fashion", 
                    personality: "sophisticated",
                    image: "images/photo-1490481651871-ab68de25d43d.jpg"
                }
            ]
        },
        {
            id: 3,
            text: "What's your ideal space like?",
            options: [
                { 
                    text: "Minimalist design", 
                    personality: "minimalist",
                    image: "images/photo-1554995207-c18c203602cb.jpg"
                },
                { 
                    text: "Artistic studio", 
                    personality: "creative",
                    image: "images/photo-1513364776144-60967b0f800f.jpg"
                },
                { 
                    text: "Eco-friendly haven", 
                    personality: "organic",
                    image: "images/photo-1518156677180-95a2893f3e9f.jpg"
                },
                { 
                    text: "Luxury loft", 
                    personality: "sophisticated",
                    image: "images/photo-1600607687939-ce8a6c25118c.jpg"
                }
            ]
        },
        {
            id: 4,
            text: "What's your preferred art style?",
            options: [
                { 
                    text: "Abstract expressionism", 
                    personality: "creative",
                    image: "images/photo-1541961017774-22349e4a1262.jpg"
                },
                { 
                    text: "Nature photography", 
                    personality: "organic",
                    image: "images/photo-1469474968028-56623f02e42e.jpg"
                },
                { 
                    text: "Minimalist installations", 
                    personality: "minimalist",
                    image: "images/photo-1552196563-55cd4e45efb3.jpg"
                },
                { 
                    text: "Classical masterpieces", 
                    personality: "sophisticated",
                    image: "images/photo-1557170334-a9632e77c6e4.jpg"
                }
            ]
        },
        {
            id: 5,
            text: "What's your ideal living space?",
            options: [
                { 
                    text: "Sustainable eco-home", 
                    personality: "organic",
                    image: "images/photo-1518156677180-95a2893f3e9f.jpg"
                },
                { 
                    text: "Modern smart home", 
                    personality: "minimalist",
                    image: "images/photo-1558211583-d26f610c1eb1.jpg"
                },
                { 
                    text: "Artist's loft", 
                    personality: "creative",
                    image: "images/photo-1513694203232-719a280e022f.jpg"
                },
                { 
                    text: "Luxury penthouse", 
                    personality: "sophisticated",
                    image: "images/photo-1600607687939-ce8a6c25118c.jpg"
                }
            ]
        }
    ]
};

const fragranceRecommendations = {
    feminine: {
        elegant: {
            name: "Royal Rose",
            description: "A sophisticated blend of Bulgarian rose, jasmine, and vanilla",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Rose", "Jasmine", "Vanilla"]
        },
        vibrant: {
            name: "Citrus Burst",
            description: "An energetic mix of citrus and exotic flowers",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Bergamot", "Orange Blossom", "Jasmine"]
        },
        romantic: {
            name: "Moonlight Petal",
            description: "A dreamy combination of white flowers and musk",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Lily", "White Musk", "Peony"]
        },
        fresh: {
            name: "Ocean Breeze",
            description: "A fresh aquatic scent with coastal flowers",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Sea Salt", "Water Lily", "Driftwood"]
        }
    },
    masculine: {
        adventurous: {
            name: "Mountain Summit",
            description: "An invigorating blend of woods and spices",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Cedar", "Cardamom", "Leather"]
        },
        sophisticated: {
            name: "Executive Suite",
            description: "A refined combination of rare woods and amber",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Oud", "Amber", "Sandalwood"]
        },
        modern: {
            name: "Urban Edge",
            description: "A contemporary blend of metallic and woody notes",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Metallic Notes", "Vetiver", "Black Pepper"]
        },
        natural: {
            name: "Forest Path",
            description: "An authentic journey through forest essences",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Pine", "Moss", "Earth"]
        }
    },
    neutral: {
        sophisticated: {
            name: "Pure Elegance",
            description: "A balanced blend of precious ingredients",
            image: "https://images.unsplash.comper/photo-1557170334-a9632e77c6e4?auto=format&fit=crop&w=800&q=80",
            notes: ["Iris", "White Amber", "Musk"]
        },
        organic: {
            name: "Earth Elements",
            description: "A natural composition of botanical essences",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Green Tea", "Bamboo", "Rain"]
        },
        creative: {
            name: "Artistic Expression",
            description: "An innovative blend of unexpected notes",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Saffron", "Incense", "Violet"]
        },
        minimalist: {
            name: "Pure Essence",
            description: "A clean, simple blend of essential elements",
           image:"images/photo-1557170334-a9632e77c6e4.jpg",
            notes: ["Cotton", "White Musk", "Minerals"]
        }
    }
};

// Perfume Database
const perfumes = {
    feminine: {
        floral: [
            {
                name: "Rose Elegance",
                notes: "Bulgarian Rose, Peony, White Musk",
                description: "A sophisticated floral bouquet that captures the essence of fresh roses",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ],
        fresh: [
            {
                name: "Morning Dew",
                notes: "Bergamot, Green Tea, Jasmine",
                description: "A light and invigorating scent perfect for daily wear",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ]
    },
    masculine: {
        woody: [
            {
                name: "Cedar Noir",
                notes: "Cedar, Sandalwood, Amber",
                description: "A sophisticated woody fragrance with deep, lasting notes",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ],
        fresh: [
            {
                name: "Ocean Breeze",
                notes: "Marine Notes, Citrus, White Musk",
                description: "A fresh and energizing scent inspired by the ocean",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ]
    },
    "it doesn't matter": {
        fresh: [
            {
                name: "Pure Essence",
                notes: "Citrus, Green Tea, Sea Salt",
                description: "A clean, universal fragrance that transcends traditional boundaries",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ],
        floral: [
            {
                name: "Bloom Universal",
                notes: "White Flowers, Vanilla, Amber",
                description: "A balanced floral fragrance suitable for any preference",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ],
        oriental: [
            {
                name: "Mystic Blend",
                notes: "Amber, Vanilla, Exotic Spices",
                description: "A versatile oriental fragrance that adapts to your unique chemistry",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ],
        woody: [
            {
                name: "Earth & Sky",
                notes: "Sandalwood, Vetiver, White Musk",
                description: "A grounding scent that bridges natural elements",
                image:"images/photo-1557170334-a9632e77c6e4.jpg",
            }
        ]
    }
};

// Global Variables
let currentQuestion = 0;
let userResponses = [];

function handleAnswer(personality) {
    // Store the answer for the current question
    userResponses[currentQuestion] = personality;
    
    // Add selected state to the clicked option
    const buttons = document.querySelectorAll('.option-button');
    buttons.forEach(button => {
        button.classList.remove('selected');
        if (button.dataset.personality === personality) {
            button.classList.add('selected');
        }
    });

    // Wait a moment before moving to next question
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions[selectedGender].length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 500);
}

function showQuestion() {
    if (!selectedGender) {
        console.error('Gender not selected');
        alert('Gender not selected')
        return;
    }
    
    const genderQuestions = questions[selectedGender];
    
    if (currentQuestion >= genderQuestions.length) {
        showResults();
        return;
    }

    const question = genderQuestions[currentQuestion];
    const questionHTML = `
        <div class="question-card fade-in">
            <div class="flex items-center justify-between mb-8">
                <button class="previous-question p-2 rounded-full hover:bg-gray-100 transition-colors ${currentQuestion === 0 ? 'invisible' : ''}" 
                        ${currentQuestion === 0 ? 'disabled' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h3 class="text-2xl text-center flex-grow px-4" data-i18n="quiz.questions.${selectedGender}.${question.id}.text">${question.text}</h3>
                <button class="next-question p-2 rounded-full hover:bg-gray-100 transition-colors ${currentQuestion === genderQuestions.length - 1 ? 'invisible' : ''}"
                        ${currentQuestion === genderQuestions.length - 1 ? 'disabled' : ''}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${question.options.map((option, index) => `
                    <button class="option-button group bg-header relative" data-personality="${option.personality}">
                        <div class="overflow-hidden rounded-lg mb-3">
                            <img src="${option.image}" 
                                 alt="${option.text}" 
                                 class="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110">
                        </div>
                        <p class="text-lg font-medium group-hover:text-indigo-600 transition-colors" data-i18n="quiz.questions.${selectedGender}.${question.id}.options.${index}">
                            ${option.text}
                        </p>
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    questionContainer.innerHTML = questionHTML;

    // Add click handlers to options
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', () => handleAnswer(button.dataset.personality));
    });

    // Add click handlers to navigation arrows
    const previousButton = document.querySelector('.previous-question');
    const nextButton = document.querySelector('.next-question');

    if (previousButton) {
        previousButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentQuestion < genderQuestions.length - 1 && userResponses[currentQuestion]) {
                currentQuestion++;
                showQuestion();
            }
        });
    }

    // Update translations for dynamically added elements
    if (window.i18n && typeof window.i18n.updateContent === 'function') {
        window.i18n.updateContent();
    }
}

function showResults() {
    // Show loading message first
    perfumeResults.innerHTML = `
        <div class="text-center col-span-full">
            <h2 class="text-3xl font-bold mb-4 text-gray-800" data-i18n="results.loadingTitle">Your Perfect Match</h2>
            <p class="text-xl mb-8 text-gray-600" data-i18n="results.loadingMessage">We're crafting your perfect fragrance recommendation...</p>
            <div class="animate-pulse flex justify-center">
                <div class="h-4 w-4 bg-amber-500 rounded-full mx-1"></div>
                <div class="h-4 w-4 bg-amber-500 rounded-full mx-1 animate-pulse-delay-200"></div>
                <div class="h-4 w-4 bg-amber-500 rounded-full mx-1 animate-pulse-delay-400"></div>
            </div>
        </div>
    `;

    // Calculate personality traits and their frequencies
    const personalityCount = {};
    userResponses.forEach(response => {
        personalityCount[response] = (personalityCount[response] || 0) + 1;
    });

    // Sort personalities by frequency
    const sortedPersonalities = Object.entries(personalityCount)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);

    // Get primary and secondary personalities
    const primaryPersonality = sortedPersonalities[0];
    const secondaryPersonality = sortedPersonalities[1] || primaryPersonality;

    // Delay to show loading animation
    setTimeout(() => {
        // Get recommendations from both fragranceRecommendations and perfumes
        const recommendationsSource = selectedGender === "it doesn't matter" ? 
            fragranceRecommendations.neutral : 
            fragranceRecommendations[selectedGender];
            
        const primaryRec = recommendationsSource[primaryPersonality];
        const secondaryRec = recommendationsSource[secondaryPersonality];
        const generalRecs = perfumes[selectedGender] || {};

        // Combine all relevant recommendations
        const recommendations = [];
        
        // Get translations for match types
        const perfectMatchText = window.i18n ? window.i18n.getTranslation('results.matchTypes.perfect') : 'Perfect Match';
        const greatAlternativeText = window.i18n ? window.i18n.getTranslation('results.matchTypes.alternative') : 'Great Alternative';
        const complementaryChoiceText = window.i18n ? window.i18n.getTranslation('results.matchTypes.complementary') : 'Complementary Choice';
        
        // Add primary recommendation
        if (primaryRec) {
            recommendations.push({
                name: primaryRec.name,
                description: primaryRec.description,
                notes: Array.isArray(primaryRec.notes) ? primaryRec.notes.join(", ") : primaryRec.notes,
                image: primaryRec.image,
                match: perfectMatchText,
                matchClass: "bg-gradient-to-r from-amber-500 to-amber-600"
            });
        }

        // Add secondary recommendation
        if (secondaryRec && secondaryRec !== primaryRec) {
            recommendations.push({
                name: secondaryRec.name,
                description: secondaryRec.description,
                notes: Array.isArray(secondaryRec.notes) ? secondaryRec.notes.join(", ") : secondaryRec.notes,
                image: secondaryRec.image,
                match: greatAlternativeText,
                matchClass: "bg-gradient-to-r from-purple-500 to-purple-600"
            });
        }

        // Add complementary recommendations from perfumes database
        Object.values(generalRecs).forEach(perfumeList => {
            perfumeList.forEach(perfume => {
                if (recommendations.length < 6) { // Show up to 6 recommendations
                    recommendations.push({
                        name: perfume.name,
                        description: perfume.description,
                        notes: perfume.notes,
                        image: perfume.image,
                        match: complementaryChoiceText,
                        matchClass: "bg-gradient-to-r from-rose-400 to-rose-500"
                    });
                }
            });
        });

        // Get translations for results section
        const titleText = window.i18n ? window.i18n.getTranslation('results.title') : 'Your Perfect Match';
        const subtitleText = window.i18n ? window.i18n.getTranslation('results.subtitle') : 'Based on your unique preferences, we\'ve selected these fragrances that perfectly match your personality.';
        const keyNotesText = window.i18n ? window.i18n.getTranslation('results.keyNotes') : 'Key Notes';
        const takeQuizAgainText = window.i18n ? window.i18n.getTranslation('results.restart') : 'Take Quiz Again';

        // Display recommendations
        const resultsHTML = `
            <div class="text-center mb-12">
                <p class="text-dark-bg max-w-2xl mx-auto">Based on your unique preferences, we've selected these fragrances that perfectly match your personality.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${recommendations.map(rec => `
                    <div class="bg-[#e2e2e2] rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                        <div class="relative">
                            <img src="${rec.image}" alt="${rec.name}" class="w-full h-64 object-cover">
                            <div class="absolute top-4 right-4 bg-header text-dark-text px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                                ${rec.match}
                            </div>
                        </div>
                        <div class="p-6 border-t border-gray-100">
                            <h3 class="text-xl font-semibold text-gray-900 mb-2">${rec.name}</h3>
                            <p class="text-gray-600 mb-4 line-clamp-2">${rec.description}</p>
                            <div class="border-t border-gray-100 pt-4">
                                <p class="text-sm font-medium text-amber-600" data-i18n="results.keyNotes">${keyNotesText}</p>
                                <p class="text-sm text-gray-600 mt-1">${rec.notes}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="text-center mt-12">
                <button onclick="startQuiz()" class="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300" data-i18n="results.restart">
                    ${takeQuizAgainText}
                </button>
            </div>
        `;

        // Show results section and scroll to it
        quizSection.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        perfumeResults.innerHTML = resultsHTML;
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Update translations for dynamically added elements
        if (window.i18n && typeof window.i18n.updateContent === 'function') {
            window.i18n.updateContent();
        }
    }, 2000); // 2-second delay to show loading animation
}
     // Mobile Menu Functionality
     const mobileMenuBtn = document.getElementById('mobileMenuBtn');
     const closeMenuBtn = document.getElementById('closeMenu');
     const mobileMenu = document.getElementById('mobileMenu');
     const mainNav = document.getElementById('mainNav');

     // Function to toggle menu
     function toggleMenu(show) {
         if (show) {
             mobileMenu.classList.add('active');
         } else {
             mobileMenu.classList.remove('active');
         }
     }

     // Handle scroll for navigation
     let lastScroll = 0;
     window.addEventListener('scroll', () => {
         const currentScroll = window.pageYOffset;
         
         if (currentScroll <= 0) {
             mainNav.classList.remove('fixed');
             mainNav.classList.remove('shadow-md');
         } else {
             mainNav.classList.add('fixed');
             mainNav.classList.add('shadow-md');
         }
         
         lastScroll = currentScroll;
     });

     mobileMenuBtn.addEventListener('click', () => {
         toggleMenu(true);
     });

     closeMenuBtn.addEventListener('click', () => {
         toggleMenu(false);
     });

     // Close menu when clicking outside
     document.addEventListener('click', (e) => {
         if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
             toggleMenu(false);
         }
     });

     // Add event listener for mobile language selector
     document.addEventListener('DOMContentLoaded', () => {
         const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
         if (mobileLanguageSelector) {
             mobileLanguageSelector.addEventListener('change', (e) => {
                 window.i18n.switchLanguage(e.target.value);
                 // Also update the desktop selector
                 const desktopSelector = document.getElementById('languageSelector');
                 if (desktopSelector) {
                     desktopSelector.value = e.target.value;
                 }
             });
         }
     });