<div class="main-content white">
  <div class="container">

    <h4 class="no-margin-bottom title <?php echo $color?>"><?php echo $title;?><span class=" hide-on-small-only">--</span> <a href="dashboard.php?page=add&type=projet" class="btn green pag hide-on-small-only">Nouveau projet</a></h4>
    <p class="flow-text subtitle grey-text text-lighten-1 no-margin-top"><?php echo $subtitle;?></p>

    <table class="striped">
      <thead>
        <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Axes</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Budget</th>
            <th>État</th>
            <th class="center text-center">-</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>1</td>
          <td>Consolider la démocratie, l'État de droit et la bonne gouvernance</td>
          <td>2</td>
          <td>jj - mm - aaaa</td>
          <td>jj - mm - aaaa</td>
          <td>3,5 milliards</td>
          <td>Phase 3</td>
          <td class="center text-center">
            <a href="dashboard.php?page=edit&type=pilier-1" class=""><i class="material-icons">edit</i></a>
            <a href="#!" class=""><i class="material-icons">delete</i></a>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Engager la transformation structurelle de l'économie</td>
          <td>3</td>
          <td>jj - mm - aaaa</td>
          <td>jj - mm - aaaa</td>
          <td>5,5 milliards</td>
          <td>Phase 5</td>
          <td class="center text-center">
            <a href="dashboard.php?page=edit&type=pilier-2" class=""><i class="material-icons">edit</i></a>
            <a href="#!" class=""><i class="material-icons">delete</i></a>
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Améliorer les conditions de vie des populations</td>
          <td>2</td>
          <td>jj - mm - aaaa</td>
          <td>jj - mm - aaaa</td>
          <td>6,5 milliards</td>
          <td>Phase 1</td>
          <td class="center text-center">
            <a href="dashboard.php?page=edit&type=pilier-3" class=""><i class="material-icons">edit</i></a>
            <a href="#!" class=""><i class="material-icons">delete</i></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
