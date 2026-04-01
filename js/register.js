function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    const hasMinLength = password.length >= 8;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    return hasMinLength && hasSpecialChar;
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const navbar = document.querySelector('.navbar');

    if (!toastContainer) {
        return;
    }

    if (navbar) {
        toastContainer.style.top = (navbar.offsetHeight + 16) + 'px';
    }

    const toastItem = document.createElement('div');
    toastItem.className = 'toast-item';

    const toastIcon = document.createElement('img');
    toastIcon.className = 'toast-icon';
    toastIcon.alt = 'Toast icon';

    const toastText = document.createElement('span');
    toastText.textContent = message;

    if (type === 'success') {
        toastIcon.src = '../assets/icons/success.png';
    } else {
        toastIcon.src = '../assets/icons/cancel.png';
        toastItem.classList.add('error');
    }

    toastItem.appendChild(toastIcon);
    toastItem.appendChild(toastText);
    toastContainer.appendChild(toastItem);

    window.setTimeout(function() {
        toastItem.classList.add('hide');

        window.setTimeout(function() {
            toastItem.remove();
        }, 220);
    }, 3000);
}

function validateForm(fullname, email, password, confirmPassword, terms) {
    if (fullname.trim() === '') {
        showToast('Họ và tên không được để trống', 'error');
        return false;
    } else if (email.trim() === '') {
        showToast('Email không được để trống', 'error');
        return false;
    } else if (!validateEmail(email)) {
        showToast('Email phải đúng định dạng', 'error');
        return false;
    } else if (password === '') {
        showToast('Mật khẩu không được để trống', 'error');
        return false;
    } else if (!validatePassword(password)) {
        showToast('Mật khẩu tối thiểu 8 ký tự và có ít nhất một ký tự đặc biệt', 'error');
        return false;
    } else if (confirmPassword === '') {
        showToast('Mật khẩu xác nhận không được để trống', 'error');
        return false;
    } else if (password !== confirmPassword) {
        showToast('Mật khẩu không trùng khớp', 'error');
        return false;
    } else if (!terms) {
        showToast('Vui lòng đồng ý với điều khoản sử dụng', 'error');
        return false;
    } else {
        return true;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
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

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms').checked;

        if (validateForm(fullname, email, password, confirmPassword, terms)) {
            showToast('Đăng ký thành công', 'success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            return;
        }
    });
});
