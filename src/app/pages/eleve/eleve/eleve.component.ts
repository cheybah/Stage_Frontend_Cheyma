import {Component, Inject, OnInit} from '@angular/core';
import {EleveService} from 'app/services/eleve.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EleveModel} from 'app/models/eleveModel';
import { User } from 'app/models/userModel';
import { ConfirmDialogComponent } from 'app/pages/popup/popup.component';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css']
})
export class EleveComponent implements OnInit {

  dataSource = []

  filteredData: any[] = [];

  searchText = '';

  constructor(private eleveService: EleveService,
              public dialog: MatDialog) { }

  onSearchChange() {
    // Reset the filteredData array
    this.filteredData = [];

    // Check if the search text is empty
    if (!this.searchText) {
      this.filteredData = this.dataSource;
      return;
    }

    // Perform the search based on the searchText
    this.filteredData = this.dataSource.filter(item => {
      // Customize the search criteria as per your requirements
      const fullName = `${item.nom} ${item.prenom}`.toLowerCase();
      const fullNameInv = `${item.prenom} ${item.nom}`.toLowerCase();

      return (
          fullName.includes(this.searchText.toLowerCase()) ||
          fullNameInv.includes(this.searchText.toLowerCase())
      );
    });
  }

  ngOnInit(): void {
    this.getAllElevesActive();
  }

  refresh() {
    this.getAllElevesActive();
  }

  private getAllElevesActive() {
    this.eleveService.getAllEleveEtatActif().subscribe(
        (res: any) => {
          console.log(res);
          this.dataSource = res;
          this.filteredData = res;

        },
        (err: any) => {
          console.log(err);
        }
    );
  }

  archiverEleve(id) {
    // Ouvre le dialogue de confirmation avant de supprimer le produit
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la suppression',
        message: 'Êtes-vous sûr de vouloir supprimer cette eleve ?',
        confirmText: 'Supprimer',
        confirmColor: 'warn'
      }
    });
    // S'abonne à l'événement après la fermeture du dialogue de confirmation
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Si l'utilisateur confirme la suppression, appelle le service pour supprimer le produit
        this.eleveService.archiverEleve(id).subscribe((res: any) => {
          // this.showNotification('top', 'right', 'L'eleve a été supprimer', 'danger');
          this.refresh();
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogEleve, {
      width: '500px',
      data: {
        nom: '',
        prenom: '',
        nomPere: '',
        prenomPere: '',
        nomMere: '',
        prenomMere: '',
        nationalite: '',
        email: '',
        etat: '',
        numTels: [],
        user: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.refresh();
    });
  }

  // tslint:disable-next-line:max-line-length
  openEditDialog(
      id: number,
      nom: string,
      prenom: string,
      nomPere: string,
      prenomPere: string,
      nomMere: string,
      prenomMere: string,
      nationalite: string,
      email: string,
      etat: string,
      numTels: string[],
      user: User
  ): void {
    const dialogRef = this.dialog.open(EditDialogEleve, {
      width: '500px',
      data: {
        id: id,
        nom: nom,
        prenom: prenom,
        nomPere: nomPere,
        prenomPere: prenomPere,
        nomMere: nomMere,
        prenomMere: prenomMere,
        nationalite: nationalite,
        email: email,
        etat: etat,
        numTels: numTels,
        user: user
      }
    });

    dialogRef.afterClosed().subscribe((result: EleveModel) => {
      if (result) {
        this.eleveService.updateEleve(result.id, result).subscribe((res: any) => {
          dialogRef.close();
          this.refresh();
        });
      }
    });
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-eleve',
  templateUrl: 'dialog-eleve.html',
})

// tslint:disable-next-line:component-class-suffix
export class DialogEleve implements OnInit {

  newNumTel: any;
  eleveForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogEleve>,
      @Inject(MAT_DIALOG_DATA) public data: EleveModel,
      private formBuilder: FormBuilder,
      private eleveService: EleveService) { }
  ngOnInit(): void {

    // Create the form group with custom validation for required fields
    this.eleveForm = this.formBuilder.group({
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      nomPere: [this.data.nomPere],
      prenomPere: [this.data.prenomPere],
      nomMere: [this.data.nomMere],
      prenomMere: [this.data.prenomMere],
      nationalite: [this.data.nationalite],
      email: [this.data.email]
    });
  }

  submit() {
    if (this.eleveForm.invalid) {
      // If the form is invalid (some required fields are empty), do not submit
      return;
    }
    // Generate a random password
    const randomPassword = Math.random().toString(36).slice(-8);
    // Assign values to user properties
    // @ts-ignore
    this.data.user = {
      login: `${this.data.prenom}.${this.data.nom}`,
      password: randomPassword,
      userRole: 'ROLE_ELEVE'
    };

    this.data.etat = 'activer';

    const el = {
      nom: this.data.nom,
      prenom: this.data.prenom,
      nomPere: this.data.nomPere,
      prenomPere: this.data.prenomPere,
      nomMere: this.data.nomMere,
      prenomMere: this.data.prenomMere,
      nationalite: this.data.nationalite,
      email: this.data.email,
      etat: this.data.etat,
      numTels: this.data.numTels,
      user: this.data.user,
    };

    this.eleveService.addEleve(el).subscribe((res: any) => {
      // this.showNotification('top', 'right', 'L'eleve' a été ajouter', 'success');
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

  removeNumTel(index: number) {
    this.data.numTels.splice(index, 1);
  }
  addNumTel() {
    if (this.newNumTel) {
      this.data.numTels.push(this.newNumTel);
      this.newNumTel = ''; // Réinitialise le champ de saisie
    }
  }
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-dialog-eleve',
  templateUrl: 'edit-dialog-eleve.html',
})

// tslint:disable-next-line:component-class-suffix
export class EditDialogEleve implements OnInit {

  newNumTel: any;
  eleveForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<DialogEleve>,
      @Inject(MAT_DIALOG_DATA) public data: EleveModel,
      private formBuilder: FormBuilder,
      public dialog: MatDialog,
      private eleveService: EleveService) { }
  ngOnInit(): void {

    // Create the form group with custom validation for required fields
    this.eleveForm = this.formBuilder.group({
      nom: [this.data.nom, Validators.required],
      prenom: [this.data.prenom, Validators.required],
      nomPere: [this.data.nomPere],
      prenomPere: [this.data.prenomPere],
      nomMere: [this.data.nomMere],
      prenomMere: [this.data.prenomMere],
      nationalite: [this.data.nationalite],
      email: [this.data.email]
    });
  }

  submitEdit() {
    // Ouvrir un dialogue de confirmation avant de soumettre les modifications
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmer la modification',
        message: 'Êtes-vous sûr de vouloir modifier cet élève ?',
        confirmText: 'Confirmer',
        confirmColor: 'primary'
      }
    });

    // S'abonner à l'événement après la fermeture du dialogue de confirmation
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Si l'utilisateur confirme la modification, soumettre les modifications
        const id = this.data.id;
        const eleve: EleveModel = {
          id: this.data.id,
          nom: this.data.nom,
          prenom: this.data.prenom,
          nomPere: this.data.nomPere,
          prenomPere: this.data.prenomPere,
          nomMere: this.data.nomMere,
          prenomMere: this.data.prenomMere,
          nationalite: this.data.nationalite,
          email: this.data.email,
          etat: this.data.etat,
          numTels: this.data.numTels,
          user: this.data.user,
        };
        this.dialogRef.close(eleve);
      }
    });
  }


  onCancel(): void {
    // Close the dialog without any action
    this.dialogRef.close();
  }

  removeNumTel(index: number) {
    this.data.numTels.splice(index, 1);
  }
  addNumTel() {
    if (this.newNumTel) {
      this.data.numTels.push(this.newNumTel);
      this.newNumTel = ''; // Réinitialise le champ de saisie
    }
  }
}

