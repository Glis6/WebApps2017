import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/models/user.interface";
import {LOGGED_IN_USER_PROVIDER, LoggedInUserProvider} from "../shared/services/user-provider.service";
import {Router} from "@angular/router";
import {USER_SERVICE, UserService} from "../shared/services/user.service";
import {Character} from "../shared/models/character.interface";
import {CLASS_SERVICE, ClassService} from "../shared/services/class.service";
import {Class} from "../shared/models/class.interface";

@Component({
  selector: 'app-edit-characters',
  templateUrl: './edit-characters.component.html',
  styleUrls: ['./edit-characters.component.css']
})
export class EditCharactersComponent implements OnInit {
  /**
   * The form that is being edited on this page.
   */
  public charactersForm: FormGroup;

  /**
   * The user that we're editing.
   */
  private user: User;

  private classes: Class[];

  constructor(private formBuilder: FormBuilder,
              @Inject(LOGGED_IN_USER_PROVIDER) private userProvider: LoggedInUserProvider,
              @Inject(USER_SERVICE) private userService: UserService,
              @Inject(CLASS_SERVICE) private classService: ClassService,
              private router: Router) {
  }

  ngOnInit() {
    this.charactersForm = this.formBuilder.group({
      characters: this.formBuilder.array([])
    });

    this.userProvider.user.subscribe(user => {
      this.user = user;
      user.characters.forEach((character, index) => {
        this.deleteRow(index);
        (<FormArray>this.charactersForm.controls['characters']).insert(index, this.initRow(character));
      })
    });

    this.classService.getAll().subscribe(classes => this.classes = classes)
  }


  /**
   * Initializes a new row
   *
   * @param {string} character The character to add.
   */
  initRow(character: Character): FormGroup {
    return this.formBuilder.group({
      character: [character, Validators.required]
    });
  }

  /**
   * Adds a row to the form.
   */
  addNewRow() {
    (<FormArray>this.charactersForm.controls['characters']).push(this.initRow({
      name: '',
      characterClass: null,
      mainSpec: null,
      offSpecs: null
    }));
  }

  /**
   * Removes a row from the form.
   *
   * @param {number} index The index of the row to remove.
   */
  deleteRow(index: number) {
    (<FormArray>this.charactersForm.controls['characters']).removeAt(index);
  }

  /**
   * Saves the changes made by the form.
   */
  saveChanges() {
    if (this.charactersForm.valid) {
      this.userService.update(this.user.id, {
        characters: this.charactersForm.getRawValue().characters
      }).then(() => this.router.navigateByUrl('/profile'));
    }
  }
}
