angular.module('pag-site')
  .constant("API",{
    url: 'data/',
    cat_fonct_url: 'http://165.227.69.188:8082/categorie/',
    proj_fonct_url: 'http://165.227.69.188:8081/projet/projets',
    media_fonct_url: 'http://165.227.69.188:8086/media/medias',
    comment_fonct_url: 'http://165.227.69.188:8083/commentaire/commentaires',
    note_fonct_url: 'http://165.227.69.188:8084/note/notes',
    like_fonct_url: 'http://165.227.69.188:8085/like/likes',
    assets:''
  }
  );
