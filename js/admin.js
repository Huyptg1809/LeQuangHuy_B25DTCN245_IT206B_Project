document.addEventListener('DOMContentLoaded', function() {
	const logoutBtn = document.getElementById('logoutBtn');
	const logoutModal = document.getElementById('logoutModal');
	const cancelLogoutBtn = document.getElementById('cancelLogoutBtn');
	const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

	if (!logoutBtn || !logoutModal || !cancelLogoutBtn || !confirmLogoutBtn) {
		return;
	}

	logoutBtn.addEventListener('click', function() {
		logoutModal.classList.remove('hidden');
	});

	cancelLogoutBtn.addEventListener('click', function() {
		logoutModal.classList.add('hidden');
	});

	logoutModal.addEventListener('click', function(event) {
		if (event.target === logoutModal) {
			logoutModal.classList.add('hidden');
		}
	});

	confirmLogoutBtn.addEventListener('click', function() {
		localStorage.removeItem('currentUser');
		window.location.href = 'login.html';
	});
});
