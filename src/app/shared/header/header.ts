import { Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  usuario: any = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {

    // escuta alterações do usuário em tempo real
    this.authService.usuario$
      .subscribe(usuario => {

        this.usuario = usuario;

      });

  }

  sair() {

    // remove usuário do sistema
    this.authService.logout();

    // redireciona pro login
    this.router.navigate(['/login']);

  }

}