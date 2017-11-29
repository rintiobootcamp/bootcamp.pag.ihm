<div class="main-content white">
  <div class="container">

    <h4 class="no-margin-bottom title <?php echo $color?>"><?php echo $title;?><span class=" hide-on-small-only">--</span> <a href="dashboard.php?page=add&type=secteur" class="btn green pag hide-on-small-only">Nouveau secteur</a></h4>
    <p class="flow-text subtitle grey-text text-lighten-1 no-margin-top"><?php echo $subtitle;?></p>

    <table class="striped">
      <thead>
        <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Axe</th>
            <th>Projets</th>
            <th class="center text-center">-</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Description du secteur 1</td>
          <td>Axe 1</td>
          <td>5</td>
          <td class="center text-center">
            <a href="dashboard.php?page=edit&type=pilier-1" class=""><i class="material-icons">edit</i></a>
            <a href="#!" class=""><i class="material-icons">delete</i></a>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Description du secteur 2</td>
          <td>Axe 1</td>
          <td>5</td>
          <td class="center text-center">
            <a href="dashboard.php?page=edit&type=pilier-2" class=""><i class="material-icons">edit</i></a>
            <a href="#!" class=""><i class="material-icons">delete</i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
