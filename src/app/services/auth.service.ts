import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // Estado global do usuário logado
    // BehaviorSubject guarda o valor atual e avisa todos os componentes quando muda
    usuario$ = new BehaviorSubject<any>(null);

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object
    ) {

        // Verifica se o código está rodando no navegador
        // (porque localStorage NÃO existe no servidor)
        if (isPlatformBrowser(this.platformId)) {

            // Tenta pegar usuário salvo no navegador
            const usuario =
                localStorage.getItem('usuarioLogado');

            // Se existir usuário salvo...
            if (usuario) {

                // Converte de string para objeto
                // e atualiza o estado global (usuario$)
                this.usuario$.next(
                    JSON.parse(usuario)
                );
            }
        }
    }

    // Função chamada quando o usuário faz login
    login(usuario: any) {

        // Só executa no navegador
        if (isPlatformBrowser(this.platformId)) {

            //  Salva usuário no localStorage (permanece mesmo com F5)
            localStorage.setItem(
                'usuarioLogado',
                JSON.stringify(usuario)
            );

            // Atualiza estado global para todos os componentes
            this.usuario$.next(usuario);
        }
    }

    // Função de logout (sair do sistema)
    logout() {

        // Só no navegador
        if (isPlatformBrowser(this.platformId)) {

            // Remove usuário salvo
            localStorage.removeItem('usuarioLogado');

            // Atualiza estado global para "ninguém logado"
            this.usuario$.next(null);
        }
    }
}