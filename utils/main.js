/**
 * PT MIRAI ENERGI SUPLAI - MAIN JAVASCRIPT
 * SPA Routing, Dynamic Component Loading, Dark Mode, & WhatsApp Form Integration
 */

// Configuration
const CONFIG = {
    whatsappNumber: "6282121289181", // Business WhatsApp Number
    components: {
        header: "components/header.html",
        sidebar: "components/sidebar.html",
        footer: "components/footer.html"
    },
    routes: {
        "home": { file: "pages/home.html", title: "PT Mirai Energi Suplai | Energi Biomassa Berkelanjutan" },
        "about": { file: "pages/about_us.html", title: "Tentang Kami | PT Mirai Energi Suplai" },
        "about_us": { file: "pages/about_us.html", title: "Tentang Kami | PT Mirai Energi Suplai" },
        "product": { file: "pages/product.html", title: "Katalog Produk | PT Mirai Energi Suplai" },
        "detail_produk_1": { file: "pages/detail_produk_1.html", title: "Solid Recovered Fuel (SRF) | PT Mirai Energi Suplai" },
        "detail_produk_2": { file: "pages/detail_produk_2.html", title: "Cacahan Sekam Padi | PT Mirai Energi Suplai" },
        "detail_produk_3": { file: "pages/detail_produk_3.html", title: "Cacahan Bonggol Jagung | PT Mirai Energi Suplai" },
        "detail_produk_4": { file: "pages/detail_produk_4.html", title: "Enercycle Fuel (ECF) | PT Mirai Energi Suplai" },
        "detail_produk_5": { file: "pages/detail_produk_5.html", title: "Wood Chip (Serpihan Kayu) | PT Mirai Energi Suplai" },
        "detail_produk_6": { file: "pages/detail_produk_6.html", title: "Wood Pellet (Pelet Kayu) | PT Mirai Energi Suplai" },
        "partnership": { file: "pages/partnership.html", title: "Kemitraan, Logistik & ESG | PT Mirai Energi Suplai" },
        "contact": { file: "pages/contact.html", title: "Hubungi Kami (Kemitraan B2B) | PT Mirai Energi Suplai" }
    },
    defaultRoute: "home"
};

// State Manager
const AppState = {
    isDarkMode: false,
    currentRoute: ""
};

/**
 * Initialize Dark/Light Mode immediately to prevent FOUC (Flash of Unstyled Content)
 */
function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add("dark-mode");
        AppState.isDarkMode = true;
    } else {
        document.body.classList.remove("dark-mode");
        AppState.isDarkMode = false;
    }
    updateThemeToggleUI();
}

/**
 * Update Theme Toggle Icon in DOM if button exists
 */
function updateThemeToggleUI() {
    const toggles = document.querySelectorAll(".theme-toggle");
    toggles.forEach(toggle => {
        if (!toggle) return;
        
        // Dynamic SVG change or class setting
        if (AppState.isDarkMode) {
            toggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <!-- Sun Icon for Light Mode conversion -->
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z"/>
                </svg>
                <span class="sr-only">Toggle Light Mode</span>
            `;
        } else {
            toggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <!-- Moon Icon for Dark Mode conversion -->
                    <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10C2.2 6.8 6.4 2.5 11.7 2.1c.5 0 .9.3 1.1.7.2.4.1.9-.2 1.2-2.1 2.1-2.9 5.2-1.9 8 1 2.7 3.6 4.5 6.5 4.5.6 0 1.2-.1 1.7-.3.5-.2 1 0 1.2.4.2.4.1.9-.3 1.2-2.2 2.6-5.4 4.2-7.5 4.2zm-2.8-17.7c-3.7.8-6.5 4.1-6.5 8 0 4.4 3.6 8 8 8 1.9 0 3.7-.7 5.1-1.9-.9.1-1.7.2-2.6.2-4.1 0-7.7-2.6-9-6.5-1.3-3.8-.3-8 2.5-10.8z"/>
                </svg>
                <span class="sr-only">Toggle Dark Mode</span>
            `;
        }
    });
}

/**
 * Toggle between Dark and Light mode
 */
function toggleTheme() {
    AppState.isDarkMode = !AppState.isDarkMode;
    if (AppState.isDarkMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }
    updateThemeToggleUI();
}

/**
 * Helper to fetch content asynchronously
 * @param {string} url 
 * @returns {Promise<string>}
 */
async function fetchHtml(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load ${url} (Status: ${response.status})`);
    }
    return await response.text();
}

/**
 * Asynchronously fetch and load layout components (Header, Sidebar, Footer)
 */
async function loadComponents() {
    try {
        // Fetch components concurrently
        const [headerHtml, sidebarHtml, footerHtml] = await Promise.all([
            fetchHtml(CONFIG.components.header).catch(err => {
                console.error("Header Component Error:", err);
                return `<nav class="header-container container"><a href="#/home" class="brand-logo">PT MES</a></nav>`;
            }),
            fetchHtml(CONFIG.components.sidebar).catch(err => {
                console.error("Sidebar Component Error:", err);
                return `<div class="sidebar-wrapper" id="sidebar-menu"></div>`;
            }),
            fetchHtml(CONFIG.components.footer).catch(err => {
                console.error("Footer Component Error:", err);
                return `<footer class="footer-wrapper"><div class="container text-center"><p>&copy; PT Mirai Energi Suplai</p></div></footer>`;
            })
        ]);

        // Inject Header and Footer into roots
        const headerRoot = document.getElementById("header-root");
        const footerRoot = document.getElementById("footer-root");

        if (headerRoot) {
            headerRoot.innerHTML = headerHtml;
        }

        if (footerRoot) {
            footerRoot.innerHTML = footerHtml;
        }

        // Setup Sidebar: Append directly to body if it doesn't exist
        let sidebarRoot = document.getElementById("sidebar-root-container");
        if (!sidebarRoot) {
            sidebarRoot = document.createElement("div");
            sidebarRoot.id = "sidebar-root-container";
            document.body.appendChild(sidebarRoot);
        }
        sidebarRoot.innerHTML = sidebarHtml;

        // Initialize component event listeners (menu toggles, theme toggles, etc.)
        initComponentInteractivity();
        
        // Sync UI toggles
        updateThemeToggleUI();

    } catch (error) {
        console.error("Failed to load components:", error);
    }
}

/**
 * Initialize Interactivity for components (Hamburger Menu, Theme Switcher)
 */
function initComponentInteractivity() {
    // 1. Mobile Menu Toggles
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar-wrapper");
    let overlay = document.querySelector(".sidebar-overlay");

    // If overlay doesn't exist, create it dynamically
    if (!overlay && sidebar) {
        overlay = document.createElement("div");
        overlay.className = "sidebar-overlay";
        document.body.appendChild(overlay);
    }

    if (menuBtn && sidebar && overlay) {
        // Clean up old events by cloning the button (helps with SPA re-renders)
        const newMenuBtn = menuBtn.cloneNode(true);
        menuBtn.parentNode.replaceChild(newMenuBtn, menuBtn);

        const toggleMenu = () => {
            newMenuBtn.classList.toggle("open");
            sidebar.classList.toggle("open");
            overlay.classList.toggle("show");
        };

        newMenuBtn.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", toggleMenu);

        // Close menu when clicking nav link inside sidebar
        const sidebarLinks = sidebar.querySelectorAll(".nav-link");
        sidebarLinks.forEach(link => {
            link.addEventListener("click", () => {
                newMenuBtn.classList.remove("open");
                sidebar.classList.remove("open");
                overlay.classList.remove("show");
            });
        });
    }

    // 2. Dark Mode Switch Toggle Events
    const themeButtons = document.querySelectorAll(".theme-toggle");
    themeButtons.forEach(btn => {
        // Clone and replace to prevent multiple listeners
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        newBtn.addEventListener("click", toggleTheme);
    });

    // 3. Setup Navigation active highlight
    updateActiveNavigation();
}

/**
 * Update Active state on Navbar links
 */
/**
 * Update Active state on Navbar links
 */
function updateActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentRoute = AppState.currentRoute;

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;
        
        // Match path like #/about_us, ?page=about_us, #/about, ?page=about, etc.
        const isMatch = href === `#/${currentRoute}` || 
                        href === `?page=${currentRoute}` ||
                        (currentRoute === CONFIG.defaultRoute && (href === "#/home" || href === "?page=home" || href === "#" || href === "./"));

        if (isMatch) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}

/**
 * SPA Router: Dynamically load content based on Hash or Query String
 */
async function router() {
    // Parse route from query parameter (?page=about) or hash (#/about)
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const hashPath = window.location.hash;
    let routeKey = CONFIG.defaultRoute;

    if (pageParam) {
        if (CONFIG.routes[pageParam]) {
            routeKey = pageParam;
        } else {
            routeKey = "404";
        }
    } else if (hashPath) {
        // Strip out leading '#' and '/'
        const cleanPath = hashPath.replace(/^#\/?/, "");
        if (CONFIG.routes[cleanPath]) {
            routeKey = cleanPath;
        } else if (cleanPath !== "") {
            routeKey = "404";
        }
    }

    AppState.currentRoute = routeKey;

    const contentRoot = document.getElementById("content-root");
    if (!contentRoot) return;

    // Loading State
    contentRoot.innerHTML = `
        <div class="container section-padding text-center" style="min-height: 50vh; display: flex; align-items: center; justify-content: center;">
            <div class="loader-spinner" style="border: 4px solid var(--secondary); border-top: 4px solid var(--primary); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite;"></div>
            <style>
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            </style>
        </div>
    `;

    try {
        if (routeKey === "404") {
            document.title = "Halaman Tidak Ditemukan | PT Mirai Energi Suplai";
            contentRoot.innerHTML = `
                <section class="container section-padding text-center" style="min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                    <h1 style="font-size: 6rem; color: var(--primary);">404</h1>
                    <h2 style="margin-bottom: 1.5rem;">Halaman Tidak Ditemukan</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 2.5rem; max-width: 500px;">
                        Maaf, halaman yang Anda cari tidak tersedia. Pastikan URL Anda sudah benar atau kembali ke halaman utama.
                    </p>
                    <a href="?page=home" class="btn btn-primary">Kembali ke Beranda</a>
                </section>
            `;
            updateActiveNavigation();
            return;
        }

        const route = CONFIG.routes[routeKey];
        document.title = route.title;

        // Fetch page HTML
        const html = await fetchHtml(route.file);
        contentRoot.innerHTML = html;

        // Highlight active navbar items
        updateActiveNavigation();

        // Scroll page back to top smoothly
        window.scrollTo({ top: 0, behavior: 'instant' });

    } catch (error) {
        console.error("Router Error loading page:", error);
        contentRoot.innerHTML = `
            <section class="container section-padding text-center" style="min-height: 60vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <h2 style="color: var(--primary); margin-bottom: 1rem;">Terjadi Kesalahan</h2>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Gagal memuat konten halaman. Silakan coba memuat kembali halaman ini.</p>
                <button onclick="window.location.reload()" class="btn btn-primary">Muat Ulang</button>
            </section>
        `;
    }
}

/**
 * WhatsApp Form Submission Handler (Event Delegation)
 */
function initFormHandler() {
    document.addEventListener("submit", function(event) {
        // Target specifically our B2B Form ID
        if (event.target && event.target.id === "whatsapp-form") {
            event.preventDefault();
            
            const form = event.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            
            try {
                // Get form input values
                const name = form.querySelector("#name")?.value.trim() || "";
                const company = form.querySelector("#company")?.value.trim() || "";
                const email = form.querySelector("#email")?.value.trim() || "";
                const productType = form.querySelector("#product-type")?.value || "";
                const message = form.querySelector("#message")?.value.trim() || "";

                // Simple validation
                if (!name || !company || !email || !productType || !message) {
                    alert("Harap lengkapi semua kolom formulir.");
                    return;
                }

                // Temporary loading state on submit button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerText = "Mengirim...";
                }

                // Compose formatted text for WhatsApp B2B Client
                const waMessage = 
`*FORMULIR KEMITRAAN B2B - PT MIRAI ENERGI SUPLAI*

*Nama Pengirim:* ${name}
*Perusahaan:* ${company}
*Alamat Email:* ${email}
*Kategori Kemitraan:* ${productType}

*Pesan / Deskripsi Kebutuhan:*
_${message}_

Tanggal Pengiriman: ${new Date().toLocaleDateString('id-ID')}
Status: Dikirim via Web SPA`;

                // URL Encode text
                const encodedText = encodeURIComponent(waMessage);
                
                // Formulate target WhatsApp API URL
                const waUrl = `https://api.whatsapp.com/send?phone=${CONFIG.whatsappNumber}&text=${encodedText}`;
                
                // Open WhatsApp Window in new tab
                window.open(waUrl, "_blank");

                // Clear Form on success
                form.reset();

            } catch (err) {
                console.error("WhatsApp Form Handler Error:", err);
                alert("Gagal memproses formulir. Silakan coba kembali.");
            } finally {
                // Restore submit button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = "Kirim Formulir Kemitraan";
                }
            }
        }
    });
}

// Initialize Application
(async function init() {
    // 1. Immediately apply the theme setting
    initTheme();

    // 2. Load static header, sidebar, and footer components
    await loadComponents();

    // 3. Set up event delegation for contact forms
    initFormHandler();

    // 4. Intercept clicks on query string links (?page=) to handle them as SPA transitions
    document.addEventListener("click", function(e) {
        const link = e.target.closest("a");
        if (link) {
            const href = link.getAttribute("href");
            if (href && (href.startsWith("?page=") || href.startsWith("./?page="))) {
                e.preventDefault();
                const page = href.split("page=")[1];
                window.location.hash = `#/${page}`;
            }
        }
    });

    // 5. Attach routing events (hashchange & page load)
    window.addEventListener("hashchange", router);
    window.addEventListener("load", router);
    
    // Trigger router manually on initial start (covers reload or deep links)
    router();

    // 6. Sticky header scroll shadow effect
    const handleScroll = () => {
        const header = document.getElementById("main-header");
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 10);
        }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on load
})();
