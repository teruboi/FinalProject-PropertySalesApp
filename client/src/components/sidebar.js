export function Sidebar() {
    return (
        // <div>
        //     <div class="l-navbar" id="nav-bar">
        //         <nav class="nav">
        //             <div> <a href="#" class="nav_logo"> <i class='fa-solid fa-bars nav_logo-icon'></i> <span class="nav_logo-name">BBBootstrap</span> </a>
        //                 <div class="nav_list"> <a href="#" class="nav_link active"> <i class='bx bx-grid-alt nav_icon'></i> <span class="nav_name">Dashboard</span> </a> <a href="#" class="nav_link"> <i class='bx bx-user nav_icon'></i> <span class="nav_name">Users</span> </a> <a href="#" class="nav_link"> <i class='bx bx-message-square-detail nav_icon'></i> <span class="nav_name">Messages</span> </a> <a href="#" class="nav_link"> <i class='bx bx-bookmark nav_icon'></i> <span class="nav_name">Bookmark</span> </a> <a href="#" class="nav_link"> <i class='bx bx-folder nav_icon'></i> <span class="nav_name">Files</span> </a> <a href="#" class="nav_link"> <i class='bx bx-bar-chart-alt-2 nav_icon'></i> <span class="nav_name">Stats</span> </a> </div>
        //             </div> <a href="#" class="nav_link"> <i class='bx bx-log-out nav_icon'></i> <span class="nav_name">SignOut</span> </a>
        //         </nav>
        //     </div>
        // </div>
        
        <nav class="l-navbar">
            <div class="container-fluid">
                <div class="btn header_toggle d-flex justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
                    <i class="fa-solid fa-bars bx bx-menu fa-xl align-end" id="header-toggle" />
                </div>
            </div>
            
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasLabel">Listingan.com</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <ul class="navbar-nav flex-grow-1 ps-3">
                        <li class="nav-item">
                            <a href="#" class="nav-link">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">List</a>
                        </li>
                        <li class="nav-item">
                            <a href="#" class="nav-link">Settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}