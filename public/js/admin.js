const navLink = document.querySelectorAll('.nav-link');
const navTreeview = document.querySelectorAll('.nav-treeview');
const sidebar = document.getElementById("sidebar");
const menuIcon = document.getElementById("menuIcon");
const navMenuIcon = document.getElementById("navMenuIcon");
const profileButton = document.getElementById("profileButton");
const profileLink = document.querySelectorAll(".profile-link");
const profile = document.getElementById("profile");

function ready(callback){
    // belge yüklendiğinde

    if (document.readyState!='loading') callback();

    // modern browsers

    else if (document.addEventListener) 

    document.addEventListener('DOMContentLoaded', callback);

    // IE <= 8

    else document.attachEvent('onreadystatechange', function(){

        if (document.readyState=='complete') callback();
    });
}

ready(function(){
    navLink.forEach((link) => {
        link.addEventListener('click', () => {
            // altında ul varsa
            if (link.nextElementSibling){
                // eğer class'ında show varsa
                if (link.nextElementSibling.classList.contains('show')){
                    navTreeview.forEach((treeview) => {
                        treeview.classList.remove('show');
                    });

                    // tüm linklerin altındaki i tag'ının class'ını değiştir
                    navLink.forEach((link) => {
                        // link altındaki p nin içindeki i tag ı varsa
                        if (link.querySelector('p i')){
                            const i = link.querySelector('p i');
                            i.classList.remove('bi-chevron-down');
                            i.classList.add('bi-chevron-right');
                        }
                    });
                } else {
                    // show class'ını kaldır
                    navTreeview.forEach((treeview) => {
                        treeview.classList.remove('show');
                    });
                    // class'ını ekle
                    link.nextElementSibling.classList.add('show');

                     // tüm linklerin altındaki i tag'ının class'ını değiştir
                     navLink.forEach((link) => {
                        // link altındaki p nin içindeki i tag ı varsa
                        if (link.querySelector('p i')){
                            const i = link.querySelector('p i');
                            i.classList.remove('bi-chevron-down');
                            i.classList.add('bi-chevron-right');
                        }
                    });
                    
                    // link altındaki i tag'ını bul
                    const i = link.querySelector('p i');
                    // i tag'ının class'ını değiştir
                    i.classList.remove('bi-chevron-right');
                    i.classList.add('bi-chevron-down');
                }
            }else{
                // altında ul yoksa
                navTreeview.forEach((treeview) => {
                    treeview.classList.remove('show');
                });

                // tüm linklerin altındaki i tag'ının class'ını değiştir
                navLink.forEach((link) => {
                    // link altındaki p nin içindeki i tag ı varsa
                    if (link.querySelector('p i')){
                        const i = link.querySelector('p i');
                        i.classList.remove('bi-chevron-down');
                        i.classList.add('bi-chevron-right');
                    }
                });
            }
        });
    });
    
    if(menuIcon){
        menuIcon.addEventListener('click', () => {
            if (sidebar.classList.contains("sidebarClose")) {
                sidebar.classList.remove("sidebarClose");
                sidebar.classList.add("sidebarOpen");
            }
        });
    }
    
    if(navMenuIcon){
        navMenuIcon.addEventListener('click', () => {
            if(sidebar.classList.contains("sidebarOpen")){
                sidebar.classList.remove("sidebarOpen");
                sidebar.classList.add("sidebarClose");
                return;
            }
        
            if(sidebar.classList.contains("sidebarClose")){
                sidebar.classList.remove("sidebarClose");
                sidebar.classList.add("sidebarOpen");
                return;
            }
        });
    }
    
    if(profileButton){
        profileButton.addEventListener('click', () => {
            if(profile.classList.contains("hidden")){
                profile.classList.remove("hidden");
            } else {
                profile.classList.add("hidden");
            }
        });
    }
    
    if(profileLink){
        profileLink.forEach((link) => {
            link.addEventListener('click', () => {
                profile.classList.add("hidden");
            });
        });
    }
    
    // profile link açıkken başka bir yere tıklanırsa kapat
    if(profile){
        document.addEventListener('click', (e) => {
            if (!profile.contains(e.target) && !profileButton.contains(e.target)) {
                profile.classList.add("hidden");
            }
        });
    }
    
    // Linklerdeki aktif class'ını kontrol et
    const currentLocation = location.href
    const menuItem = document.querySelectorAll('.nav-link')
    const menuLength = menuItem.length

    // Tüm linklerin active class'ını kaldır
    for (let i = 0; i < menuLength; i++) {
        menuItem[i].classList.remove('active')
    }

    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            menuItem[i].classList.add('active')

            // eğer ul içersindeyse parent li'ye active class'ını ekle
            if (menuItem[i].parentElement.parentElement.classList.contains('nav-treeview')) {
                menuItem[i].parentElement.parentElement.classList.add('show')
                menuItem[i].parentElement.parentElement.parentElement.parentElement.classList.add('active')
            }
        }
    }



    // linklere tıklandığında active class'ını ekle
    menuItem.forEach((link) => {
        link.addEventListener('click', () => {
            for (let i = 0; i < menuLength; i++) {
                menuItem[i].classList.remove('active')
            }
            link.classList.add('active')

            // eğer ul içersindeyse parent li'ye active class'ını ekle
            if (link.parentElement.parentElement.classList.contains('nav-treeview')) {
                link.parentElement.parentElement.classList.add('show')
                link.parentElement.parentElement.parentElement.parentElement.classList.add('active')
            }
        });
    });
});
