import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ToolBarComponent } from '../../components/toolbar/tool-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { UserService } from '../../services/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ToolBarComponent, MatSidenavModule, MatListModule, RouterOutlet],
})
export class HomePage {
  constructor() {}

  userService = inject(UserService)

  user = this.userService.getUserInfo()
  router = inject(Router)

  public redirectToPath(route: string){
    this.router.navigate([route])
  }

}
