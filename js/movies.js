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

function initMovies() {
    if (!localStorage.getItem('movies')) {
        localStorage.setItem('movies', JSON.stringify(DEFAULT_MOVIES));
    }
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const showingMovies = movies.filter(m => m.status === 1);

    if (showingMovies.length > 0) {
        let currentSlideIndex = 0;
        const heroSection = document.querySelector('.hero');
        const bgContainer = document.querySelector('.background-container');
        
        function renderHeroSlide(index) {
            const heroMovie = showingMovies[index];
            
            if (bgContainer) {
                // Tạo hiệu ứng cross-fade mượt hơn bằng cách điều chỉnh opacity nhanh
                bgContainer.style.opacity = '0.7';
                setTimeout(() => {
                    bgContainer.style.backgroundImage = `linear-gradient(to right, #000000 0%, rgba(38, 38, 38, 0) 50%), url('${heroMovie.posterUrl}')`;
                    bgContainer.style.backgroundSize = 'cover';
                    bgContainer.style.backgroundPosition = 'center';
                    bgContainer.style.backgroundRepeat = 'no-repeat';
                    bgContainer.style.transition = 'opacity 0.6s ease-in-out';
                    
                    // Khôi phục opacity với khoảng trễ ngắn
                    setTimeout(() => {
                        bgContainer.style.opacity = '1';
                    }, 50);
                }, 300);
            }

            if (heroSection) {
                heroSection.style.position = 'relative';
                
                heroSection.innerHTML = `
                    <div style="animation: fade-in-slide 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; max-width: 600px;">
                            <p class="badge">● Đang Thịnh Hành</p>
                        </div>
                        <h1>${heroMovie.title.split(':').join('<br />')}</h1>
                        <p class="summary">${heroMovie.description}</p>
                        <div class="actions">
                          <button class="btn btn-primary">
                            <img src="../assets/icons/7.png" alt="Đặt vé" /> Đặt Vé Ngay
                          </button>
                          <button class="btn btn-dark" onclick="const tr='${heroMovie.trailler || ''}'; if(tr && tr!=='undefined'){ document.getElementById('trailerModal').style.display='flex'; document.getElementById('trailerIframe').src=tr; } else { if(typeof showToast === 'function') { showToast('Trailer không khả dụng!', 'error'); } else { alert('Trailer không khả dụng!'); } }">
                            <img src="../assets/icons/8.png" alt="Xem trailer" /> Xem Trailer
                          </button>
                        </div>
                    </div>
                `;
                
                // Thêm CSS ngắn gọn cho animation (Mượt mà hơn)
                if (!document.getElementById('heroSlideAnim')) {
                    const style = document.createElement('style');
                    style.id = 'heroSlideAnim';
                    style.innerHTML = `@keyframes fade-in-slide { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }`;
                    document.head.appendChild(style);
                }
            }
        }

        window.goToHeroSlide = function(idx) {
            currentSlideIndex = idx;
            renderHeroSlide(currentSlideIndex);
            
            // Xóa bộ đếm thời gian cũ nếu user bấm tay để không bị nhảy liền 2 lần
            clearInterval(window.heroSliderInterval);
            window.heroSliderInterval = setInterval(nextSlide, 5000);
        };

        function nextSlide() {
            const maxSlides = Math.min(showingMovies.length, 4);
            currentSlideIndex = (currentSlideIndex + 1) % maxSlides;
            renderHeroSlide(currentSlideIndex);
        }

        // Lần đầu tiên vẽ luôn slide 0
        renderHeroSlide(0);

        // Kích hoạt auto chuyển cảnh sau mỗi 5 giây nếu có > 1 phim hot
        if (showingMovies.length > 1) {
            window.heroSliderInterval = setInterval(nextSlide, 5000);
        }
    }
    
    const movieGrid = document.querySelector('.movie-grid');
    if (movieGrid) {
        movieGrid.innerHTML = '';
        const displayMovies = showingMovies.slice(0, 4);
        
        displayMovies.forEach(m => {
            movieGrid.innerHTML += `
                <article class="movie-card">
                  <img src="${m.posterUrl}" alt="${m.title} poster" onerror="this.src='../assets/images/Film1.png'" />
                  <div class="movie-info">
                    <h3>${m.title}</h3>
                    <p>◷ ${m.duration} phút ・ ${m.genres}</p>
                    <button>Mua Vé</button>
                  </div>
                </article>
            `;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMovies();
});