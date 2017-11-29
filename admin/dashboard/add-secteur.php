<div class="main-content white">
  <div class="container">
    <h4 class="no-margin-bottom title <?php echo $color;?>"><?php echo $title;?> -- <a href="dashboard.php" class="btn teal pag">Terminer</a></h4>
    <p class="flow-text subtitle grey-text text-lighten-1 no-margin-top"><?php echo $subtitle;?></p>
    <p class="no-margin grey-text breadcrumbs"><?php echo $breadcrumbs; ?></p>
    <div class="divider"></div>
    <!-- Content -->
    <div class="row no-margin">
      <div class="col s12">
        <div class="row">
          <div class="col s12"><p class="no-margin">&nbsp;</p></div>
          <form class="col s12">
            <div class="row">
              <div class="col s12">
                <h4 class="no-margin teal-text text-pag">Informations</h4>
                <b>Veuillez remplir ce formulaire</b>
              </div>
              <div class="input-field col s12 m6">
                <select>
                  <option value="" disabled selected>- -</option>
                  <option value="1">Pilier 1</option>
                  <option value="2">Pilier 2</option>
                  <option value="3">Pilier 3</option>
                </select>
                <label>Pilier</label>
              </div>
              <div class="input-field col s12 m6">
                <!-- Liste dynamique fonction du pilier choisi -->
                <select>
                  <option value="" disabled selected>- -</option>
                  <option value="1">Axe 1</option>
                  <option value="2">Axe 2</option>
                  <option value="3">Axe 3</option>
                </select>
                <label>Axe</label>
              </div>
              <div class="input-field col s12">
                <input id="name" type="text" class="validate">
                <label for="name"> Nom du secteur</label>
              </div>
              <div class="input-field col s12">
                <textarea id="textarea1" class="materialize-textarea"></textarea>
                <label for="textarea1">Description du secteur</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12 center center-align">
                <a href="dashboard.php" class="btn btn-large teal pag">Terminer</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Content -->
  </div>



  <div class="fixed-action-btn">
      <a class="btn-floating btn-large green pag" href="index.php?comment">
        <i class="large material-icons">check</i>
      </a>
    </div>

</div>
