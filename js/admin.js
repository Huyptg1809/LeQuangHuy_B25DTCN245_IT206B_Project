function showToast(message, type = 'success', customTitle = null) {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    if (!document.getElementById('admin-toast-style')) {
        const style = document.createElement('style');
        style.id = 'admin-toast-style';
        style.innerHTML = `
            #toastContainer { position: fixed; top: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 15px; }
            .v-toast { width: 380px; min-height: 70px; background: #262B33; border-radius: 8px; display: flex; align-items: flex-start; padding: 16px; position: relative; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); color: #fff; font-family: sans-serif; animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .v-toast.hide { animation: fadeOutRight 0.3s ease forwards; }
            .v-toast::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 6px; }
            .v-toast.success::before, .v-toast.update::before { background: #00d26a; }
            .v-toast.cancel::before, .v-toast.delete::before, .v-toast.error::before { background: #f8312f; }
            .v-toast-icon { width: 24px; height: 24px; flex-shrink: 0; margin-right: 14px; margin-top: 2px; }
            .v-toast-content { flex: 1; display: flex; flex-direction: column; gap: 6px; padding-right: 10px; padding-top: 1px; }
            .v-toast-title { font-weight: 600; font-size: 16px; color: #fff; }
            .v-toast-message { font-size: 14px; color: #cbd5e1; line-height: 1.5; }
            .v-toast-close { background: none; border: none; padding: 0; cursor: pointer; color: #64748b; font-size: 20px; line-height: 1; display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; transition: color 0.2s; }
            .v-toast-close:hover { color: #fff; }
            @keyframes slideInRight { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes fadeOutRight { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }

    const toast = document.createElement('div');
    toast.className = `v-toast ${type}`;

    let title = customTitle;
    let iconImg = '';
    
    if (type === 'success') {
        title = title || 'Thành công';
        iconImg = `<img class="v-toast-icon" src="../assets/icons/success.png" alt="success-icon" />`;
    } else if (type === 'update') {
        title = title || 'Đã cập nhật';
        iconImg = `<img class="v-toast-icon" src="../assets/icons/update.png" alt="update-icon" />`;
    } else if (type === 'cancel') {
        title = title || 'Đã hủy';
        iconImg = `<img class="v-toast-icon" src="../assets/icons/cancel.png" alt="cancel-icon" />`;
    } else if (type === 'delete') {
        title = title || 'Đã xóa';
        iconImg = `<img class="v-toast-icon" src="../assets/icons/delete.png" alt="delete-icon" />`;
    } else {
        title = title || 'Thông báo';
        iconImg = `<img class="v-toast-icon" src="../assets/icons/cancel.png" alt="error-icon" />`;
    }

    toast.innerHTML = `
        ${iconImg}
        <div class="v-toast-content">
            <div class="v-toast-title">${title}</div>
            <div class="v-toast-message">${message}</div>
        </div>
        <button class="v-toast-close">&times;</button>
    `;

    container.appendChild(toast);

    const closeToast = () => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    };

    toast.querySelector('.v-toast-close').addEventListener('click', closeToast);
    setTimeout(closeToast, 4000);
}

window.moviesState = [];
window.currentPage = 1;
window.itemsPerPage = 5;
window.currentSearchQuery = '';
window.currentStatusFilter = -1;

document.addEventListener('DOMContentLoaded', () => {
    checkAdminAccess();
    loadMoviesData();
    setupEvents();
    updateTableView();
});

function checkAdminAccess() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!user || (user.role !== 'admin' && user.role !== 'ADMIN')) {
        showToast('Bạn không có quyền truy cập!', 'error');
        window.location.href = 'index.html';
    } else {
        const nameEl = document.querySelector('.admin-name');
        const emailEl = document.querySelector('.admin-email');
        if (nameEl) nameEl.textContent = user.fullName || 'Admin';
        if (emailEl) emailEl.textContent = user.email || '';
    }
}

function loadMoviesData() {
    let movies = JSON.parse(localStorage.getItem('movies'));
    if (!movies || movies.length === 0) {
        movies = typeof DEFAULT_MOVIES !== 'undefined' ? DEFAULT_MOVIES : [];
    }
    window.moviesState = movies;
    localStorage.setItem('movies', JSON.stringify(movies));
}

function setupEvents() {
    const searchInput = document.getElementById('searchMovieInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            window.currentSearchQuery = e.target.value.trim();
            window.currentPage = 1; 
            updateTableView();
        });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const active = document.querySelector('.filter-btn.active');
            if (active) active.classList.remove('active');
            e.target.classList.add('active');

            const text = e.target.textContent || '';
            window.currentStatusFilter = text.includes('Đang chiếu') ? 1 
                                       : text.includes('Sắp chiếu') ? 2 
                                       : text.includes('Đã chiếu') ? 0 : -1;
            window.currentPage = 1;
            updateTableView();
        });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', () => document.getElementById('logoutModal')?.classList.remove('hidden'));
    
    const cancelLogout = document.getElementById('cancelLogoutBtn');
    if (cancelLogout) cancelLogout.addEventListener('click', () => document.getElementById('logoutModal')?.classList.add('hidden'));
    
    const confirmLogout = document.getElementById('confirmLogoutBtn');
    if (confirmLogout) confirmLogout.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    });

    const openAddBtn = document.getElementById('openAddModalBtn');
    if (openAddBtn) openAddBtn.addEventListener('click', () => window.openMovieModal());
    
    const closeAddBtn = document.getElementById('closeAddMovieModalBtn');
    if (closeAddBtn) closeAddBtn.addEventListener('click', closeAddModal);
    
    const cancelAddBtn = document.getElementById('cancelAddMovieBtn');
    if (cancelAddBtn) cancelAddBtn.addEventListener('click', () => { closeAddModal(); showToast('Đã hủy thao tác.', 'cancel'); });
    
    const formAdd = document.getElementById('addMovieForm');
    if (formAdd) formAdd.addEventListener('submit', saveMovie);

    const cancelDelBtn = document.getElementById('cancelDeleteMovieBtn');
    if (cancelDelBtn) cancelDelBtn.addEventListener('click', () => { closeDeleteModal(); showToast('Đã hủy thao tác.', 'cancel'); });
    
    const confirmDelBtn = document.getElementById('confirmDeleteMovieBtn');
    if (confirmDelBtn) confirmDelBtn.addEventListener('click', confirmDeleteMovie);
}

function closeAddModal() {
    const modal = document.getElementById('addMovieModal');
    if(modal) modal.classList.add('hidden');
    const form = document.getElementById('addMovieForm');
    if(form) form.reset();
    const idInput = document.getElementById('movieId');
    if(idInput) idInput.value = '';
}

window.openMovieModal = function(movieId = null) {
    const isEdit = movieId !== null;
    const titleEl = document.getElementById('addMovieTitle');
    if (titleEl) titleEl.textContent = isEdit ? 'Cập Nhật Thông Tin Phim' : 'Thêm Phim Mới';
    
    const textEl = document.getElementById('submitMovieText');
    if (textEl) textEl.textContent = isEdit ? 'Cập nhật' : 'Thêm mới';
    
    const submitIcon = document.getElementById('submitMovieIcon');
    if (submitIcon) {
        submitIcon.innerHTML = isEdit 
            ? `<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>`
            : `<path d="M5 12h14"/><path d="M12 5v14"/>`;
    }

    const idInput = document.getElementById('movieId');
    if (idInput) idInput.value = isEdit ? movieId : '';
    
    const dateInput = document.getElementById('movieReleaseDate');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() + 1);
        const maxYyyy = maxDate.getFullYear();
        const maxMm = String(maxDate.getMonth() + 1).padStart(2, '0');
        const maxDd = String(maxDate.getDate()).padStart(2, '0');
        const maxDateStr = `${maxYyyy}-${maxMm}-${maxDd}`;

        dateInput.max = maxDateStr;
        if (isEdit) {
            dateInput.removeAttribute('min');
        } else {
            dateInput.min = todayStr;
        }
    }

    if (isEdit) {
        const movie = window.moviesState.find(m => parseInt(m.id) === parseInt(movieId));
        if (movie) {
            const nameIn = document.getElementById('movieName');
            if(nameIn) nameIn.value = movie.title;
            
            const genreIn = document.getElementById('movieGenre');
            if(genreIn) genreIn.value = movie.genres || "";
            
            const duraIn = document.getElementById('movieDuration');
            if(duraIn) duraIn.value = movie.duration;
            
            const statIn = document.getElementById('movieStatus');
            if(statIn) statIn.value = movie.status;
            
            const priceIn = document.getElementById('moviePrice');
            if(priceIn) priceIn.value = movie.ticketPrice || 80000;
            
            const posterIn = document.getElementById('moviePoster');
            if(posterIn) posterIn.value = movie.posterUrl;
            
            const descIn = document.getElementById('movieDescription');
            if(descIn) descIn.value = movie.description || '';
            
            if (movie.releaseDate && dateInput) {
                const parts = movie.releaseDate.split('/');
                if (parts.length === 3) dateInput.value = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
        }
    } else {
        const form = document.getElementById('addMovieForm');
        if(form) form.reset();
    }
    
    document.getElementById('addMovieModal')?.classList.remove('hidden');
};

function saveMovie(e) {
    e.preventDefault();
    
    const editIdEl = document.getElementById('movieId');
    const editId = editIdEl ? editIdEl.value : '';
    const isEdit = editId !== '';
    
    const movieData = {
        title: document.getElementById('movieName')?.value.trim() || '',
        genres: document.getElementById('movieGenre')?.value || '',
        duration: document.getElementById('movieDuration')?.value || '',
        rawDate: document.getElementById('movieReleaseDate')?.value || '',
        status: document.getElementById('movieStatus')?.value || '',
        posterUrl: document.getElementById('moviePoster')?.value.trim() || '',
        description: document.getElementById('movieDescription')?.value.trim() || '',
        ticketPrice: document.getElementById('moviePrice')?.value || '80000'
    };

    if (!movieData.title) return showToast('Tên phim không được trống', 'error');
    if (!movieData.genres) return showToast('Vui lòng chọn Thể loại', 'error');
    if (!movieData.duration || parseInt(movieData.duration, 10) <= 0) return showToast('Thời lượng không hợp lệ', 'error');
    if (!movieData.rawDate) return showToast('Vui lòng chọn ngày khởi chiếu', 'error');
    
    const selectedDate = new Date(movieData.rawDate).getTime();
    const todayObj = new Date();
    todayObj.setHours(0,0,0,0);
    const today = todayObj.getTime();
    const maxDateObj = new Date(); 
    maxDateObj.setFullYear(maxDateObj.getFullYear() + 1);
    const maxDate = maxDateObj.getTime();
    
    if (!isEdit && selectedDate < today) {
        return showToast('Ngày khởi chiếu không được đặt trong quá khứ!', 'error');
    }
    if (selectedDate > maxDate) {
        return showToast('Ngày khởi chiếu không được vượt quá 1 năm tới!', 'error');
    }
    
    if (!movieData.status) return showToast('Vui lòng chọn trạng thái', 'error');
    
    const urlRegex = /^(https?:\/\/[^\s]+)|(^\.?\.?\/[^\s]+)$/i;
    if (!urlRegex.test(movieData.posterUrl)) {
        return showToast('URL ảnh bìa không hợp lệ', 'error');
    }
    
    if (!movieData.description) return showToast('Mô tả phim không được để trống', 'error');

    const parts = movieData.rawDate.split("-");
    const formattedDate = (parts.length === 3) ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';

    const finalMovie = {
        id: isEdit ? parseInt(editId) : Date.now(),
        title: movieData.title,
        titleVi: movieData.title, 
        genres: movieData.genres,
        duration: parseInt(movieData.duration, 10),
        releaseDate: formattedDate,
        status: parseInt(movieData.status, 10),
        posterUrl: movieData.posterUrl,
        description: movieData.description,
        ticketPrice: parseInt(movieData.ticketPrice, 10)
    };

    if (isEdit) {
        const index = window.moviesState.findIndex(m => parseInt(m.id) === parseInt(editId));
        if (index !== -1) window.moviesState[index] = finalMovie;
    } else {
        window.moviesState.push(finalMovie);
    }

    localStorage.setItem('movies', JSON.stringify(window.moviesState));
    closeAddModal();
    resetFilters();
    updateTableView();
    showToast(isEdit ? 'Cập nhật thông tin thành công!' : 'Thêm phim thành công!', isEdit ? 'update' : 'success');
}

let movieToDeleteId = null;
window.openDeleteMovieModal = function(id, title) {
    movieToDeleteId = id;
    const nameEl = document.getElementById('deleteMovieName');
    if(nameEl) nameEl.textContent = title;
    document.getElementById('deleteMovieModal')?.classList.remove('hidden');
};

function closeDeleteModal() {
    document.getElementById('deleteMovieModal')?.classList.add('hidden');
    movieToDeleteId = null;
}

function confirmDeleteMovie() {
    if (movieToDeleteId !== null) {
        window.moviesState = window.moviesState.filter(m => parseInt(m.id) !== parseInt(movieToDeleteId));
        localStorage.setItem('movies', JSON.stringify(window.moviesState));
        
        closeDeleteModal();
        resetFilters();
        updateTableView();
        showToast('Đã xóa phim thành công!', 'delete');
    }
}

function resetFilters() {
    document.querySelector('.filter-btn.active')?.classList.remove('active');
    const firstFilter = document.querySelectorAll('.filter-btn')[0];
    if (firstFilter) firstFilter.classList.add('active');
    window.currentSearchQuery = '';
    window.currentStatusFilter = -1;
    window.currentPage = 1;
    if(document.getElementById('searchMovieInput')) document.getElementById('searchMovieInput').value = '';
}

function updateTableView() {
    let filteredMovies = window.moviesState.filter(m => {
        const titleStr = String(m.title).toLowerCase();
        const searchStr = window.currentSearchQuery.toLowerCase();
        
        const matchSearch = titleStr.includes(searchStr) || (m.titleVi && m.titleVi.toLowerCase().includes(searchStr));
        const matchStatus = window.currentStatusFilter === -1 || parseInt(m.status) === window.currentStatusFilter;
        return matchSearch && matchStatus;
    });

    updateFilterCounts(window.moviesState);

    const totalItems = filteredMovies.length;
    const totalPages = Math.ceil(totalItems / window.itemsPerPage) || 1;
    if (window.currentPage > totalPages) window.currentPage = totalPages;
    if (window.currentPage < 1) window.currentPage = 1;

    const startIndex = (window.currentPage - 1) * window.itemsPerPage;
    const endIndex = Math.min(startIndex + window.itemsPerPage, totalItems);
    
    renderMoviesTable(filteredMovies.slice(startIndex, endIndex), totalItems, startIndex, endIndex, totalPages);
}

function renderMoviesTable(moviesList, totalItems, startIndex, endIndex, totalPages) {
    const tbody = document.getElementById('movieTableBody');
    if (!tbody) return;

    if (moviesList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: #9ca3af;">Không tìm thấy phim phù hợp</td></tr>';
    } else {
        tbody.innerHTML = moviesList.map(m => {
            const genres = (m.genres || '').split(',').map(g => `<span class="genre-tag">${g.trim()}</span>`).join('');
            const statusHtml = parseInt(m.status) === 1 ? '<span class="status-badge status-playing">Đang chiếu</span>' : 
                               parseInt(m.status) === 2 ? '<span class="status-badge status-upcoming">Sắp chiếu</span>' : 
                               '<span class="status-badge status-ended">Đã chiếu</span>';
            return `
                <tr>
                    <td><img src="${m.posterUrl}" onerror="this.src='../assets/images/Film1.png'" class="movie-mini-poster" /></td>
                    <td>
                        <div class="movie-title">${m.title}</div>
                        <div class="movie-title-vi">${m.titleVi || m.title}</div>
                    </td>
                    <td><div class="genre-tags">${genres}</div></td>
                    <td><div style="font-weight: 500">${m.duration}</div><div style="color: #9ca3af; font-size: 12px;">phút</div></td>
                    <td style="font-weight: 500;">${m.releaseDate}</td>
                    <td>${statusHtml}</td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-icon" aria-label="Sửa" onclick="window.openMovieModal(${m.id})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                            </button>
                            <button class="btn-icon" aria-label="Xóa" onclick="window.openDeleteMovieModal(${m.id}, '${String(m.title).replace(/'/g, "\\'")}')">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    const pageTotalEl = document.getElementById('pageTotal');
    const pageCurrentEl = document.getElementById('pageCurrent');
    if (pageTotalEl) pageTotalEl.textContent = totalItems;
    if (pageCurrentEl) pageCurrentEl.textContent = totalItems === 0 ? '0' : `${startIndex + 1}-${endIndex}`;
    
    renderPaginationControls(totalPages);
}

function renderPaginationControls(totalPages) {
    const container = document.getElementById('paginationControls');
    if (!container) return;
    container.innerHTML = '';
    if (totalPages <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.disabled = window.currentPage === 1;
    prevBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';
    prevBtn.onclick = () => { window.currentPage--; updateTableView(); };
    container.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = `page-btn ${i === window.currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.onclick = () => { window.currentPage = i; updateTableView(); };
        container.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.disabled = window.currentPage === totalPages;
    nextBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
    nextBtn.onclick = () => { window.currentPage++; updateTableView(); };
    container.appendChild(nextBtn);
}

function updateFilterCounts(moviesList) {
    const filters = document.querySelectorAll('.filter-btn');
    if(filters.length < 4) return;

    filters[0].textContent = `Tất cả (${moviesList.length})`;
    filters[1].textContent = `Đang chiếu (${moviesList.filter(m => parseInt(m.status) === 1).length})`;
    filters[2].textContent = `Sắp chiếu (${moviesList.filter(m => parseInt(m.status) === 2).length})`;
    filters[3].textContent = `Đã chiếu (${moviesList.filter(m => parseInt(m.status) === 0).length})`;
    
    const pageTotal = document.querySelector('.page-total');
    if(pageTotal) pageTotal.textContent = moviesList.length;
}
