/* ============================================
   Animatch - Main Application Logic
   ============================================ */

(function () {
  "use strict";

  // ---- State ----
  const state = {
    myList: JSON.parse(localStorage.getItem("animatch_mylist") || "[]"),
    achievements: JSON.parse(localStorage.getItem("animatch_achievements") || "[]"),
    darkMode: localStorage.getItem("animatch_theme") !== "light",
    genresExplored: new Set(),
    recsUsed: 0,
  };

  // ---- DOM Cache ----
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ---- Theme ----
  function applyTheme() {
    document.body.classList.toggle("light-mode", !state.darkMode);
    localStorage.setItem("animatch_theme", state.darkMode ? "dark" : "light");
  }

  // ---- Navbar ----
  function initNavbar() {
    const navbar = $("#navbar");
    const hamburger = $("#hamburger");
    const navLinks = $("#navLinks");
    const themeToggle = $("#themeToggle");

    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
      updateActiveNav();
    });

    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    $$(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    themeToggle.addEventListener("click", () => {
      state.darkMode = !state.darkMode;
      applyTheme();
    });
  }

  function updateActiveNav() {
    const sections = $$("section[id]");
    const scrollY = window.scrollY + 100;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");
      const link = $(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle("active", scrollY >= top && scrollY < top + height);
      }
    });
  }

  // ---- Hero Canvas Animation ----
  function initHeroCanvas() {
    const canvas = $("#heroCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticles() {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          hue: Math.random() * 60 + 260, // purple-pink range
        });
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.opacity})`;
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `hsla(280, 80%, 70%, ${0.1 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(drawParticles);
    }

    resize();
    createParticles();
    drawParticles();
    window.addEventListener("resize", () => {
      resize();
      createParticles();
    });
  }

  // ---- Animated Counters ----
  function initCounters() {
    const counters = $$(".stat-number[data-count]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count);
            animateCounter(el, target);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => observer.observe(c));
  }

  function animateCounter(el, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 16);
  }

  // ---- Scroll Animations ----
  function initScrollAnimations() {
    const elements = $$(".section-header, .step-card, .category-card, .trending-card, .community-card, .profile-card, .about-feature, .recs-card, .mylist-card-wrapper");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    elements.forEach((el) => observer.observe(el));
  }

  // ---- Smooth Scrolling ----
  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      });
    });
  }

  // ---- Category Grid ----
  function renderCategories() {
    const grid = $("#categoryGrid");
    if (!grid) return;
    grid.innerHTML = GENRE_CATEGORIES.map(
      (cat) => `
      <div class="category-card" data-genre="${cat.name}" style="--cat-color: ${cat.color}">
        <div class="category-icon">${GENRE_ICONS[cat.icon]}</div>
        <h3>${cat.name}</h3>
        <p>${cat.description}</p>
        <span class="category-count">${ANIME_DATABASE.filter((a) => a.genres.includes(cat.name)).length} titles</span>
      </div>
    `
    ).join("");

    $$(".category-card").forEach((card) => {
      card.addEventListener("click", () => {
        const genre = card.dataset.genre;
        scrollToSection("recommendations");
        setTimeout(() => {
          const filterChip = $(`.filter-chip[data-filter="${genre.toLowerCase().replace(/ /g, "-")}"]`);
          if (filterChip) filterChip.click();
        }, 500);
      });
    });
  }

  // ---- Anime Search ----
  function initSearch() {
    const input = $("#animeSearch");
    const results = $("#searchResults");
    if (!input || !results) return;

    let debounceTimer;
    input.addEventListener("input", () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const query = input.value.trim().toLowerCase();
        if (query.length < 2) {
          results.innerHTML = "";
          results.classList.remove("active");
          return;
        }
        const matches = ANIME_DATABASE.filter(
          (a) =>
            a.title.toLowerCase().includes(query) ||
            a.genres.some((g) => g.toLowerCase().includes(query))
        ).slice(0, 8);

        if (matches.length === 0) {
          results.innerHTML = '<div class="search-no-results">No anime found. Try a different search term.</div>';
          results.classList.add("active");
          return;
        }

        results.innerHTML = matches
          .map(
            (a) => `
          <div class="search-result-item" data-id="${a.id}">
            <div class="search-result-info">
              <span class="search-result-title">${a.title}</span>
              <span class="search-result-genres">${a.genres.join(" / ")}</span>
            </div>
            <button class="btn-add-anime ${state.myList.find((m) => m.id === a.id) ? "added" : ""}" data-id="${a.id}">
              ${state.myList.find((m) => m.id === a.id) ? "Added" : "+ Add"}
            </button>
          </div>
        `
          )
          .join("");
        results.classList.add("active");

        $$(".btn-add-anime").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToMyList(id);
            btn.textContent = "Added";
            btn.classList.add("added");
          });
        });
      }, 200);
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".mylist-search-bar")) {
        results.innerHTML = "";
        results.classList.remove("active");
      }
    });
  }

  // ---- My List ----
  function addToMyList(animeId) {
    if (state.myList.find((m) => m.id === animeId)) return;
    const anime = ANIME_DATABASE.find((a) => a.id === animeId);
    if (!anime) return;

    const entry = { id: anime.id, title: anime.title, genres: anime.genres, rating: 0, favorite: false, addedAt: Date.now() };
    state.myList.push(entry);
    saveState();
    renderMyList();
    updateProfileStats();
    checkGamification();

    anime.genres.forEach((g) => {
      if (!state.genresExplored.has(g)) {
        state.genresExplored.add(g);
        if (state.genresExplored.size > 1) {
          showToast("new_genre");
        }
      }
    });
  }

  function removeFromMyList(animeId) {
    state.myList = state.myList.filter((m) => m.id !== animeId);
    saveState();
    renderMyList();
    generateRecommendations();
    updateProfileStats();
  }

  function rateAnime(animeId, rating) {
    const entry = state.myList.find((m) => m.id === animeId);
    if (entry) {
      entry.rating = rating;
      if (rating === 5 && !state.achievements.includes("first_five_star")) {
        showToast("first_five_star");
        state.achievements.push("first_five_star");
      }
      saveState();
      renderMyList();
      generateRecommendations();
      updateProfileStats();
    }
  }

  function toggleFavorite(animeId) {
    const entry = state.myList.find((m) => m.id === animeId);
    if (entry) {
      entry.favorite = !entry.favorite;
      saveState();
      renderMyList();
      updateProfileStats();
    }
  }

  function renderMyList() {
    const grid = $("#mylistGrid");
    const empty = $("#mylistEmpty");
    const statsEl = $("#mylistStats");
    if (!grid) return;

    if (state.myList.length === 0) {
      grid.innerHTML = "";
      if (empty) {
        grid.appendChild(empty);
        empty.style.display = "flex";
      }
      if (statsEl) statsEl.style.display = "none";
      return;
    }

    if (empty) empty.style.display = "none";
    if (statsEl) statsEl.style.display = "flex";

    const totalWatched = state.myList.length;
    const totalFavorites = state.myList.filter((m) => m.favorite).length;
    const rated = state.myList.filter((m) => m.rating > 0);
    const avgRating = rated.length > 0 ? (rated.reduce((s, m) => s + m.rating, 0) / rated.length).toFixed(1) : "0.0";

    const tw = $("#totalWatched");
    const tf = $("#totalFavorites");
    const ar = $("#avgRating");
    if (tw) tw.textContent = totalWatched;
    if (tf) tf.textContent = totalFavorites;
    if (ar) ar.textContent = avgRating;

    grid.innerHTML = state.myList
      .map((entry) => {
        const anime = ANIME_DATABASE.find((a) => a.id === entry.id);
        const stars = [1, 2, 3, 4, 5]
          .map(
            (s) => `<button class="star-btn ${s <= entry.rating ? "filled" : ""}" data-id="${entry.id}" data-rating="${s}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${s <= entry.rating ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </button>`
          )
          .join("");

        return `
        <div class="mylist-card-wrapper">
          <div class="mylist-card" data-id="${entry.id}">
            <div class="mylist-card-gradient" style="background: linear-gradient(135deg, ${getGenreColor(entry.genres[0])}22, ${getGenreColor(entry.genres[1] || entry.genres[0])}22)"></div>
            <div class="mylist-card-header">
              <h4>${entry.title}</h4>
              <div class="mylist-card-actions">
                <button class="btn-fav ${entry.favorite ? "active" : ""}" data-id="${entry.id}" aria-label="Toggle favorite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="${entry.favorite ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </button>
                <button class="btn-remove" data-id="${entry.id}" aria-label="Remove from list">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="mylist-card-genres">
              ${entry.genres.map((g) => `<span class="genre-tag" style="--tag-color: ${getGenreColor(g)}">${g}</span>`).join("")}
              ${entry.favorite ? '<span class="genre-tag favorite-tag">Favorite</span>' : ""}
            </div>
            <div class="mylist-card-rating">
              <span class="rating-label">Your rating:</span>
              <div class="star-rating">${stars}</div>
            </div>
            ${anime ? `<p class="mylist-card-desc">${anime.description}</p>` : ""}
          </div>
        </div>
      `;
      })
      .join("");

    // Bind events
    $$(".star-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        rateAnime(parseInt(btn.dataset.id), parseInt(btn.dataset.rating));
      });
    });
    $$(".btn-fav").forEach((btn) => {
      btn.addEventListener("click", () => toggleFavorite(parseInt(btn.dataset.id)));
    });
    $$(".btn-remove").forEach((btn) => {
      btn.addEventListener("click", () => removeFromMyList(parseInt(btn.dataset.id)));
    });

    // Re-observe for scroll animations
    setTimeout(initScrollAnimations, 100);
  }

  // ---- Recommendations Engine ----
  function generateRecommendations() {
    const grid = $("#recsGrid");
    const empty = $("#recsEmpty");
    if (!grid) return;

    const ratedAnime = state.myList.filter((m) => m.rating > 0);
    if (ratedAnime.length === 0) {
      grid.innerHTML = "";
      if (empty) {
        grid.appendChild(empty);
        empty.style.display = "flex";
      }
      return;
    }

    if (empty) empty.style.display = "none";

    // Build genre preference scores
    const genreScores = {};
    ratedAnime.forEach((entry) => {
      entry.genres.forEach((g) => {
        if (!genreScores[g]) genreScores[g] = { total: 0, count: 0 };
        genreScores[g].total += entry.rating;
        genreScores[g].count++;
      });
    });

    // Score each unwatched anime
    const watchedIds = new Set(state.myList.map((m) => m.id));
    const scored = ANIME_DATABASE.filter((a) => !watchedIds.has(a.id))
      .map((anime) => {
        let score = 0;
        const matchedGenres = [];
        anime.genres.forEach((g) => {
          if (genreScores[g]) {
            score += (genreScores[g].total / genreScores[g].count) * 2;
            matchedGenres.push(g);
          }
        });
        score += anime.rating * 0.5;

        // Build reason
        let reason = "A great pick based on your overall taste profile";
        if (matchedGenres.length > 0) {
          const topGenre = matchedGenres[0];
          const reasons = RECOMMENDATION_REASONS[topGenre];
          if (reasons) {
            reason = reasons[Math.floor(Math.random() * reasons.length)];
          }
        }

        return { ...anime, score, reason, matchedGenres };
      })
      .sort((a, b) => b.score - a.score);

    state.allRecommendations = scored;
    renderRecommendationCards(scored);

    if (!state.achievements.includes("recommendations_unlocked")) {
      showToast("recommendations_unlocked");
      state.achievements.push("recommendations_unlocked");
      saveState();
    }
  }

  function renderRecommendationCards(recommendations) {
    const grid = $("#recsGrid");
    if (!grid) return;

    const activeFilter = $(".filter-chip.active");
    const filterGenre = activeFilter ? activeFilter.dataset.filter : "all";
    const sortBy = $("#recsSort") ? $("#recsSort").value : "relevance";

    let filtered = filterGenre === "all"
      ? recommendations
      : recommendations.filter((a) =>
          a.genres.some((g) => g.toLowerCase().replace(/ /g, "-") === filterGenre)
        );

    if (sortBy === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "title") {
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    grid.innerHTML = filtered.slice(0, 12)
      .map(
        (anime) => `
      <div class="recs-card" data-genres='${JSON.stringify(anime.genres.map((g) => g.toLowerCase().replace(/ /g, "-")))}'>
        <div class="recs-card-gradient" style="background: linear-gradient(135deg, ${getGenreColor(anime.genres[0])}33, ${getGenreColor(anime.genres[1] || anime.genres[0])}33)"></div>
        <div class="recs-card-header">
          <h4>${anime.title}</h4>
          <div class="recs-card-rating">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${anime.rating}</span>
          </div>
        </div>
        <p class="recs-card-desc">${anime.description}</p>
        <div class="recs-card-genres">
          ${anime.genres.map((g) => `<span class="genre-tag" style="--tag-color: ${getGenreColor(g)}">${g}</span>`).join("")}
        </div>
        <div class="recs-card-reason">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span>${anime.reason}</span>
        </div>
        <button class="btn btn-sm btn-add-from-rec" data-id="${anime.id}">+ Add to My List</button>
      </div>
    `
      )
      .join("");

    $$(".btn-add-from-rec").forEach((btn) => {
      btn.addEventListener("click", () => {
        addToMyList(parseInt(btn.dataset.id));
        btn.textContent = "Added!";
        btn.disabled = true;
        btn.classList.add("added");
        state.recsUsed++;
        updateProfileStats();
      });
    });

    setTimeout(initScrollAnimations, 100);
  }

  function initFilters() {
    $$(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        $$(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        if (state.allRecommendations) {
          renderRecommendationCards(state.allRecommendations);
        }
      });
    });

    const sortSelect = $("#recsSort");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        if (state.allRecommendations) {
          renderRecommendationCards(state.allRecommendations);
        }
      });
    }
  }

  // ---- Trending ----
  function renderTrending() {
    const grid = $("#trendingGrid");
    if (!grid) return;

    grid.innerHTML = TRENDING_ANIME.map(
      (anime) => `
      <div class="trending-card">
        <div class="trending-card-gradient" style="background: linear-gradient(135deg, ${getGenreColor(anime.genres[0])}33, ${getGenreColor(anime.genres[1] || anime.genres[0])}33)"></div>
        <div class="trending-badge trending-${anime.trend.toLowerCase()}">${anime.trend}</div>
        <div class="trending-score-bar">
          <div class="trending-score-fill" style="width: ${anime.trendScore}%"></div>
        </div>
        <h4>${anime.title}</h4>
        <p>${anime.description}</p>
        <div class="trending-card-genres">
          ${anime.genres.map((g) => `<span class="genre-tag" style="--tag-color: ${getGenreColor(g)}">${g}</span>`).join("")}
        </div>
        <button class="btn btn-sm btn-add-trending" data-id="${anime.id}">+ Add to My List</button>
      </div>
    `
    ).join("");

    $$(".btn-add-trending").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = parseInt(btn.dataset.id);
        if (state.myList.find((m) => m.id === id)) {
          btn.textContent = "Already Added";
          return;
        }
        addToMyList(id);
        btn.textContent = "Added!";
        btn.disabled = true;
        btn.classList.add("added");
      });
    });
  }

  // ---- Community Picks ----
  function renderCommunity() {
    const grid = $("#communityGrid");
    if (!grid) return;

    grid.innerHTML = COMMUNITY_PICKS.map(
      (pick) => `
      <div class="community-card">
        <div class="community-header">
          <div class="community-avatar" style="background: ${pick.avatar}">
            ${pick.username.charAt(0).toUpperCase()}
          </div>
          <div class="community-user-info">
            <span class="community-username">${pick.username}</span>
            <span class="community-anime">${pick.anime}</span>
          </div>
          <div class="community-rating">
            ${renderStars(pick.rating)}
          </div>
        </div>
        <p class="community-comment">"${pick.comment}"</p>
      </div>
    `
    ).join("");
  }

  function renderStars(count) {
    return Array.from({ length: 5 }, (_, i) =>
      `<svg width="14" height="14" viewBox="0 0 24 24" fill="${i < count ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    ).join("");
  }

  // ---- Profile ----
  function updateProfileStats() {
    const watched = state.myList.length;
    const genres = new Set();
    state.myList.forEach((m) => m.genres.forEach((g) => genres.add(g)));
    const rated = state.myList.filter((m) => m.rating > 0);
    const avgRating = rated.length > 0 ? (rated.reduce((s, m) => s + m.rating, 0) / rated.length).toFixed(1) : "0.0";

    const pw = $("#profileWatched");
    const pg = $("#profileGenres");
    const pa = $("#profileAvgRating");
    const pr = $("#profileRecsUsed");
    if (pw) pw.textContent = watched;
    if (pg) pg.textContent = genres.size;
    if (pa) pa.textContent = avgRating;
    if (pr) pr.textContent = state.recsUsed;

    // Level system
    const xp = watched * 20 + rated.length * 15 + state.recsUsed * 10;
    const level = Math.floor(xp / 100) + 1;
    const xpInLevel = xp % 100;

    const ul = $("#userLevel");
    const xf = $("#xpFill");
    const xc = $("#xpCurrent");
    if (ul) ul.textContent = level;
    if (xf) xf.style.width = xpInLevel + "%";
    if (xc) xc.textContent = xpInLevel;

    // Genre bars
    const genreBars = $("#genreBars");
    if (genreBars) {
      const genreCounts = {};
      state.myList.forEach((m) => m.genres.forEach((g) => {
        genreCounts[g] = (genreCounts[g] || 0) + 1;
      }));

      if (Object.keys(genreCounts).length === 0) {
        genreBars.innerHTML = '<p class="genre-bars-empty">Watch some anime to see your genre breakdown!</p>';
      } else {
        const maxCount = Math.max(...Object.values(genreCounts));
        genreBars.innerHTML = Object.entries(genreCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(
            ([genre, count]) => `
          <div class="genre-bar-row">
            <span class="genre-bar-label">${genre}</span>
            <div class="genre-bar-track">
              <div class="genre-bar-fill" style="width: ${(count / maxCount) * 100}%; background: ${getGenreColor(genre)}"></div>
            </div>
            <span class="genre-bar-count">${count}</span>
          </div>
        `
          )
          .join("");
      }
    }

    // Accuracy ring
    const accuracy = Math.min(95, watched * 5 + rated.length * 8);
    const circle = $("#accuracyCircle");
    const accText = $("#accuracyText");
    if (circle) {
      const circumference = 2 * Math.PI * 60;
      const offset = circumference - (accuracy / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    }
    if (accText) accText.textContent = accuracy + "%";
  }

  // ---- Gamification ----
  function checkGamification() {
    const count = state.myList.length;
    if (count === 1 && !state.achievements.includes("first_add")) {
      showToast("first_add");
      state.achievements.push("first_add");
    }
    if (count === 3 && !state.achievements.includes("three_added")) {
      showToast("three_added");
      state.achievements.push("three_added");
    }
    if (count === 5 && !state.achievements.includes("five_added")) {
      showToast("five_added");
      state.achievements.push("five_added");
    }
    if (count === 10 && !state.achievements.includes("ten_added")) {
      showToast("ten_added");
      state.achievements.push("ten_added");
    }
    saveState();
  }

  function showToast(trigger) {
    const msg = GAMIFICATION_MESSAGES.find((m) => m.trigger === trigger);
    if (!msg) return;

    const container = $("#toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast-icon">${ACHIEVEMENT_ICONS[msg.icon] || ""}</div>
      <div class="toast-content">
        <strong>${msg.title}</strong>
        <p>${msg.message}</p>
      </div>
      <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("show"));

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  // ---- Utility ----
  function getGenreColor(genre) {
    const cat = GENRE_CATEGORIES.find((c) => c.name === genre);
    return cat ? cat.color : "#a855f7";
  }

  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      const offset = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function saveState() {
    localStorage.setItem("animatch_mylist", JSON.stringify(state.myList));
    localStorage.setItem("animatch_achievements", JSON.stringify(state.achievements));
  }

  // ---- Initialize ----
  function init() {
    applyTheme();
    initNavbar();
    initHeroCanvas();
    initCounters();
    initSmoothScroll();
    renderCategories();
    initSearch();
    renderMyList();
    initFilters();
    renderTrending();
    renderCommunity();
    updateProfileStats();

    if (state.myList.some((m) => m.rating > 0)) {
      generateRecommendations();
    }

    // Rebuild genres explored set
    state.myList.forEach((m) => m.genres.forEach((g) => state.genresExplored.add(g)));

    // Initial scroll animation setup
    setTimeout(initScrollAnimations, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
