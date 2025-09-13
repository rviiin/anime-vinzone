// script.js - renders anime, modal, search, genre filter, fallback handling

// fallback if MAL image fails
const fallbackImage = "https://via.placeholder.com/300x450?text=No+Image";

// 20 anime (verified poster URLs from MAL / AniList where possible)
const animeData = [
    {
        title: "Solo Leveling",
        genre: "Action, Fantasy",
        rating: 8.7,
        image: "https://cdn.myanimelist.net/images/manga/3/222295l.jpg",
        synopsis: "In a world where hunters fight monsters, Sung Jin-Woo starts as the weakest but gains the ability to level up without limit."
    },
    {
        title: "Jujutsu Kaisen Season 2",
        genre: "Action, Supernatural",
        rating: 9.0,
        image: "https://cdn.myanimelist.net/images/anime/1792/138022l.jpg",
        synopsis: "Yuji Itadori and his allies confront curses in the Shibuya Incident, one of the most intense arcs of the series."
    },
    {
        title: "Frieren: Beyond Journey’s End",
        genre: "Adventure, Drama, Fantasy",
        rating: 9.1,
        image: "https://cdn.myanimelist.net/images/anime/1015/138006l.jpg",
        synopsis: "Elf mage Frieren sets out on a journey to understand humans better after her hero party’s disbandment."
    },
    {
        title: "Dandadan",
        genre: "Action, Comedy, Sci-Fi",
        rating: 8.5,
        image: "https://cdn.myanimelist.net/images/anime/1541/142082l.jpg",
        synopsis: "A quirky blend of aliens and ghosts as two high schoolers get caught up in bizarre supernatural events."
    },
    {
        title: "Kaiju No. 8",
        genre: "Action, Sci-Fi",
        rating: 8.3,
        image: "https://cdn.myanimelist.net/images/anime/1652/131861l.jpg",
        synopsis: "Kafka Hibino gains the ability to transform into a kaiju, joining the Defense Force to protect humanity."
    },
    {
        title: "Chainsaw Man",
        genre: "Action, Horror, Supernatural",
        rating: 8.8,
        image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        synopsis: "Denji, a devil hunter, merges with his pet devil Pochita to become Chainsaw Man, fighting devils in a brutal and chaotic world."
    },
    {
        title: "Blue Lock",
        genre: "Sports, Drama",
        rating: 8.2,
        image: "https://cdn.myanimelist.net/images/anime/1400/123773l.jpg",
        synopsis: "300 strikers are locked into an intense survival training program to create Japan’s ultimate forward."
    },
    {
        title: "Bocchi the Rock!",
        genre: "Comedy, Slice of Life",
        rating: 8.9,
        image: "https://cdn.myanimelist.net/images/anime/1448/127956.jpg",
        synopsis: "Shy and socially anxious Hitori Gotoh dreams of being in a band. Her guitar skills shine when she joins Kessoku Band."
    },
    {
        title: "My Dress-Up Darling",
        genre: "Romance, Slice of Life, Comedy",
        rating: 8.4,
        image: "https://cdn.myanimelist.net/images/anime/1687/138250l.jpg",
        synopsis: "A shy dollmaker teams up with a lively gyaru classmate to pursue cosplay, forming a unique bond."
    },
    {
        title: "Oshi no Ko",
        genre: "Drama, Supernatural",
        rating: 8.8,
        image: "https://cdn.myanimelist.net/images/anime/1812/134736.jpg",
        synopsis: "The reincarnated children of an idol enter the entertainment world, facing fame, betrayal, and dark secrets."
    },
    {
        title: "Spy x Family",
        genre: "Comedy, Action, Slice of Life",
        rating: 8.6,
        image: "https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
        synopsis: "A spy, an assassin, and a telepath form a fake family, navigating hilarious and heartfelt missions together."
    },
    {
        title: "Attack on Titan: Final Season",
        genre: "Action, Drama, Fantasy",
        rating: 9.2,
        image: "https://cdn.myanimelist.net/images/anime/1000/110531.jpg",
        synopsis: "The final battle between humanity and titans unfolds, revealing shocking truths about the world."
    },
    {
        title: "One Piece",
        genre: "Action, Adventure, Comedy",
        rating: 9.1,
        image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        synopsis: "Monkey D. Luffy and his crew sail the seas in search of the legendary treasure One Piece, facing pirates and marines."
    },
    {
        title: "Naruto Shippuden",
        genre: "Action, Adventure",
        rating: 8.7,
        image: "https://cdn.myanimelist.net/images/anime/5/17407.jpg",
        synopsis: "Naruto Uzumaki returns after training to face Akatsuki and chase his dream of becoming Hokage."
    },
    {
        title: "Steins;Gate",
        genre: "Sci-Fi, Thriller",
        rating: 9.1,
        image: "https://cdn.myanimelist.net/images/anime/5/73199.jpg",
        synopsis: "A self-proclaimed mad scientist and his friends accidentally invent time travel, triggering dangerous consequences."
    },
    {
        title: "Your Name",
        genre: "Romance, Supernatural, Drama",
        rating: 9.0,
        image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg",
        synopsis: "Two teenagers mysteriously swap bodies, leading to a profound connection across time and space."
    },
    {
        title: "Haikyuu!!",
        genre: "Sports, Comedy, Drama",
        rating: 8.9,
        image: "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
        synopsis: "Shoyo Hinata pursues volleyball greatness alongside rivals and teammates, in one of the most inspiring sports anime."
    },
    {
        title: "Re:Zero - Starting Life in Another World",
        genre: "Isekai, Drama, Fantasy",
        rating: 8.5,
        image: "https://cdn.myanimelist.net/images/anime/1238/104023l.jpg",
        synopsis: "Subaru is transported to another world where he discovers he can return from death, but at a painful cost."
    },
    {
        title: "Made in Abyss",
        genre: "Adventure, Fantasy, Drama",
        rating: 8.7,
        image: "https://cdn.myanimelist.net/images/anime/6/86733.jpg",
        synopsis: "Riko and her robot friend Reg descend into the Abyss, a mysterious pit full of wonders and dangers."
    },
    {
        title: "Clannad: After Story",
        genre: "Drama, Romance, Slice of Life",
        rating: 9.0,
        image: "https://cdn.myanimelist.net/images/anime/1299/110774.jpg",
        synopsis: "Tomoya and Nagisa’s story continues into adulthood, exploring family, hardship, and love in a deeply emotional tale."
    }
];

// trending (first five or curated)
const trendingData = [
    { title: "Solo Leveling", info: "Action", trend: "🔥" },
    { title: "Jujutsu Kaisen Season 2", info: "Supernatural", trend: "📈" },
    { title: "Frieren: Beyond Journey’s End", info: "Fantasy", trend: "⭐" },
    { title: "Dandadan", info: "Supernatural", trend: "🚀" },
    { title: "Kaiju No. 8", info: "Action", trend: "⚡" }
];

// ---------- DOM references ----------
const popularContainer = document.getElementById("popularAnime");
const trendingList = document.getElementById("trendingList");
const genreTags = document.getElementById("genreTags");
const searchInput = document.getElementById("searchInput");
const genreFilter = document.getElementById("genreFilter");

// ---------- utilities ----------
function handleImageError(img) {
    console.warn("Image failed to load:", img.src);
    img.onerror = null;
    img.src = fallbackImage;
    img.style.objectFit = "cover";
}

// ---------- rendering ----------
function renderAnime(list) {
    popularContainer.innerHTML = "";
    if (!list.length) {
        popularContainer.innerHTML = `<div style="padding:2rem;color:rgba(255,255,255,0.85)">No results found.</div>`;
        return;
    }

    list.forEach(anime => {
        const card = document.createElement("div");
        card.className = "anime-card";

        // image block
        const imgWrap = document.createElement("div");
        imgWrap.className = "anime-image";
        const img = document.createElement("img");
        img.src = anime.image || fallbackImage;
        img.alt = `${anime.title} poster`;
        img.onerror = function () { handleImageError(this); };
        imgWrap.appendChild(img);

        // info block
        const info = document.createElement("div");
        info.className = "anime-info";
        const title = document.createElement("div");
        title.className = "anime-title";
        title.textContent = anime.title;
        const genre = document.createElement("div");
        genre.className = "anime-genre";
        genre.textContent = anime.genre;
        const rating = document.createElement("div");
        rating.className = "anime-rating";
        rating.textContent = `⭐ ${anime.rating}`;

        info.appendChild(title);
        info.appendChild(genre);
        info.appendChild(rating);

        card.appendChild(imgWrap);
        card.appendChild(info);

        card.addEventListener("click", () => openModal(anime));
        popularContainer.appendChild(card);
    });
}

function renderTrending(list) {
    trendingList.innerHTML = "";
    (list.slice(0, 5)).forEach(item => {
        const li = document.createElement("li");
        li.className = "trending-item";
        li.innerHTML = `<div class="trending-title">${item.trend} ${item.title}</div><div class="trending-info">${item.info}</div>`;
        li.addEventListener("click", () => {
            const anime = animeData.find(a => a.title === item.title);
            if (anime) openModal(anime);
        });
        trendingList.appendChild(li);
    });
}

function renderGenres() {
    // collect unique genres
    const set = new Set();
    animeData.forEach(a => a.genre.split(",").forEach(g => set.add(g.trim())));
    const genreList = Array.from(set).sort();

    // populate genre tags
    genreTags.innerHTML = "";
    genreList.forEach(g => {
        const span = document.createElement("span");
        span.className = "genre-tag";
        span.textContent = g;
        span.addEventListener("click", () => {
            genreFilter.value = g;
            applyFilters();
        });
        genreTags.appendChild(span);
    });

    // populate filter dropdown
    genreFilter.innerHTML = `<option value="">All genres</option>`;
    genreList.forEach(g => {
        const opt = document.createElement("option");
        opt.value = g;
        opt.textContent = g;
        genreFilter.appendChild(opt);
    });
}

// ---------- filter/search ----------
function applyFilters() {
    const q = searchInput.value.trim().toLowerCase();
    const genre = genreFilter.value;

    const filtered = animeData.filter(a => {
        const matchesQ = !q || a.title.toLowerCase().includes(q) || a.genre.toLowerCase().includes(q);
        const matchesGenre = !genre || a.genre.split(",").map(x => x.trim().toLowerCase()).includes(genre.toLowerCase());
        return matchesQ && matchesGenre;
    });

    renderAnime(filtered);
    renderTrending(filtered.length ? filtered : trendingData);
}

// ---------- modal ----------
function openModal(anime) {
    // remove old modal if any
    const existing = document.querySelector(".modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.className = "modal";

    const content = document.createElement("div");
    content.className = "modal-content";

    // left poster
    const left = document.createElement("div");
    left.className = "modal-left";
    const poster = document.createElement("img");
    poster.src = anime.image || fallbackImage;
    poster.alt = anime.title + " poster";
    poster.onerror = function () { handleImageError(this); };
    left.appendChild(poster);

    // body
    const body = document.createElement("div");
    body.className = "modal-body";

    const titleEl = document.createElement("div");
    titleEl.className = "modal-title";
    titleEl.textContent = anime.title;

    const metaEl = document.createElement("div");
    metaEl.className = "modal-meta";
    metaEl.textContent = `${anime.genre} • Rating: ⭐ ${anime.rating}`;

    const synopsis = document.createElement("div");
    synopsis.className = "modal-synopsis";
    // allow long descriptions; keep paragraphs
    const paragraphs = (anime.synopsis || "").split("\n\n");
    paragraphs.forEach(p => {
        const pEl = document.createElement("p");
        pEl.style.marginBottom = "0.75rem";
        pEl.textContent = p;
        synopsis.appendChild(pEl);
    });

    // close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "modal-close";
    closeBtn.setAttribute("aria-label", "Close dialog");
    closeBtn.innerHTML = '<i class="ri-close-line"></i>';
    closeBtn.addEventListener("click", () => {
        overlay.remove();
        document.removeEventListener("keydown", escHandler);
    });

    // assemble
    body.appendChild(titleEl);
    body.appendChild(metaEl);
    body.appendChild(synopsis);
    content.appendChild(left);
    content.appendChild(body);
    content.appendChild(closeBtn);
    overlay.appendChild(content);

    // close when clicking backdrop
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.remove();
            document.removeEventListener("keydown", escHandler);
        }
    });

    // ESC handler
    function escHandler(e) {
        if (e.key === "Escape") {
            overlay.remove();
            document.removeEventListener("keydown", escHandler);
        }
    }
    document.addEventListener("keydown", escHandler);

    document.body.appendChild(overlay);
}

// ---------- init ----------
document.addEventListener("DOMContentLoaded", () => {
    renderAnime(animeData);
    renderTrending(trendingData);
    renderGenres();

    searchInput.addEventListener("input", applyFilters);
    genreFilter.addEventListener("change", applyFilters);
});
