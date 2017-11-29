<div id="photos" class="col s12">
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="col s12">
          <h4 class="no-margin teal-text text-pag">Les phases du projet</h4>
          <b>Toutes les phases du projet</b>
        </div>
        <div class="col s12">&nbsp;</div>
        <div class="input-field col s12 m6">
          <input id="dateDebutPrevue" type="email" class="datepicker" placeholder="Date de début du projet">
          <label for="dateDebutPrevue">Date de début du projet</label>
        </div>
        <div class="input-field col s12 m6">
          <input id="dateFinPrevue" type="email" class="datepicker" placeholder="Date de fin du projet">
          <label for="dateFinPrevue">Date de fin du projet</label>
        </div>
      </div>
      <div class="row no-margin">
        <div class="col s12">
          <table class="striped">
            <thead>
              <tr>
                  <th>#</th>
                  <th>TItre</th>
                  <th>Description</th>
                  <th>Budget</th>
                  <th>Début</th>
                  <th>Fin</th>
                  <th></th>
                  <th>État</th>
                  <th class="center text-center">-</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                  <td>#</td>
                  <td>Phase 1</td>
                  <td>Acheminement des machines sur le lieu de démarrage du chantier</td>
                  <td>345 millions F</td>
                  <td>Début</td>
                  <td>Fin</td>
                  <td></td>
                  <td>
                    <select>
                      <option value="" disabled selected>- -</option>
                      <option value="1"> Démarrée</option>
                      <option value="2">En cours</option>
                      <option value="3">Terminée</option>
                      <option value="4">Arrêtée</option>
                    </select>
                  </td>
                  <td class="center text-center">
                    <a href="#phase-modal" class="modal-trigger"><i class="material-icons">edit</i></a>
                    <a href="#!" class=""><i class="material-icons">delete</i></a>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row no-margin">
        <p>&nbsp;</p>
        <div class="col s12 right-align">
          <a href="#phase-modal" class="btn btn-large modal-trigger"><i class="material-icons">add</i></a>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12 center center-align">
          <a href="#!" class="btn btn-large white teal-text text-pag" id="to-projet-btn">Retour</a>
          <a href="#!" class="btn btn-large teal pag" id="to-videos-btn">Suivant</a>
        </div>
      </div>
    </form>
  </div>
</div>
