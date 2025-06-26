import { Component } from '@angular/core';
import { AdminSideComponent } from '../../../shared/admin-side/admin-side.component';
import { TopComponent } from '../../../shared/top/top.component';


@Component({
  selector: 'app-index',
  imports: [AdminSideComponent,TopComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

}
