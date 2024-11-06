document.addEventListener('DOMContentLoaded', () => {   
    // Elemen-elemen DOM
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const forgotPasswordLink = document.querySelector('.forgot-password-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const loginButton = document.getElementById('loginButton');
    const profileContainer = document.getElementById('profileContainer');
    const profileIcon = document.getElementById('profileIcon');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileNameDropdown = document.getElementById('profileNameDropdown');
    const logoutButton = document.getElementById('logoutButton');
    const logoutConfirmDialog = document.getElementById('logoutConfirmDialog');
    const logoutConfirmYes = document.getElementById('logoutConfirmYes');
    const logoutConfirmNo = document.getElementById('logoutConfirmNo');
    const video = document.getElementById('myVideo');
    const toggleSound = document.getElementById('toggleSound');
    const forgotPasswordLoginLink = document.querySelector('.form-box.forgot-password .login-link');
    const transparentContent = document.querySelector('.transparent-content');
    const exploreButton = document.getElementById('exploreButton');
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.navigation');

    // Fungsi untuk mengganti form
    const switchForm = (addClassName, removeClassNames = []) => {
        wrapper.classList.remove(...removeClassNames);
        if (addClassName) wrapper.classList.add(addClassName);
    };

    // Fungsi untuk login/logout
    const toggleLoginState = (isLoggedIn) => {
        loginButton.style.display = isLoggedIn ? 'none' : 'block';
        profileContainer.style.display = isLoggedIn ? 'block' : 'none';
        if (!isLoggedIn) profileDropdown.classList.remove('show');
        localStorage.setItem('isLoggedIn', isLoggedIn);
        
        if (transparentContent) {
            transparentContent.style.display = isLoggedIn ? 'none' : 'flex';
        }
    };

    const hideContent = () => {
        if (transparentContent) {
            transparentContent.classList.add('hidden');
        }
    };

    const showContent = () => {
        if (transparentContent) {
            transparentContent.classList.remove('hidden');
        }
    };

    // Event listeners
    registerLink.addEventListener('click', () => switchForm('active', ['active-forgot']));
    loginLink.addEventListener('click', () => switchForm('', ['active', 'active-forgot']));
    btnPopup.addEventListener('click', () => wrapper.classList.add('active-popup'));
    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
        setTimeout(() => {
            switchForm('', ['active', 'active-forgot']);
            showContent();
        }, 300); // Menunggu setengah dari durasi transisi wrapper
    });
    forgotPasswordLink.addEventListener('click', () => switchForm('active-forgot', ['active']));
    forgotPasswordLoginLink.addEventListener('click', () => switchForm('', ['active-forgot']));

    const showLoginForm = () => {
        hideContent();
        setTimeout(() => {
            wrapper.classList.add('active-popup');
        }, 300); // Menunggu setengah dari durasi transisi konten
    };

    loginButton.addEventListener('click', showLoginForm);
    exploreButton.addEventListener('click', showLoginForm);

    // Simulasi login (ganti ini dengan logika login sebenarnya)
    wrapper.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        wrapper.classList.remove('active-popup');
        setTimeout(() => {
            toggleLoginState(true);
        }, 500); // Menunggu durasi penuh transisi wrapper
    });

    // Manajemen dropdown profil
    let isDropdownOpen = false;

    const toggleProfileDropdown = (show) => {
        isDropdownOpen = show;
        profileDropdown.classList.toggle('show', show);
        profileNameDropdown.style.opacity = show ? '0' : '1';
        profileNameDropdown.style.visibility = show ? 'hidden' : 'visible';
        profileNameDropdown.style.transform = show ? 'translateY(10px)' : 'translateY(0)';
    };

    profileIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleProfileDropdown(!isDropdownOpen);
    });

    profileIcon.addEventListener('mouseenter', () => {
        if (!isDropdownOpen) {
            profileNameDropdown.style.opacity = '1';
            profileNameDropdown.style.visibility = 'visible';
            profileNameDropdown.style.transform = 'translateY(0)';
        }
    });

    profileIcon.addEventListener('mouseleave', () => {
        if (!isDropdownOpen) {
            profileNameDropdown.style.opacity = '0';
            profileNameDropdown.style.visibility = 'hidden';
            profileNameDropdown.style.transform = 'translateY(10px)';
        }
    });

    // Menutup dropdown saat klik di luar
    document.addEventListener('click', () => {
        if (isDropdownOpen) toggleProfileDropdown(false);
    });

    // Logout confirmation
    const showLogoutConfirmation = () => {
        logoutConfirmDialog.style.display = 'block';
    };

    const hideLogoutConfirmation = () => {
        logoutConfirmDialog.style.display = 'none';
    };

    logoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        showLogoutConfirmation();
    });

    logoutConfirmYes.addEventListener('click', () => {
        hideLogoutConfirmation();
        toggleLoginState(false);
        showContent();
    });

    logoutConfirmNo.addEventListener('click', hideLogoutConfirmation);

    // Menutup dialog konfirmasi saat klik di luar
    window.addEventListener('click', (event) => {
        if (event.target === logoutConfirmDialog) {
            hideLogoutConfirmation();
        }
    });

    // Kontrol video background
    toggleSound.addEventListener('click', () => {
        video.muted = !video.muted;
        toggleSound.innerHTML = video.muted ?
            '<i class="fas fa-volume-mute" aria-hidden="true"></i><span class="sr-only">Aktifkan Suara</span>' :
            '<i class="fas fa-volume-up" aria-hidden="true"></i><span class="sr-only">Nonaktifkan Suara</span>';
    });

    video.play().catch(error => {
        console.error('Error memutar video:', error);
        // Tambahkan penanganan error yang lebih baik di sini
        // Misalnya, tampilkan pesan ke pengguna atau gunakan fallback
    });

    // Cek status login saat halaman dimuat
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    toggleLoginState(isLoggedIn);

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
    });

    // Fungsi untuk menutup menu saat item menu diklik
    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navigation.classList.remove('active');
    };

    // Tambahkan event listener untuk setiap item menu
    document.querySelectorAll('.navigation a, .navigation .btnLogin-popup').forEach(item => {
        item.addEventListener('click', closeMenu);
    });

    // Tutup menu saat mengklik di luar menu
    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navigation.contains(event.target);
        const isClickOnMenuToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideMenu && !isClickOnMenuToggle && navigation.classList.contains('active')) {
            closeMenu();
        }
    });
});