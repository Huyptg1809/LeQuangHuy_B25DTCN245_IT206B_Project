const DEFAULT_MOVIES = [
    {
        id: 1,
        title: "Dune",
        titleVi: "Dune: Hành Tinh Cát",
        genres: "Hành động, Viễn tưởng",
        duration: 155,
        releaseDate: "01/03/2024",
        status: 1,
        posterUrl: "../assets/images/Dune.jpg",
        description: "Câu chuyện về cuộc hành trình của Paul Atreides, một chàng trai trẻ tài năng và rực rỡ, sinh ra với số phận vĩ đại vượt quá sự hiểu biết của mình.",
        trailler: "https://www.youtube.com/embed/n9xhJrPXop4?si=0aDlJQdO99OzKRm2",
        ticketPrice: 95000
    },
    {
        id: 2,
        title: "The Batman",
        titleVi: "Người Dơi",
        genres: "Hành động, Tội phạm",
        duration: 176,
        releaseDate: "08/03/2024",
        status: 1,
        posterUrl: "../assets/images/Film2.png",
        description: "Batman dấn thân vào thế giới ngầm của Gotham khi một kẻ giết người hàng loạt bắt đầu nhắm vào giới tinh hoa.",
        trailler: "https://www.youtube.com/embed/mqqft2x_Aa4?si=1JnalOKmyG-Fpz_L",
        ticketPrice: 80000
    },
    {
        id: 3,
        title: "Spider-Man: No Way Home",
        titleVi: "Người Nhện: Không Còn Nhà",
        genres: "Hành động, Phiêu lưu",
        duration: 148,
        releaseDate: "29/03/2024",
        status: 1,
        posterUrl: "../assets/images/Film3.jpg",
        description: "Với danh tính bị tiết lộ, Peter Parker tìm đến Doctor Strange để nhờ giúp đỡ, nhưng vô tình mở ra cánh cửa đa vũ trụ.",
        trailler: "https://www.youtube.com/embed/JfVOs4VSpmA?si=5reFxSnJGn7mlqFn",
        ticketPrice: 80000
    },
    {
        id: 4,
        title: "The Matrix Resurrections",
        titleVi: "Ma Trận: Hồi Sinh",
        genres: "Hành động, Viễn tưởng",
        duration: 148,
        releaseDate: "10/02/2024",
        status: 1,
        posterUrl: "../assets/images/Film4.png",
        description: "Trở lại một thế giới với hai thực tại: cuộc sống thường ngày và những gì nằm sau nó.",
        trailler: "https://www.youtube.com/embed/9ix7TUGVYIo?si=gOOZ5rxRN8fwSLeT",
        ticketPrice: 80000
    },
    {
        id: 5,
        title: "Dune: Part Two",
        titleVi: "Dune: Hành Tinh Cát - Phần 2",
        genres: "Hành động, Viễn tưởng",
        duration: 166,
        releaseDate: "01/03/2024",
        status: 1,
        posterUrl: "../assets/images/dune2.webp",
        description: "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen và đối mặt với số phận của vũ trụ.",
        trailler: "https://www.youtube.com/embed/Way9Dexny3w?si=0-OpTOyOEKwB7cyN",
        ticketPrice: 95000
    },
    {
        id: 6,
        title: "Kung Fu Panda 4",
        titleVi: "Kung Fu Panda 4",
        genres: "Hoạt hình, Hài",
        duration: 94,
        releaseDate: "08/03/2024",
        status: 1,
        posterUrl: "../assets/images/KFPanda4.jpg",
        description: "Po tiếp tục hành trình trở thành Chiến binh Rồng, đối mặt với kẻ thù mới và tìm người kế nhiệm.",
        trailler: "https://www.youtube.com/embed/_inKs4eeHiI?si=WaZ-OfC6GAHauQp6",
        ticketPrice: 80000
    },
    {
        id: 7,
        title: "Godzilla x Kong: The New Empire",
        titleVi: "Godzilla x Kong: Đế Chế Mới",
        genres: "Hành động, Viễn tưởng",
        duration: 115,
        releaseDate: "29/03/2024",
        status: 2,
        posterUrl: "../assets/images/GxK.jpg",
        description: "Godzilla và Kong hợp sức chống lại mối đe dọa mới từ lòng đất.",
        trailler: "https://www.youtube.com/embed/lV1OOlGwExM?si=X5jNlJu-LA9EMRXi",
        ticketPrice: 80000
    },
    {
        id: 8,
        title: "Mai",
        titleVi: "Mai",
        genres: "Tâm lý, Tình cảm",
        duration: 131,
        releaseDate: "10/02/2024",
        status: 0,
        posterUrl: "../assets/images/Mai.jpg",
        description: "Câu chuyện về một người phụ nữ mạnh mẽ đối mặt với những biến cố trong cuộc sống.",
        trailler: "https://www.youtube.com/embed/EX6clvId19s?si=bZGVD3n504nXGhcs",
        ticketPrice: 80000
    },
    {
        id: 9,
        title: "Exhuma",
        titleVi: "Exhuma: Quật Mộ Trùng Ma",
        genres: "Kinh dị, Bí ẩn",
        duration: 134,
        releaseDate: "15/03/2024",
        status: 1,
        posterUrl: "../assets/images/Exhuma.jpg",
        description: "Một nhóm chuyên gia phong thủy khai quật mộ cổ và đối mặt với lời nguyền đáng sợ.",
        trailler: "https://www.youtube.com/embed/j_6_wLF1pDg?si=WI6T_vnPlK1wP_SV",
        ticketPrice: 80000
    },
];

function loadMovies() {
    let storedMovies = localStorage.getItem('movies');

    if (!storedMovies) {
        localStorage.setItem('movies', JSON.stringify(DEFAULT_MOVIES));
        storedMovies = JSON.stringify(DEFAULT_MOVIES);
    }
    

    return JSON.parse(storedMovies);
}

let currentSlideIndex = 0; 

function renderHeroSlider(movies) {
    if (movies.length === 0) return; 

    const heroSection = document.querySelector('.hero');
    const bgContainer = document.querySelector('.background-container');
    if (!heroSection || !bgContainer) return;

    if (!document.getElementById('heroSlideAnim')) {
        const style = document.createElement('style');
        style.id = 'heroSlideAnim';
        style.innerHTML = `@keyframes fade-in-slide { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }`;
        document.head.appendChild(style);
    }
    function showSlide(index) {
        const movie = movies[index];
        
        bgContainer.style.backgroundImage = `linear-gradient(to right, #000000 0%, rgba(38, 38, 38, 0) 50%), url('${movie.posterUrl}')`;
        bgContainer.style.backgroundSize = 'cover';
        bgContainer.style.backgroundPosition = 'center';

        heroSection.innerHTML = `
            <div style="animation: fade-in-slide 0.8s forwards;">
                <p class="badge" style="color: #ff4757; font-weight: bold; margin-bottom: 10px;">● Đang Thịnh Hành</p>
                <h1>${movie.title}</h1>
                <p class="summary">${movie.description}</p>
                <div class="actions">
                    <button class="btn btn-primary" onclick="window.handleBooking()">Đặt Vé Ngay</button>
                    <!-- Gọi hàm openTrailer bằng window -->
                    <button class="btn btn-dark" onclick="window.openTrailer('${movie.trailler}')">Xem Trailer</button>
                </div>
            </div>
        `;
    }


    function nextSlide() {
        const maxSlides = Math.min(movies.length, 4); 
        currentSlideIndex++; 
        if (currentSlideIndex >= maxSlides) {
            currentSlideIndex = 0; 
        }
        showSlide(currentSlideIndex);
    }

    showSlide(0);

    if (movies.length > 1) {
        setInterval(nextSlide, 5000);
    }
}

window.openTrailer = function(link) {
    if (link && link !== 'undefined') {
        document.getElementById('trailerModal').style.display = 'flex';
        document.getElementById('trailerIframe').src = link;
    } else {
        alert('Trailer không khả dụng!');
    }
};

// Hàm xử lý khi bấm Mua vé / Đặt vé
window.handleBooking = function() {
    // Chuyển thẳng sang trang Login theo yêu cầu
    window.location.href = 'login.html';
};

function renderMovieGrid(movies) {
    const movieGrid = document.querySelector('.movie-grid');
    if (!movieGrid) return;

    movieGrid.innerHTML = ''; 

    const displayMovies = movies.slice(0, 4);

    displayMovies.forEach(movie => {
        movieGrid.innerHTML += `
            <article class="movie-card">
              <!-- Nếu ảnh vỡ thì load ảnh mặc định (onerror) -->
              <img src="${movie.posterUrl}" onerror="this.src='../assets/images/Film1.png'" alt="Poster">
              <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>◷ ${movie.duration} phút ・ ${movie.genres}</p>
                <button onclick="window.handleBooking()">Mua Vé</button>
              </div>
            </article>
        `;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const allMovies = loadMovies();
    const showingMovies = allMovies.filter(phim => phim.status === 1);
    renderHeroSlider(showingMovies);
    renderMovieGrid(showingMovies);
});