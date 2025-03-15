

// Shop Products Database
const shopProducts = {
    perfumes: [
        {
            id: 1,
            name: "Royal Rose",
            description: "A sophisticated blend of Bulgarian rose, jasmine, and vanilla",
            price: 129.99,
            image: "images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg",
            notes: ["Rose", "Jasmine", "Vanilla"],
            categories: {
                scent: ["Floral", "Oriental"],
                season: ["Spring", "Summer"],
                occasion: ["Formal Events", "Romantic Date"]
            }
        },
        {
            id: 2,
            name: "Ocean Breeze",
            description: "A fresh aquatic scent with coastal flowers",
            price: 89.99,
            image: "images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg",
            notes: ["Sea Salt", "Water Lily", "Driftwood"],
            categories: {
                scent: ["Fresh", "Citrus"],
                season: ["Summer"],
                occasion: ["Daily Wear", "Sports & Active"]
            }
        },
        {
            id: 3,
            name: "Mountain Summit",
            description: "An invigorating blend of woods and spices",
            price: 109.99,
            image: "images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg",
            notes: ["Cedar", "Cardamom", "Leather"],
            categories: {
                scent: ["Woody", "Oriental"],
                season: ["Autumn", "Winter"],
                occasion: ["Evening", "Formal Events"]
            }
        },
        {
            id: 4,
            name: "Citrus Burst",
            description: "An energetic mix of citrus and exotic flowers",
            price: 79.99,
            image: "images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg",
            notes: ["Bergamot", "Orange Blossom", "Jasmine"],
            categories: {
                scent: ["Citrus", "Fresh"],
                season: ["Spring", "Summer"],
                occasion: ["Daily Wear", "Sports & Active"]
            }
        },
        {
            id: 5,
            name: "Pure Essence",
            description: "A clean, simple blend of essential elements",
            price: 94.99,
            image: "images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg",
            notes: ["Cotton", "White Musk", "Minerals"],
            categories: {
                scent: ["Fresh"],
                season: ["All Seasons"],
                occasion: ["Daily Wear", "Formal Events"]
            }
        }
    ]
};

// State
let currentCategory = 'all';
let activeFilters = new Set();
let compareList = new Set();
const MAX_COMPARE_ITEMS = 3;

// DOM Elements
const categoryTabs = document.querySelectorAll('.category-tab');
const filterGroups = document.querySelectorAll('.filter-group');
const filterButtons = document.querySelectorAll('.filter-button');
const productsGrid = document.getElementById('productsGrid');
const body = document.body;

// Update hero pattern style
const header = document.querySelector('header');
if (header) {
    header.style.backgroundImage = "linear-gradient(to right, rgb(52 48 48 / 90%), rgb(55 51 51 / 80%)), url(images/photo-1615634260167-c8cdede054de.jpg)";
    header.style.backgroundSize = "cover";
    header.style.backgroundPosition = "center";
    header.style.position = "relative";
    header.style.zIndex = "1";
    
    // Add floating perfume bottles decoration
    header.insertAdjacentHTML('beforeend', `
        <div class="absolute inset-0 -z-10 overflow-hidden">
            <img src="images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg" 
                 class="absolute -right-10 top-10 w-48 h-48 object-cover rounded-full opacity-20 transform rotate-12">
            <img src="images/fulvio-ciccolo-E6Ed669pvQQ-unsplash.jpg" 
                 class="absolute -left-10 bottom-10 w-36 h-36 object-cover rounded-full opacity-20 transform -rotate-12">
        </div>
    `);
}

// Add comparison modal HTML
document.body.insertAdjacentHTML('beforeend', `
    <div id="compareModal" class="fixed inset-0  bg-opacity-50 hidden items-center justify-center z-50">
        <div class="section-bg-dark rounded-xl p-8 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-cormorant font-bold" data-i18n="shop.compare.title">Compare Perfumes</h2>
                <button id="closeCompare" class="text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div id="compareContent" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Comparison content will be inserted here -->
            </div>
        </div>
    </div>
`);

// Add quick view modal HTML
document.body.insertAdjacentHTML('beforeend', `
    <div id="quickViewModal" class="fixed inset-0 section-bg-dark bg-opacity-50 hidden items-center justify-center z-50">
        <div class="bg-header rounded-xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
            <button id="closeQuickView" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-xl"></i>
            </button>
            <div id="quickViewContent" class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Quick view content will be inserted here -->
            </div>
        </div>
    </div>
`);

// Add event listeners for comparison
const compareModal = document.getElementById('compareModal');
const closeCompare = document.getElementById('closeCompare');
const compareContent = document.getElementById('compareContent');

closeCompare.addEventListener('click', () => {
    compareModal.classList.add('hidden');
    compareModal.classList.remove('flex');
    document.getElementById('mainNav').style.zIndex = '100';
});

// Add event listeners for quick view
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickView = document.getElementById('closeQuickView');
const quickViewContent = document.getElementById('quickViewContent');

closeQuickView.addEventListener('click', () => {
    quickViewModal.classList.add('hidden');
    quickViewModal.classList.remove('flex');
    document.getElementById('mainNav').style.zIndex = '100';
});

// Event Listeners
categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Update active tab
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show/hide relevant filter groups
        const category = tab.dataset.category;
        currentCategory = category;
        
        filterGroups.forEach(group => {
            group.classList.add('hidden');
        });

        if (category !== 'all') {
            document.getElementById(`${category}Filters`).classList.remove('hidden');
        }

        // Reset filters and update display
        activeFilters.clear();
        filterButtons.forEach(btn => btn.classList.remove('active'));
        updateProductDisplay();
    });
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('active');
        const filter = button.dataset.filter;
        
        if (button.classList.contains('active')) {
            activeFilters.add(filter);
        } else {
            activeFilters.delete(filter);
        }
        
        updateProductDisplay();
    });
});

// Functions
function updateProductDisplay() {
    const filteredProducts = filterProducts();
    displayProducts(filteredProducts);
    
    // Apply translations to dynamically created content
    if (window.i18n && window.i18n.updateContent) {
        window.i18n.updateContent();
    }
}

function filterProducts() {
    if (currentCategory === 'all' && activeFilters.size === 0) {
        return shopProducts.perfumes;
    }

    return shopProducts.perfumes.filter(product => {
        if (activeFilters.size === 0) return true;

        if (currentCategory === 'all') {
            return Array.from(activeFilters).some(filter => 
                Object.values(product.categories).flat().includes(filter)
            );
        }

        return Array.from(activeFilters).some(filter => 
            product.categories[currentCategory].includes(filter)
        );
    });
}

function displayProducts(products) {
    // Get translations for buttons
    const addToCartText = window.i18n ? window.i18n.getTranslation('shop.product.addToCart') : 'Add to Cart';
    const viewDetailsText = window.i18n ? window.i18n.getTranslation('shop.product.viewDetails') : 'View Details';
    const compareText = window.i18n ? window.i18n.getTranslation('shop.product.compare') : 'Compare';
    const keyNotesText = window.i18n ? window.i18n.getTranslation('shop.product.keyNotes') : 'Key Notes:';
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 group">
            <div class="relative">
                <a href="/product.html">
                <img src="${product.image}" alt="${product.name}" class="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-110">
                </a>
                <div class="absolute top-4 right-4">
                    <div class="golden-gradient text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm bg-opacity-30">
                        $${product.price}
                    </div>
                </div>
                <button 
                    onclick="toggleCompare(${product.id})" 
                    class="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
                    aria-label="${compareText}"
                    data-i18n-aria-label="shop.product.compare"
                >
                    <i class="fas fa-balance-scale ${compareList.has(product.id) ? 'text-amber-800' : 'text-black'}"></i>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div class="space-y-2">
                 <a href="/product.html">
                    <h3 class="text-2xl font-cormorant font-bold text-gray-900">${product.name}</h3>
                    </a>
                    <p class="text-gray-600 text-sm leading-relaxed">${product.description}</p>
                    <div class="flex items-center gap-2 mt-3">
                        <span class="text-sm font-medium text-amber-800" data-i18n="shop.product.keyNotes">${keyNotesText}</span>
                        <span class="text-sm text-gray-600">${product.notes.join(" • ")}</span>
                    </div>
                </div>
                <div class="space-y-3 pt-4 border-t border-gray-100">
                    <div class="flex flex-wrap gap-2">
                        ${product.categories.occasion.map(occasion => `
                            <span class="text-xs px-3 py-1 bg-amber-50 text-amber-800 rounded-full">${occasion}</span>
                        `).join('')}
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <button 
                            onclick="showQuickView(${product.id})" 
                            class="flex-1 mr-2 px-4 py-2 bg-white border-2 border-amber-800 text-amber-800 rounded-full hover:bg-amber-800 hover:text-white transition-colors duration-300"
                            aria-label="${viewDetailsText}"
                            data-i18n="shop.product.viewDetails"
                        >
                            ${viewDetailsText}
                        </button>
                        <button 
                            class="flex-1 ml-2 px-4 py-2 golden-gradient text-dark-text rounded-full hover:opacity-90 transition-opacity duration-300"
                            aria-label="${addToCartText}"
                            data-i18n="shop.product.addToCart"
                        >
                            ${addToCartText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add animation to cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease-out';
        }, index * 100);
    });
}

function toggleCompare(productId) {
    if (compareList.has(productId)) {
        compareList.delete(productId);
        updateProductDisplay();
        return;
    }

    if (compareList.size >= MAX_COMPARE_ITEMS) {
        // Get translation for alert message
        const maxCompareMessage = window.i18n ? 
            window.i18n.getTranslation('shop.compare.maxItems').replace('{max}', MAX_COMPARE_ITEMS) : 
            `You can only compare up to ${MAX_COMPARE_ITEMS} perfumes at a time`;
        
        alert(maxCompareMessage);
        return;
    }

    compareList.add(productId);
    updateProductDisplay();
    
    // Automatically show comparison when 2 or more items are selected
    if (compareList.size >= 2) {
        showComparison();
    }
}

function showComparison() {
    if (compareList.size === 0) return;
    
    // Get translations
    const addToCartText = window.i18n ? window.i18n.getTranslation('shop.product.addToCart') : 'Add to Cart';
    const notesText = window.i18n ? window.i18n.getTranslation('shop.filters.notes') : 'Notes';
    const categoriesText = window.i18n ? window.i18n.getTranslation('shop.categories.all') : 'Categories';
    const compareTitle = window.i18n ? window.i18n.getTranslation('shop.compare.title') : 'Compare Perfumes';
    const removeText = window.i18n ? window.i18n.getTranslation('shop.compare.remove') : 'Remove';
    
    // Update the comparison modal title
    const titleElement = document.querySelector('#compareModal h2');
    if (titleElement) {
        titleElement.textContent = compareTitle;
    }
    
    const productsToCompare = Array.from(compareList).map(id => 
        shopProducts.perfumes.find(p => p.id === id)
    ).filter(Boolean);
    
    compareContent.innerHTML = productsToCompare.map(product => `
        <div class="flex flex-col items-center product-card">
            <div class="relative w-full h-64 mb-4">
                <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover rounded-lg">
                <button 
                    onclick="toggleCompare(${product.id}); showComparison();" 
                    class="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                    aria-label="${removeText}"
                    data-i18n-aria-label="shop.compare.remove"
                >
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <h3 class="text-xl font-cormorant font-bold mb-2 text-dark-text">${product.name}</h3>
            <p class="text-amber-800 font-medium mb-4">$${product.price}</p>
            <div class="w-full px-6 pb-8">
                <h4 class="font-medium mb-2" data-i18n="shop.filters.notes">${notesText}:</h4>
                <ul class="list-disc flex gap-7 pl-5 mb-4">
                    ${product.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
                <h4 class="font-medium mb-2" data-i18n="shop.categories.all">${categoriesText}:</h4>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${Object.entries(product.categories).map(([category, values]) => 
                        values.map(value => 
                            `<span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">${value}</span>`
                        ).join('')
                    ).join('')}
                </div>
                <button 
                    class="w-full px-4 py-2 golden-gradient text-white rounded-full hover:opacity-90 transition-opacity duration-300"
                    aria-label="${addToCartText}"
                    data-i18n="shop.product.addToCart"
                >
                    ${addToCartText}
                </button>
            </div>
        </div>
    `).join('');
    
    compareModal.classList.remove('hidden');
    compareModal.classList.add('flex');
    document.getElementById('mainNav').style.zIndex = '0';
    // Apply translations to dynamically created content
    if (window.i18n && window.i18n.updateContent) {
        window.i18n.updateContent();
    }
}

function showQuickView(productId) {
    const product = shopProducts.perfumes.find(p => p.id === productId);
    if (!product) return;
    
    // Get translations
    const addToCartText = window.i18n ? window.i18n.getTranslation('shop.product.addToCart') : 'Add to Cart';
    const notesText = window.i18n ? window.i18n.getTranslation('shop.filters.notes') : 'Notes';
    const perfectForText = window.i18n ? window.i18n.getTranslation('shop.quickView.perfectFor') : 'Perfect For';
    document.getElementById('mainNav').style.zIndex = '0';
    quickViewContent.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}" class="w-full h-96 object-cover rounded-lg">
        </div>
        <div class="flex flex-col">
            <h2 class="text-3xl font-cormorant font-bold mb-2 text-dark-text">${product.name}</h2>
            <p class="text-2xl text-amber-800 font-medium mb-6">$${product.price}</p>
            <p class="text-gray-600 mb-6">${product.description}</p>
            
            <div class="mb-6">
                <h3 class="font-medium mb-2 text-dark-text" data-i18n="shop.filters.notes">${notesText}:</h3>
                <div class="flex flex-wrap gap-2">
                    ${product.notes.map(note => 
                        `<span class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">${note}</span>`
                    ).join('')}
                </div>
            </div>
            
            <div class="mb-6">
                <h3 class="font-medium mb-2 text-dark-text" data-i18n="shop.quickView.perfectFor">${perfectForText}:</h3>
                <div class="flex flex-wrap gap-2">
                    ${Object.entries(product.categories).flatMap(([category, values]) => 
                        values.map(value => 
                            `<span class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">${value}</span>`
                        )
                    ).join('')}
                </div>
            </div>
            
            <div class="mt-auto">
                <button class="w-full px-6 py-3 golden-gradient text-dark-text rounded-full hover:opacity-90 transition-opacity duration-300 flex items-center justify-center space-x-2" data-i18n="shop.product.addToCart">
                    <i class="fas fa-shopping-cart"></i>
                    <span>${addToCartText}</span>
                </button>
            </div>
        </div>
    `;
    
    quickViewModal.classList.remove('hidden');
    quickViewModal.classList.add('flex');
    
    // Apply translations to dynamically created content
    if (window.i18n && window.i18n.updateContent) {
        window.i18n.updateContent();
    }
}

// Initialize translations and display products when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for i18n to be initialized
    const waitForI18n = setInterval(() => {
        if (window.i18n) {
            clearInterval(waitForI18n);
            
            // Initial display of products
            updateProductDisplay();
            
            // Add data-i18n attributes to filter buttons if they don't have them
            filterButtons.forEach(button => {
                const filterText = button.querySelector('span');
                if (filterText) {
                    const category = button.closest('.filter-group').dataset.category;
                    const filter = button.textContent.trim();
                    
                    // Set data-i18n attribute based on category and filter
                    if (category === 'scent') {
                        filterText.setAttribute('data-i18n', `shop.filters.scent.${filterText.textContent.toLowerCase()}`);
                    } else if (category === 'season') {
                        filterText.setAttribute('data-i18n', `shop.filters.season.${filterText.textContent.toLowerCase()}`);
                    } else if (category === 'occasion') {
                        const key = filterText.textContent.toLowerCase().replace(/\s+/g, '');
                        filterText.setAttribute('data-i18n', `shop.filters.occasion.${key}`);
                    }
                }
            });
            
            // Apply translations to all elements
            window.i18n.updateContent();
        }
    }, 100);
});

// Initial display (will be replaced by the DOMContentLoaded event handler)
// updateProductDisplay(); 
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