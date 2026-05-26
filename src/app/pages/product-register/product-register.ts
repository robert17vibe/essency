import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './product-register.html',
  styleUrl: './product-register.css',
})

export class ProductRegister implements OnInit {

  // Objeto do formulário
  novoPerfume: any = {
    nome: '',
    marca: '',
    precoAntigo: null,
    precoAtual: null,
    imagem: '',
    categoria: '',
    banner: false
  };

  mensagem = '';

  // Guarda ID quando estiver editando
  idEditando: number | null = null;

  constructor(
    private perfumeService: PerfumeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // Pega ID da URL
    const id = this.route.snapshot.paramMap.get('id');

    // Se existir ID → edição
    if (id) {

      this.idEditando = Number(id);

      this.perfumeService.getPerfumes()
        .subscribe((data: any[]) => {

          // Procura perfume pelo ID
          const produto = data.find(
            p => p.id === this.idEditando
          );

          // Preenche formulário
          if (produto) {
            this.novoPerfume = produto;
          }

        });

    }

  }

  // Captura imagem
  selecionarImagem(event: Event): void {

    const input = event.target as HTMLInputElement;

    const arquivo = input.files?.[0];

    if (arquivo) {

      // Salva nome da imagem
      this.novoPerfume.imagem = '/' + arquivo.name;

    }

  }

  // Cadastrar ou editar perfume
  cadastrarPerfume(): void {

    // ================= VALIDAÇÃO =================
    if (
      !this.novoPerfume.nome ||
      !this.novoPerfume.marca ||
      this.novoPerfume.precoAntigo === null ||
      this.novoPerfume.precoAtual === null ||
      !this.novoPerfume.imagem ||
      !this.novoPerfume.categoria
    ) {

      this.mensagem = 'Preencha todos os campos!';
      return;

    }

    // ================= EDITAR =================
    if (this.idEditando !== null) {

      this.perfumeService
        .atualizarPerfume(this.idEditando, this.novoPerfume)
        .subscribe(() => {

          alert('Produto atualizado com sucesso!');

          // Redireciona
          window.location.href = '/home';

        });

    }

    // ================= CRIAR =================
    else {

      this.perfumeService
        .adicionarPerfume(this.novoPerfume)
        .subscribe(() => {

          alert('Perfume cadastrado com sucesso!');

          // Redireciona
          window.location.href = '/home';

        });

    }

  }

}