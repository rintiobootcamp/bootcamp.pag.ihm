<div id="phase-modal" class="modal">
  <div class="modal-content">
    <form class="col s12">
      <div class="row">
        <div class="col s12 m8">
          <h4 class="no-margin teal-text text-pag">Nouvelle phase</h4>
          <b>Veuillez renseigner les informations sur la phase</b>
        </div>
        <div class="input-field col s12 m4">
          <select>
            <option value="" disabled selected>- -</option>
            <option value="1"> Démarrée</option>
            <option value="2">En cours</option>
            <option value="3">Terminée</option>
            <option value="4">Arrêtée</option>
          </select>
          <label>État</label>
        </div>
        <div class="input-field col s12 m8">
          <input id="name" type="text" class="validate">
          <label for="name"> Nom de la phase</label>
        </div>
        <div class="input-field col s12 m4">
          <input id="budget" type="text" class="validate">
          <label for="name">Budget prévisionnel</label>
        </div>
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Description de la phase</label>
        </div>
        <div class="col s12">&nbsp;</div>
        <div class="input-field col s12 m6">
          <input id="dateDebut" type="text" class="datepicker">
          <label>Date début</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="dateFin" type="text" class="datepicker">
          <label>Date Fin</label>
        </div>
      </div>
    </form>
  </div>
  <div class="modal-footer">
    <div class="row">
      <div class="input-field col s12 center">
        <a href="dashboard.php?page=stores" class="btn btn-large blue mtn">Enregistrer</a>
      </div>
    </div>
  </div>
</div>
