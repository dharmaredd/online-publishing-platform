import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Store } from '@ngrx/store';
import { addArticle } from '../../article-store/actions/app-action.action';
import { AppState } from '../../article-store/reduces/app-reducer';
import { articleListData } from '../../article-store/selectors/app.selector';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.css',
})
export class CreateArticleComponent implements OnInit {
  articleForm!: FormGroup;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '17rem',
    minHeight: '5rem',
    placeholder: 'Enter Article here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.articleForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      article: ['', Validators.required],
    });
  }

  cancel() {
    this.router.navigate(['/list']);
  }

  submit() {
    let data: any;
    this.store.select(articleListData).subscribe((res) => {
      data = res;
    });
    this.articleForm.value.id = data.length + 1;
    this.articleForm.value.isBookmark = false;
    this.articleForm.value.views = 0;
    this.articleForm.value.commentDetails = [];
    console.log(this.articleForm.value);
    this.store.dispatch(addArticle({ article: this.articleForm.value }));
    this.toastr.success('Sucess', 'Article Added Sucessfully!!');
    this.cancel();
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.articleForm.get('image')?.setValue(event?.target?.result);
      };
    }
  }
}
