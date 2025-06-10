
// ======================
// STOCK DATA
// ======================
const stocks = [
    {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 182.63,
        change: 2.65,
        marketCap: "$2.8T",
        technical: 8.57,
        fundamental: 7.87,
        sentiment: 3.27,
        tags: ["Tech", "Large Cap", "Dividend"]
    },
    {
        symbol: "MSFT", 
        name: "Microsoft Corporation",
        price: 378.42,
        change: 1.84,
        marketCap: "$2.8T",
        technical: 9.12,
        fundamental: 8.45,
        sentiment: 4.21,
        tags: ["Tech", "Large Cap", "Cloud"]
    },
    {
        symbol: "GOOGL",
        name: "Alphabet Inc.",
        price: 142.56,
        change: -0.73,
        marketCap: "$1.8T", 
        technical: 7.23,
        fundamental: 8.91,
        sentiment: 3.89,
        tags: ["Tech", "Large Cap", "AI"]
    }
];

// ======================
// DOM ELEMENTS
// ======================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const stocksGrid = document.getElementById('stocksGrid');
const watchlistBtns = document.querySelectorAll('.watchlist-btn');

// ======================
// NAVIGATION FUNCTIONALITY
// ======================
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = navToggle.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.transform = 'none';
                        span.style.opacity = '1';
                    });
                }
            }
        });
    });
}

// ======================
// STOCK CARDS GENERATION
// ======================
function generateStockCards() {
    if (!stocksGrid) return;
    
    stocksGrid.innerHTML = stocks.map(stock => `
        <div class="stock-recommendation-card fade-in">
            <div class="stock-rec-header">
                <div class="stock-rec-info-left">
                    <div class="stock-rec-symbol">${stock.symbol}</div>
                    <div class="stock-rec-name">${stock.name}</div>
                </div>
                <div class="stock-rec-price">
                    <div class="price">$${stock.price.toFixed(2)}</div>
                    <div class="change ${stock.change >= 0 ? 'positive' : 'negative'}">
                        ${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}%
                    </div>
                </div>
            </div>
            <div class="stock-rec-info">
                <div class="market-cap">Market Cap: ${stock.marketCap}</div>
                <div class="tags">
                    ${stock.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // Add hover animations
    const cards = stocksGrid.querySelectorAll('.stock-recommendation-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
            card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
        });
    });
}

// ======================
// WATCHLIST FUNCTIONALITY
// ======================
function initWatchlistButtons() {
    watchlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const symbol = this.getAttribute('data-symbol');
            const isAdded = this.classList.contains('added');
            
            if (!isAdded) {
                // Add to watchlist
                this.classList.add('added');
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 8px;">
                        <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Added to Watchlist
                `;
                
                // Show success animation
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
                
                // Show toast notification
                showToast(`${symbol} added to watchlist!`, 'success');
            } else {
                // Remove from watchlist
                this.classList.remove('added');
                this.innerHTML = 'Add to Watchlist';
                showToast(`${symbol} removed from watchlist`, 'info');
            }
        });
    });
}

// ======================
// DEMO NAVIGATION
// ======================
function initDemoNavigation() {
    const demoNavItems = document.querySelectorAll('.demo-nav-item');
    
    demoNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            demoNavItems.forEach(navItem => navItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// ======================
// TOAST NOTIFICATIONS
// ======================
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-message">${message}</span>
            <button class="toast-close">&times;</button>
        </div>
    `;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#21CE99' : type === 'error' ? '#FF4757' : '#0F4C81'};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

// ======================
// SCORE ANIMATIONS
// ======================
function animateScores() {
    const scoreItems = document.querySelectorAll('.score-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const scoreFill = entry.target.querySelector('.score-fill');
                if (scoreFill) {
                    const targetWidth = scoreFill.style.width;
                    scoreFill.style.width = '0%';
                    
                    setTimeout(() => {
                        scoreFill.style.width = targetWidth;
                    }, 200);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    scoreItems.forEach(item => {
        observer.observe(item);
    });
}

// ======================
// SCROLL ANIMATIONS
// ======================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.feature-card, .module-card, .stock-recommendation-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// ======================
// INTERACTIVE TOOLTIPS
// ======================
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
                max-width: 200px;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8}px`;
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 100);
            
            this.addEventListener('mouseleave', () => {
                tooltip.style.opacity = '0';
                setTimeout(() => {
                    if (tooltip.parentNode) {
                        tooltip.parentNode.removeChild(tooltip);
                    }
                }, 300);
            }, { once: true });
        });
    });
}

// ======================
// FORM INTERACTIONS
// ======================
function initFormInteractions() {
    const ctaButtons = document.querySelectorAll('.btn-primary');
    
    ctaButtons.forEach(button => {
        if (button.textContent.includes('Create Free Account') || button.textContent.includes('Start Investing')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                showToast('Account creation feature coming soon!', 'info');
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        }
    });
}

// ======================
// PERFORMANCE OPTIMIZATION
// ======================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ======================
// INITIALIZATION
// ======================
function init() {
    console.log('🚀 Vektor Invest platform initialized');
    
    // Initialize all functionality
    initNavigation();
    generateStockCards();
    initWatchlistButtons();
    initDemoNavigation();
    animateScores();
    initScrollAnimations();
    initTooltips();
    initFormInteractions();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('✅ All features loaded successfully');
}

// ======================
// EVENT LISTENERS
// ======================
document.addEventListener('DOMContentLoaded', init);

// Handle window resize for responsive behavior
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    }
}, 250));

// Handle scroll events for header styling
let lastScrollY = window.scrollY;

window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
    
    lastScrollY = currentScrollY;
}, 10));

// ======================
// UTILITY FUNCTIONS
// ======================
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatPercentage(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function getRandomStock() {
    return stocks[Math.floor(Math.random() * stocks.length)];
}

// ======================
// EXPORT FOR TESTING
// ======================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        stocks,
        formatCurrency,
        formatPercentage,
        getRandomStock
    };
}
