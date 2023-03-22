import { Component } from '@angular/core';

@Component({
     selector: 'app-error-forbidden',
     template: `
    
     <body>
          <h1>403 Forbidden</h1>
          <p>Sorry, you don't have permission to access this page.</p>
          <a class="btn btn-dark" href='javascript:history.go(-1)'>Turn Back</a>
     </body>


`,
     styleUrls: ['./error-forbidden.component.scss']
})
export class ErrorForbiddenComponent {
constructor(){
     
}
}
