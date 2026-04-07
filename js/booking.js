const MOCK_BOOKINGS = [
  {
    ticketId: "#VE-1001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0987.xxx.xxx",
    movie: "Dune: Part Two",
    time: "10:00",
    date: "15/10/2023",
    seats: "F12, F13",
    total: "180.000",
    status: 1 
  },
  {
    ticketId: "#VE-1002",
    customerName: "Trần Thị B",
    customerPhone: "0912.xxx.xxx",
    movie: "Mai",
    time: "13:30",
    date: "15/10/2023",
    seats: "G5",
    total: "90.000",
    status: 0
  },
  {
    ticketId: "#VE-1003",
    customerName: "Lê Văn C",
    customerPhone: "0909.xxx.xxx",
    movie: "Kung Fu Panda 4",
    time: "19:00",
    date: "15/10/2023",
    seats: "H10, H11, H12",
    total: "270.000",
    status: 1
  },
  {
    ticketId: "#VE-1004",
    customerName: "Phạm Minh D",
    customerPhone: "0933.xxx.xxx",
    movie: "Exhuma: Quật Mộ",
    time: "21:45",
    date: "14/10/2023",
    seats: "E8",
    total: "90.000",
    status: -1
  },
  {
    ticketId: "#VE-1005",
    customerName: "Hoàng Yến E",
    customerPhone: "0977.xxx.xxx",
    movie: "Godzilla x Kong",
    time: "09:15",
    date: "16/10/2023",
    seats: "D4, D5",
    total: "180.000",
    status: 0
  },
];

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser || (currentUser.role !== 'admin' && currentUser.role !== 'ADMIN')) {
        window.location.href = 'index.html';
        return;
    }

    const adminNameEl = document.querySelector('.admin-name');
    const adminEmailEl = document.querySelector('.admin-email');
    if (adminNameEl) adminNameEl.textContent = currentUser.fullName || 'Admin';
    if (adminEmailEl) adminEmailEl.textContent = currentUser.email || '';

    const logoutBtn = document.getElementById('logoutBtn');
    const logoutModal = document.getElementById('logoutModal');
    const cancelBtn = document.getElementById('cancelLogoutBtn');
    const confirmBtn = document.getElementById('confirmLogoutBtn');

    if (logoutBtn && logoutModal) {
        logoutBtn.addEventListener('click', () => {
            logoutModal.classList.remove('hidden');
        });

        cancelBtn.addEventListener('click', () => {
            logoutModal.classList.add('hidden');
        });

        confirmBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });
    }

    renderTable(MOCK_BOOKINGS);

    const searchInput = document.getElementById('searchBookingInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = MOCK_BOOKINGS.filter(b => 
                b.ticketId.toLowerCase().includes(query) || 
                b.customerName.toLowerCase().includes(query) ||
                b.customerPhone.toLowerCase().includes(query)
            );
            renderTable(filtered);
        });
    }
});

function renderTable(data) {
    const tbody = document.getElementById('bookingTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    
    document.getElementById('pageCurrent').textContent = `1 đến ${data.length}`;
    document.getElementById('pageTotal').textContent = MOCK_BOOKINGS.length;

    data.forEach(booking => {
        let statusBadge = '';
        if (booking.status === 1) {
            statusBadge = `<span class="badge-paid">Đã Thanh Toán</span>`;
        } else if (booking.status === 0) {
            statusBadge = `<span class="badge-pending">Chờ xử lý</span>`;
        } else if (booking.status === -1) {
            statusBadge = `<span class="badge-cancelled">Đã hủy</span>`;
        }

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="code-cell">${booking.ticketId}</td>
            <td>
                <div class="customer-info">
                    <span class="customer-name">${booking.customerName}</span>
                    <span class="customer-phone">${booking.customerPhone}</span>
                </div>
            </td>
            <td>${booking.movie}</td>
            <td>
                <div class="time-info">
                    <span class="time-slot">${booking.time}</span>
                    <span class="date-slot">${booking.date}</span>
                </div>
            </td>
            <td><span class="seats">${booking.seats}</span></td>
            <td><span class="total-amount">${booking.total}đ</span></td>
            <td>${statusBadge}</td>
            <td>
                <button class="action-btn" title="Sửa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                </button>
                <button class="action-btn" title="Xóa">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
