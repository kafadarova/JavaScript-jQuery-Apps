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
   $.ajax({
     url: url + username + '/repos',
     data:{
       client_id: '2c61e32576705b129895',
       client_secret: '099e76bcbc76c4c691f89b39b1605a3b21ba39c9',
       sort: 'created: asc', // Sort the repos by date
       per_page: 5
      }
   }).done((repos) => {
     $.each(repos, (index, repo) => {
       // Use append not html so we can add a text, not rewrrite it
       $('#repos').append(`
         <div class="well">
          <div class="row">
          <div class="col-md-7">
          <strong>${repo.name}</strong>: ${repo.description}
          </div>
          <div class="col-md-3">
            <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
            <span class="badge badge-primary">Watcher: ${repo.watchers_count}</span>
            <span class="badge badge-success">Stars: ${repo.stargezers_count}</span>
          </div>
          <div class="col-md-2">
            <a href="${repo.html_url}" target="_blank" btn btn-default>Repo Page</a>
          </div>
          </div>
         </div>
         `);
     });
   });
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
