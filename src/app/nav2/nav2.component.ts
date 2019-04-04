import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component {

 clients = [ {
   prenom : 'abdrahmed' 
 } , {prenom : 'zied'} , {prenom: 'maher'}  
]
facture =1
addinvoice(){
  this.facture++;
  
}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );



  constructor(private breakpointObserver: BreakpointObserver) {}

}
