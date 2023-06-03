import "./index.css"

export default function NavBar(params) {
    return(
        <nav class="navbar navbar-fixed-top navbar-default">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">Task Management</a>
            </div>

            <div class="nav navbar-header navbar-profile  pull-right">
              <ul class="nav">
                <li class="dropdown ">
                  <a href="#" data-toggle="dropdown" class="dropdown-toggle">
                    {/* {<i class='fa fa-user-circle' style={{fontSize:"24px"}}></i>} */}
                    <span class="glyphicon glyphicon-user"></span>
                    <b class="caret"></b></a>
                  <ul class="dropdown-menu">
                    <li>
                      <a href="/users/id" title="Profile">Profile</a>
                    </li>
                    <li>
                      <a href="/logout" title="Logout">Logout </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    )
}