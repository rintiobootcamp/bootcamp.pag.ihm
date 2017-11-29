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
          <div class="col s12">
            <ul class="tabs tabs-fixed-width">
              <li class="tab col s3"><a class="active" href="#projet">Le projet</a></li>
              <li class="tab col s3"><a href="#photos">Les phases</a></li>
              <li class="tab col s3"><a href="#videos">Budget</a></li>
              <li class="tab col s3"><a href="#audio">Carte</a></li>
            </ul>
          </div>
          <div class="col s12"><p class="no-margin">&nbsp;</p></div>
          <?php include('add-project/projet.php') ?>
          <?php include('add-project/phases.php') ?>
          <?php include('add-project/budget.php') ?>
          <?php include('add-project/carte.php') ?>
          <?php include('add-project/phase-modal.php') ?>
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
