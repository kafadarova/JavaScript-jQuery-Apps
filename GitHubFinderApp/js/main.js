$(document).ready(() => {
  // Keyup cent - when we start to type
  // Get what we are typing in
$('#searchUser').on('keyup', (e) => {
  // The value of what we typed in - e.target.value
 let username = e.target.value;
 const url = 'https://api.github.com/users/';
 // Make request to GitHub
 $.ajax({
   url: url + username,
   data:{
     client_id: '2c61e32576705b129895',
     client_secret: '099e76bcbc76c4c691f89b39b1605a3b21ba39c9'
   }
 }).done((user) => { // Receive the user object
   $('#profile').html(`
     <div class="panel panel-default">
        <div class="panel-heading">
        <h3 class="panel-title">${user.name}</h3>
      </div>
      <div class="panel-body">
        <div class="row">
          <div class="col-md-3">
            <img class="thumbnail avatar" src="${user.avatar_url}">
            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
            <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-success">Followers: ${user.followers}</span>
            <span class="badge badge-info">Following: ${user.following}</span>
            <br><br>
            <ul class="list-group">
              <li class="list-group-item">Company: ${user.company}</li>
              <li class="list-group-item">Website/blog: ${user.blog}</li>
              <li class="list-group-item">Location: ${user.location}</li>
              <li class="list-group-item">Member Since: ${user.created_at}</li>
            </ul>
            </div>
          </div>
        </div>
      </div>
      <h3 class="page-header">Latest Repos</h3>
      <div id='repos'> </div>
     `);
});
});
});
