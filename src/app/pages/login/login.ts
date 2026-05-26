import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  tela = 'login';
  loginEmail = '';
  loginSenha = '';
  loginMsg = '';
  loginErro = false;
  regNome = '';
  regEmail = '';
  regSenha = '';
  regMsg = '';
  regErro = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  mostrar(tela: string) {

    this.tela = tela;

    this.loginMsg = '';
    this.regMsg = '';

  }

  entrar() {

    this.loginMsg = '';

    if (!this.loginEmail || !this.loginSenha) {

      this.loginErro = true;
      this.loginMsg = '❌ Preencha email e senha.';
      return;

    }

    this.http.get<any[]>(`http://localhost:3000/users?email=${this.loginEmail}`)
      .subscribe(users => {

        // EMAIL NÃO EXISTE
        if (users.length === 0) {

          this.loginErro = true;

         // this.loginMsg =
           // '❌ Nenhuma conta encontrada com este email.';
           alert('Nenhuma conta com encontrada com este e-mail')
           
          return;

        }

        // SENHA INCORRETA
        if (users[0].senha !== this.loginSenha) {

          this.loginErro = true;

          this.loginMsg =
            '❌ Senha incorreta.';

          return;

        }

        // LOGIN
        this.authService.login(users[0]);

        this.loginErro = false;

        this.loginMsg =
          `✓ Bem-vindo, ${users[0].nome}!`;

        setTimeout(() => {

          this.router.navigate(['/home']);

        }, 800);

      });

  }

  registrar() {

    this.regMsg = '';

    if (!this.regNome || !this.regEmail || !this.regSenha) {

      this.regErro = true;

      this.regMsg =
        '❌ Preencha todos os campos.';

      return;

    }

    // VERIFICA SE EMAIL JÁ EXISTE
    this.http
      .get<any[]>(`http://localhost:3000/users?email=${this.regEmail}`)
      .subscribe(users => {

        if (users.length > 0) {

          this.regErro = true;

          this.regMsg =
            '❌ Já existe uma conta com este email.';

          return;

        }

        // CADASTRO
        this.http.post('http://localhost:3000/users', {

          email: this.regEmail,
          senha: this.regSenha,
          nome: this.regNome,
          isAdmin: false

        }).subscribe(() => {

          this.regErro = false;

          this.regMsg =
            '✓ Conta criada com sucesso!';

          this.regNome = '';
          this.regEmail = '';
          this.regSenha = '';

          // volta pro login
          setTimeout(() => {

            this.mostrar('login');

          }, 100)

        });

      });

  }

}