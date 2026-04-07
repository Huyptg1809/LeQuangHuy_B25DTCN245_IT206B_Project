function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toastItem = document.createElement('div');
    toastItem.className = 'toast-item';
    
    if (type === 'error') {
        toastItem.classList.add('error');
    }

    const toastIcon = document.createElement('img');
    toastIcon.className = 'toast-icon';
    toastIcon.src = type === 'success' ? '../assets/icons/success.png' : '../assets/icons/cancel.png';

    const toastText = document.createElement('span');
    toastText.textContent = message;

    toastItem.appendChild(toastIcon);
    toastItem.appendChild(toastText);
    toastContainer.appendChild(toastItem);

    setTimeout(() => {
        toastItem.classList.add('hide');
        setTimeout(() => toastItem.remove(), 220); 
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "index.html";
        return; 
    }

    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target'); 
            const passwordInput = document.getElementById(targetId);
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    });

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;

            if (fullname === '') {
                return showToast('Họ và tên không được để trống', 'error');
            }
            if (email === '') {
                return showToast('Email không được để trống', 'error');
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return showToast('Email phải đúng định dạng', 'error');
            }
            if (password === '') {
                return showToast('Mật khẩu không được để trống', 'error');
            }
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
            if (password.length < 8 || !hasSpecialChar) {
                return showToast('Mật khẩu tối thiểu 8 ký tự và có ít nhất 1 ký tự đặc biệt', 'error');
            }
            if (confirmPassword === '') {
                return showToast('Mật khẩu xác nhận không được để trống', 'error');
            }
            if (password !== confirmPassword) {
                return showToast('Mật khẩu không trùng khớp', 'error');
            }
            if (terms === false) {
                return showToast('Vui lòng đồng ý với điều khoản sử dụng', 'error');
            }

            let users = JSON.parse(localStorage.getItem('users')) || [];

            const isEmailExist = users.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (isEmailExist) {
                return showToast('Email đã tồn tại, vui lòng dùng email khác', 'error');
            }

            const newUser = {
                id: Date.now(), 
                fullName: fullname,
                email: email,
                password: password,
                role: 'user', 
                isActive: true
            };

            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            showToast('Đăng ký thành công', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});
