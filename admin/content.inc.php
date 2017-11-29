<?php
  if(isset($_GET['page'])){
    $page = $_GET['page'];
    $breadcrumbs = "<a href='index.php' class='grey-text text-lighten-1'>Accueil </a> <b>></b>";

    switch ($page) {

      case 'piliers' :
        $color = "amber-text text-pag";
        $title = "Liste des piliers";
        $subtitle = "Consulter la liste de tous les piliers du PAG";
        include('dashboard/piliers.php');
        break;

      case 'axes' :
        $color = "amber-text text-pag";
        $title = "Liste des axes";
        $subtitle = "Consulter la liste de tous les axes du PAG";
        include('dashboard/axes.php');
        break;

      case 'secteurs' :
        $color = "amber-text text-pag";
        $title = "Liste des secteurs";
        $subtitle = "Consulter la liste de tous les secteurs du PAG";
        include('dashboard/secteurs.php');
        break;

      case 'projets' :
        $color = "amber-text text-pag";
        $title = "Liste des projets";
        $subtitle = "Consulter la liste de tous les projets du PAG";
        include('dashboard/projets.php');
        break;

    case 'add':
      $type = $_GET['type'];
      $breadcrumbs = $breadcrumbs." <a href='index.php?page=chats' class='grey-text text-lighten-1'>Projets</a> <b>></b>";
      switch($type){
        case 'pilier' :
          $color = "amber-text text-pag";
          $title = "Nouveau pilier";
          $subtitle = "Créer un nouveau pilier";
          include('dashboard/add-pilier.php');
          break;

        case 'axe' :
          $color = "grey-text text-pag";
          $title = "Nouvel axe stratégique";
          $subtitle = "Créer un nouvel axe stratégique";
          include('dashboard/add-axe.php');
          break;

        case 'secteur' :
          $color = "teal-text text-pag";
          $title = "Nouveau secteur";
          $subtitle = "Créer un nouveau secteur";
          include('dashboard/add-secteur.php');
          break;

        case 'projet' :
          $color = "amber-text text-pag";
          $title = "Nouveau projet";
          $subtitle = "Créer un nouveau projet";
          include('dashboard/add-projet.php');
          break;

        default:
          $subtitle = '';
          break;
      }
      break;

    case 'edit':
      list($type, $order) =explode("-", $_GET['type']);
      $breadcrumbs = $breadcrumbs." <a href='index.php?page=chats' class='grey-text text-lighten-1'>Projets</a> <b>></b>";
      switch($type){
        case 'pilier' :
          $color = "amber-text text-pag";
          $title = "Modifier le pilier";
          $subtitle = "Créer un nouveau pilier";
          include('dashboard/add-pilier.php');
          break;

        case 'axe' :
          $color = "grey-text text-pag";
          $title = "Modifier l'axe";
          $subtitle = "Créer un nouvel axe";
          include('dashboard/add-axe.php');
          break;

        case 'secteur' :
          $color = "teal-text text-pag";
          $title = "Modifier le secteur";
          $subtitle = "Créer un nouveau secteur";
          include('dashboard/add-secteur.php');
          break;

        case 'projet' :
          $color = "amber-text text-pag";
          $title = "Modifier le projet";
          $subtitle = "Créer un nouveau projet";
          include('dashboard/add-projet.php');
          break;

        default:
          $subtitle = '';
          break;
      }
      break;

      default:
        include('dashboard/home.php');
        break;
    }
  }else{
    include("dashboard/home.php");
  }

 ?>
