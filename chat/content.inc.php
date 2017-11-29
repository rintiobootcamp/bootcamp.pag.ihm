<?php
  if(isset($_GET['page'])){
    $page = $_GET['page'];
    $breadcrumbs = "<a href='index.php' class='grey-text text-lighten-1'>Accueil </a> <b>></b>";
    /*$subtitle = "Test";
    $name = ""; $surname = "";
    if(isset($_GET['name'])){
      $name = $_GET['name'];
    }
    if(isset($_GET['name'])){
    $surname = $_GET['surname'];
  }*/
    switch ($page) {




    case 'chat':
      list($type, $order) =explode("-", $_GET['type']);
      $breadcrumbs = $breadcrumbs." <a href='index.php?page=chats' class='grey-text text-lighten-1'>Projets</a> <b>></b>";
      switch($type){
        case 'agriculture' :
          $subtitle = "Secteur de l'agriculture";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de l'Agriculture</a> <b>></b>";
          $color = "teal-text text-pag";
          if($order == "1"){
            $title = "Projet n° 7 - Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)";
            $breadcrumbs = $breadcrumbs." <b>Projet n°7</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag white-text active'><i class='material-icons'>local_florist</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-2' class='collapsible-header teal-text text-pag left-align'>8 - Filières conventionnelles (riz, maïs, manioc)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-3' class='collapsible-header teal-text text-pag left-align'>9 - Aquaculture continentale</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-4' class='collapsible-header teal-text text-pag left-align'>10 - Mise en valeur de la basse et moyenne vallée de l'Ouémé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-5' class='collapsible-header teal-text text-pag left-align'>11 - Viande, lait, œufs de table</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 8 - Filières conventionnelles (riz, maïs, manioc)";
            $breadcrumbs = $breadcrumbs." <b>Projet n°8</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag white-text active'><i class='material-icons'>local_florist</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-1' class='collapsible-header teal-text text-pag left-align'>7 - Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-3' class='collapsible-header teal-text text-pag left-align'>9 - Aquaculture continentale</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-4' class='collapsible-header teal-text text-pag left-align'>10 - Mise en valeur de la basse et moyenne vallée de l'Ouémé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-5' class='collapsible-header teal-text text-pag left-align'>11 - Viande, lait, œufs de table</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 9 - Aquaculture continentale";
            $breadcrumbs = $breadcrumbs." <b>Projet n°9</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag white-text active'><i class='material-icons'>local_florist</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-1' class='collapsible-header teal-text text-pag left-align'>7 - Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-2' class='collapsible-header teal-text text-pag left-align'>8 - Filières conventionnelles (riz, maïs, manioc)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-4' class='collapsible-header teal-text text-pag left-align'>10 - Mise en valeur de la basse et moyenne vallée de l'Ouémé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-5' class='collapsible-header teal-text text-pag left-align'>11 - Viande, lait, œufs de table</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 10 - Mise en valeur de la basse et moyenne vallée de l'Ouémé";
            $breadcrumbs = $breadcrumbs." <b>Projet n°10</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag white-text active'><i class='material-icons'>local_florist</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-1' class='collapsible-header teal-text text-pag left-align'>7 - Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-2' class='collapsible-header teal-text text-pag left-align'>8 - Filières conventionnelles (riz, maïs, manioc)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-3' class='collapsible-header teal-text text-pag left-align'>9 - Aquaculture continentale</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-5' class='collapsible-header teal-text text-pag left-align'>11 - Viande, lait, œufs de table</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "5"){
            $title = "Projet n° 11 - Viande, lait, œufs de table";
            $breadcrumbs = $breadcrumbs." <b>Projet n°11</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag white-text active'><i class='material-icons'>local_florist</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-1' class='collapsible-header teal-text text-pag left-align'>7 - Filières à haute valeur ajoutée (ananas, anacarde, produits maraîchers)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-2' class='collapsible-header teal-text text-pag left-align'>8 - Filières conventionnelles (riz, maïs, manioc)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-3' class='collapsible-header teal-text text-pag left-align'>9 - Aquaculture continentale</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=agriculture-4' class='collapsible-header teal-text text-pag left-align'>10 - Mise en valeur de la basse et moyenne vallée de l'Ouémé</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'cdv' :
          $subtitle = "Secteur du Cadre de vie";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur du Cadre de vie</a> <b>></b>";
          $color = "yellow-text text-pag-gold";
          if($order == "1"){
            $title = "Projet n° 30 - Aménagement de la lagune de Cotonou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°30</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 31 - Aménagement de la lagune de Porto - Novo";
            $breadcrumbs = $breadcrumbs." <b>Projet n°31</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 32 - Gestion des déchets de Cotonou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°32</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 33- Aménagement du Centre-Ville (Ganhi)";
            $breadcrumbs = $breadcrumbs." <b>Projet n°33</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "5"){
            $title = "Projet n° 34 - Mordenisation du marché Dantokpa";
            $breadcrumbs = $breadcrumbs." <b>Projet n°34</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "6"){
            $title = "Projet n° 35 - Modernisation du marché Parakou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°35</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "7"){
            $title = "Projet n° 36 - Complexe international Cotonou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°36</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "8"){
            $title = "Projet n° 37 - Centre d'affaires à Ghézo";
            $breadcrumbs = $breadcrumbs." <b>Projet n°37</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "9"){
            $title = "Projet n° 38 - Réhabilitations Voiries";
            $breadcrumbs = $breadcrumbs." <b>Projet n°38</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "10"){
            $title = "Projet n° 39 - Assainissement pluvial à Cotonou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°39</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-11' class='collapsible-header yellow-text text-pag-gold left'>40 - Programme d'habitat social</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "11"){
            $title = "Projet n° 40 - Programme d'habitat social";
            $breadcrumbs = $breadcrumbs." <b>Projet n°40</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header yellow pag-gold white-text active'><i class='material-icons'>location_city</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=cdv-1' class='collapsible-header yellow-text text-pag-gold left'>30 - Aménagement de la lagune de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-2' class='collapsible-header yellow-text text-pag-gold left'>31 - Aménagement de la lagune de Porto - Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-3' class='collapsible-header yellow-text text-pag-gold left'>32 - Gestion des déchets de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-4' class='collapsible-header yellow-text text-pag-gold left'>33 - Aménagement du Centre-Ville (Ganhi)</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-5' class='collapsible-header yellow-text text-pag-gold left'>34 - Mordenisation du marché Dantokpa</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-6' class='collapsible-header yellow-text text-pag-gold left'>35 - Modernisation du marché Parakou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-7' class='collapsible-header yellow-text text-pag-gold left'>36 - Complexe international Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-8' class='collapsible-header yellow-text text-pag-gold left'>37 - Centre d'affaires à Ghézo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-9' class='collapsible-header yellow-text text-pag-gold left'>38 - Réhabilitations Voiries</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=cdv-10' class='collapsible-header yellow-text text-pag-gold left'>39 - Assainissement pluvial à Cotonou</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'ciis' :
          $subtitle = "Secteur de la CIIS";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de la CIIS</a> <b>></b>";
          $color = "teal-text text-pag-light";
          if($order == "1"){
            $title = "Projet n° 41 - Création d'une Cité Internationale de l'Innovation et du Savoir";
            $breadcrumbs = $breadcrumbs." <b>Projet n°41</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header teal pag-light white-text active'><i class='material-icons'>local_library</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <!--a href='index.php?page=chat&type=ciis-1' class='collapsible-header teal-text text-pag left-align'>41 - Création d'une Cité Internationale de l'Innovation et du Savoir</a--><p>--</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'eau' :
          $subtitle = "Secteur de l'Eau";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de l'Eau</a> <b>></b>";
          $color = "blue-text text-pag";
          if($order == "1"){
            $title = "Projet n° 42 - Exploitation responsable des ressources hydrauliques";
            $breadcrumbs = $breadcrumbs." <b>Projet n°42</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header blue pag white-text active'><i class='material-icons'>whatshot</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=eau-2' class='collapsible-header blue-text text-pag left-align'>43 - Donner accès à l’eau potable à l’ensemble de la population rurale et semi-urbaine</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=eau-3' class='collapsible-header blue-text text-pag left-align'>44 - Développer les capacités de production et de distribution en milieux urbain et péri urbain</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 43 - Donner l'accès à l'eau potable à l'ensemble de la population rurale et semi-urbaine";
            $breadcrumbs = $breadcrumbs." <b>Projet n°43</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header blue pag white-text active'><i class='material-icons'>whatshot</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=eau-1' class='collapsible-header blue-text text-pag left-align'>42 - Exploitation responsable des ressources hydrauliques</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=eau-3' class='collapsible-header blue-text text-pag left-align'>44 - Développer les capacités de production et de distribution en milieux urbain et péri urbain</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 44 - Développer les capacités de production et de distribution en milieux urbain et péri urbain";
            $breadcrumbs = $breadcrumbs." <b>Projet n°44</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header blue pag white-text active'><i class='material-icons'>whatshot</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=eau-1' class='collapsible-header blue-text text-pag left-align'>42 - Exploitation responsable des ressources hydrauliques</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=eau-2' class='collapsible-header blue-text text-pag left-align'>43 - Donner accès à l’eau potable à l’ensemble de la population rurale et semi-urbaine</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'electricite' :
          $subtitle = "Secteur de l'Électricité";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de l'Electricité</a> <b>></b>";
          $color = "amber-text text-pag";
          if($order == "1"){
            $title = "Projet n° 26 - Filière thermique : garantir un accès compétitif à l'électricité";
            $breadcrumbs = $breadcrumbs." <b>Projet n°26</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header amber pag white-text active'><i class='material-icons'>lightbulb_outline</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=electricite-2' class='collapsible-header amber-text text-pag left-align'>27 - Développer les énergies renouvelables</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-3' class='collapsible-header amber-text text-pag left-align'>28 - Restructurer l'opérateur national et son réseau</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-4' class='collapsible-header amber-text text-pag left-align'>29 - Maîtrise des consommations électriques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 27 - Développer les énergies renouvelables";
            $breadcrumbs = $breadcrumbs." <b>Projet n°27</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header amber pag white-text active'><i class='material-icons'>lightbulb_outline</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=electricite-1' class='collapsible-header amber-text text-pag left-align'>26 - Filière thermique : garantir un accès compétitif à l'électricité</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-3' class='collapsible-header amber-text text-pag left-align'>28 - Restructurer l'opérateur national et son réseau</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-4' class='collapsible-header amber-text text-pag left-align'>29 - Maîtrise des consommations électriques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 28 - Restructurer l'opérateur national et son réseau";
            $breadcrumbs = $breadcrumbs." <b>Projet n°28</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header amber pag white-text active'><i class='material-icons'>lightbulb_outline</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=electricite-1' class='collapsible-header amber-text text-pag left-align'>26 - Filière thermique : garantir un accès compétitif à l'électricité</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-2' class='collapsible-header amber-text text-pag left-align'>27 - Développer les énergies renouvelables</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-4' class='collapsible-header amber-text text-pag left-align'>29 - Maîtrise des consommations électriques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 29 - Maîtrise des consommations électriques";
            $breadcrumbs = $breadcrumbs." <b>Projet n°29</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header amber pag white-text active'><i class='material-icons'>lightbulb_outline</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=electricite-1' class='collapsible-header amber-text text-pag left-align'>26 - Filière thermique : garantir un accès compétitif à l'électricité</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-2' class='collapsible-header amber-text text-pag left-align'>27 - Développer les énergies renouvelables</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=electricite-3' class='collapsible-header amber-text text-pag left-align'>28 - Restructurer l'opérateur national et son réseau</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'infrastructure' :
          $subtitle = "Secteur de l'Infrastructure";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de l'Infrastructure</a> <b>></b>";
          $color = "brown-text text-pag";
          if($order == "1"){
            $title = "Projet n° 12 - Nouvel aéroport de Glo-Djigbé";
            $breadcrumbs = $breadcrumbs." <b>Projet n°12</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 13 - Modernisation et extension du port";
            $breadcrumbs = $breadcrumbs." <b>Projet n°13</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 14 - Réaménagement de l'axe routier autour du port";
            $breadcrumbs = $breadcrumbs." <b>Projet n°14</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 15 - Contournement Nord de Cotonou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°15</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "5"){
            $title = "Projet n° 16 - Route des pêches (Phase 2)";
            $breadcrumbs = $breadcrumbs." <b>Projet n°16</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "6"){
            $title = "Projet n° 17 - Autoroute Sèmè Kpodji - Porto Novo";
            $breadcrumbs = $breadcrumbs." <b>Projet n°17</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "7"){
            $title = "Projet n° 18 - Route Djougou - Péhunco - Kérou";
            $breadcrumbs = $breadcrumbs." <b>Projet n°18</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-8' class='collapsible-header brown-text text-pag left-align'>19 - Extension du réseau routier sur 1362 km</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "8"){
            $title = "Projet n° 19 - Extension du réseau routier de 1362 Km";
            $breadcrumbs = $breadcrumbs." <b>Projet n°19</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header brown pag white-text active'><i class='material-icons'>domain</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-1' class='collapsible-header brown-text text-pag left-align'>12 - Nouvel aéroport de Glo-Djigbé</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-2' class='collapsible-header brown-text text-pag left-align'>13 - Modernisation et extension du Port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-3' class='collapsible-header brown-text text-pag left-align'>14 - Réaménagement de l'axe routier autour du port</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-4' class='collapsible-header brown-text text-pag left-align'>15 - Contournement Nord de Cotonou</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-5' class='collapsible-header brown-text text-pag left-align'>16 - Route des P^ches (Phase 2)h</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-6' class='collapsible-header brown-text text-pag left-align'>17 - Autoroute Sèmè Kpodji - Porto Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=infrastructure-7' class='collapsible-header brown-text text-pag left-align'>18 - Route Djougou - Péhunco - Kérou</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'numerique' :
          $subtitle = "Secteur du Numérique";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur du Numérique</a> <b>></b>";
          $color = "purple-text text-pag";
          if($order == "1"){
            $title = "Projet n° 20 - Internet haut/très haut débit";
            $breadcrumbs = $breadcrumbs." <b>Projet n°20</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-2' class='collapsible-header purple-text text-pag left-align'>21 - Télévision numérique terrestre</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-3' class='collapsible-header purple-text text-pag left-align'>22 - Administration intelligente</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-4' class='collapsible-header purple-text text-pag left-align'>23 - Généralisation du e-commerce</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-5' class='collapsible-header purple-text text-pag left-align'>24 - Généralisation du numérique par l'éducation & la formation</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-6' class='collapsible-header purple-text text-pag left-align'>25 - Promotion & développement de produits numériques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 21 - Télévision numérique terrestre";
            $breadcrumbs = $breadcrumbs." <b>Projet n°21</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-1' class='collapsible-header purple-text text-pag left-align'>20 - Internet haut/très haut débit</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-3' class='collapsible-header purple-text text-pag left-align'>22 - Administration intelligente</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-4' class='collapsible-header purple-text text-pag left-align'>23 - Généralisation du e-commerce</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-5' class='collapsible-header purple-text text-pag left-align'>24 - Généralisation du numérique par l'éducation & la formation</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-6' class='collapsible-header purple-text text-pag left-align'>25 - Promotion & développement de produits numériques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 22 - Administration intelligente";
            $breadcrumbs = $breadcrumbs." <b>Projet n°22</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-1' class='collapsible-header purple-text text-pag left-align'>20 - Internet haut/très haut débit</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-2' class='collapsible-header purple-text text-pag left-align'>21 - Télévision numérique terrestre</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-4' class='collapsible-header purple-text text-pag left-align'>23 - Généralisation du e-commerce</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-5' class='collapsible-header purple-text text-pag left-align'>24 - Généralisation du numérique par l'éducation & la formation</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-6' class='collapsible-header purple-text text-pag left-align'>25 - Promotion & développement de produits numériques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 23- Généralisation du e-commerce";
            $breadcrumbs = $breadcrumbs." <b>Projet n°23</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-1' class='collapsible-header purple-text text-pag left-align'>20 - Internet haut/très haut débit</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-2' class='collapsible-header purple-text text-pag left-align'>21 - Télévision numérique terrestre</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-3' class='collapsible-header purple-text text-pag left-align'>22 - Administration intelligente</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-5' class='collapsible-header purple-text text-pag left-align'>24 - Généralisation du numérique par l'éducation & la formation</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-6' class='collapsible-header purple-text text-pag left-align'>25 - Promotion & développement de produits numériques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "5"){
            $title = "Projet n° 24 - Généralisation du numérique par l'éducation et la formation";
            $breadcrumbs = $breadcrumbs." <b>Projet n°24</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-1' class='collapsible-header purple-text text-pag left-align'>20 - Internet haut/très haut débit</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-2' class='collapsible-header purple-text text-pag left-align'>21 - Télévision numérique terrestre</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-3' class='collapsible-header purple-text text-pag left-align'>22 - Administration intelligente</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-4' class='collapsible-header purple-text text-pag left-align'>23 - Généralisation du e-commerce</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-6' class='collapsible-header purple-text text-pag left-align'>25 - Promotion & développement de produits numériques</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "6"){
            $title = "Projet n° 25 - Promotion et développement de produits numériques";
            $breadcrumbs = $breadcrumbs." <b>Projet n°25</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header purple pag white-text active'><i class='material-icons'>laptop</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=numerique-1' class='collapsible-header purple-text text-pag left-align'>20 - Internet haut/très haut débit</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-2' class='collapsible-header purple-text text-pag left-align'>21 - Télévision numérique terrestre</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-3' class='collapsible-header purple-text text-pag left-align'>22 - Administration intelligente</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-4' class='collapsible-header purple-text text-pag left-align'>23 - Généralisation du e-commerce</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=numerique-5' class='collapsible-header purple-text text-pag left-align'>24 - Généralisation du numérique par l'éducation & la formation</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'protectionsociale' :
          $subtitle = "Secteur de la Protection sociale";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur de la Protection sociale</a> <b>></b>";
          $color = "green-text text-pag";
          if($order == "1"){
            $title = "Projet n° 45 - Mise en place d'une protection sociale pour les plus démunis";
            $breadcrumbs = $breadcrumbs." <b>Projet n°45</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header green pag white-text active'><i class='material-icons'>security</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <!--a href='index.php?page=chat&type=protectionsociale-1' class='collapsible-header green-text text-pag left-align'>45 - Mise en place d'une protection sociale pour les plus démunis</a--><p>--</p>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        case 'tourisme' :
          $subtitle = "Secteur du Tourisme";
          $breadcrumbs = $breadcrumbs." <a href='#!' class='grey-text text-lighten-1'>Secteur du Tourisme</a> <b>></b>";
          $color = "red-text text-pag";
          if($order == "1"){
            $title = "Projet n° 1 - Parc de la Pendjari";
            $breadcrumbs = $breadcrumbs." <b>Projet n°1</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-2' class=' collapsible-header red-text text-pag'>2 - Cité lacustre de Ganvié</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-3' class=' collapsible-header red-text text-pag'>3 - Pôle Abomey - Porto -Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-4' class=' collapsible-header red-text text-pag'>4 - Tourisme Premium : Tata Somba</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-5' class=' collapsible-header red-text text-pag'>5 - Cité Histororique de Ouidah</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-6' class=' collapsible-header red-text text-pag'>6 - Stations balnéaires</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "2"){
            $title = "Projet n° 2 - Cité lacustre de Ganvié";
            $breadcrumbs = $breadcrumbs." <b>Projet n°2</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-1' class=' collapsible-header red-text text-pag'>1 - Parc de la pendjari</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-3' class=' collapsible-header red-text text-pag'>3 - Pôle Abomey - Porto -Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-4' class=' collapsible-header red-text text-pag'>4 - Tourisme Premium : Tata Somba</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-5' class=' collapsible-header red-text text-pag'>5 - Cité Histororique de Ouidah</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-6' class=' collapsible-header red-text text-pag'>6 - Stations balnéaires</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "3"){
            $title = "Projet n° 3 - Pôle Abomey - Porto Novo";
            $breadcrumbs = $breadcrumbs." <b>Projet n°3</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-1' class=' collapsible-header red-text text-pag'>1 - Parc de la pendjari</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-2' class=' collapsible-header red-text text-pag'>2 - Cité lacustre de Ganvié</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-4' class=' collapsible-header red-text text-pag'>4 - Tourisme Premium : Tata Somba</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-5' class=' collapsible-header red-text text-pag'>5 - Cité Histororique de Ouidah</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-6' class=' collapsible-header red-text text-pag'>6 - Stations balnéaires</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "4"){
            $title = "Projet n° 4 - Tourisme Premium : les Tata Somba";
            $breadcrumbs = $breadcrumbs." <b>Projet n°4</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-1' class=' collapsible-header red-text text-pag'>1 - Parc de la pendjari</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-2' class=' collapsible-header red-text text-pag'>2 - Cité lacustre de Ganvié</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-3' class=' collapsible-header red-text text-pag'>3 - Pôle Abomey - Porto -Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-5' class=' collapsible-header red-text text-pag'>5 - Cité Histororique de Ouidah</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-6' class=' collapsible-header red-text text-pag'>6 - Stations balnéaires</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "5"){
            $title = "Projet n° 5 - Cité historique de Ouidah";
            $breadcrumbs = $breadcrumbs." <b>Projet n°5</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-1' class=' collapsible-header red-text text-pag'>1 - Parc de la pendjari</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-2' class=' collapsible-header red-text text-pag'>2 - Cité lacustre de Ganvié</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-3' class=' collapsible-header red-text text-pag'>3 - Pôle Abomey - Porto -Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-4' class=' collapsible-header red-text text-pag'>4 - Tourisme Premium : Tata Somba</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-6' class=' collapsible-header red-text text-pag'>6 - Stations balnéaires</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          if($order == "6"){
            $title = "Projet n° 6 - Stations balnéaires";
            $breadcrumbs = $breadcrumbs." <b>Projet n°6</b>";
            $otherProjects = "<ul class='collapsible no-shadow' data-collapsible='accordion'>
              <li>
                <div class='collapsible-header red pag white-text active'><i class='material-icons'>airport_shuttle</i>Autres chats</div>
                <div class='collapsible-body no-padding-but-left'>
                  <ul class='collapsible no-margin no-shadow no-border' data-collapsible='accordion'>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-1' class=' collapsible-header red-text text-pag'>1 - Parc de la pendjari</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-2' class=' collapsible-header red-text text-pag'>2 - Cité lacustre de Ganvié</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-3' class=' collapsible-header red-text text-pag'>3 - Pôle Abomey - Porto -Novo</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-4' class=' collapsible-header red-text text-pag'>4 - Tourisme Premium : Tata Somba</a>
                    </li>
                    <li>
                      <a href='index.php?page=chat&type=tourisme-5' class=' collapsible-header red-text text-pag'>5 - Cité Histororique de Ouidah</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>";
          }
          break;

        default:
          $subtitle = '';
          break;
      }
      include('chat.php');
      break;

      default:
        //$subtitle= "Accueil";
        include('home.php');
        break;
    }
  }else{
    include("home.php");
  }

 ?>
