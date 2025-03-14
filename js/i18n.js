/**
 * Internationalization (i18n) functionality for Alda Perfume website
 * Handles language switching between English and Turkish
 */

// Default language is English
let currentLanguage = localStorage.getItem('language') || 'en';
let translations = {};
let i18nReady = false;

// Load translations for the current language
async function loadTranslations() {
    try {
        const response = await fetch(`translations/${currentLanguage}.json`);
        translations = await response.json();
        document.documentElement.lang = currentLanguage;
        updateContent();
        i18nReady = true;
        
        // Dispatch an event when translations are loaded
        document.dispatchEvent(new CustomEvent('i18n:loaded'));
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    i18nReady = false;
    loadTranslations();
}

// Update content with translations
function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        
        // Navigate through the translation object
        let value = translations;
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
            value = value[k];
        }
        
        // Update element content
        if (typeof value === 'string') {
            element.textContent = value;
        }
    });
    
    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const keys = key.split('.');
        
        // Navigate through the translation object
        let value = translations;
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
            value = value[k];
        }
        
        // Update element placeholder
        if (typeof value === 'string') {
            element.placeholder = value;
        }
    });
    
    // Update all elements with data-i18n-aria-label attribute
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        const keys = key.split('.');
        
        // Navigate through the translation object
        let value = translations;
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return;
            }
            value = value[k];
        }
        
        // Update element aria-label
        if (typeof value === 'string') {
            element.setAttribute('aria-label', value);
        }
    });
    
    // Update language selector
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }
    
    // Update mobile language selector
    const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
    if (mobileLanguageSelector) {
        mobileLanguageSelector.value = currentLanguage;
    }
}

// Initialize language functionality
document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    
    // Add event listener to language selector
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => {
            switchLanguage(e.target.value);
        });
    }
    
    // Add event listener to mobile language selector
    const mobileLanguageSelector = document.getElementById('mobileLanguageSelector');
    if (mobileLanguageSelector) {
        mobileLanguageSelector.addEventListener('change', (e) => {
            switchLanguage(e.target.value);
        });
    }
});

// Export functions for use in other scripts
window.i18n = {
    switchLanguage,
    getCurrentLanguage: () => currentLanguage,
    getTranslation: (key) => {
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
            if (value[k] === undefined) {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
            value = value[k];
        }
        return value;
    },
    updateContent,
    isReady: () => i18nReady
}; 