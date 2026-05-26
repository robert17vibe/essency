import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  // Lista geral de perfumes
  perfumes: any[] = [];

  // Listas separadas por categoria
  perfumesMasculinos: any[] = [];
  perfumesFemininos: any[] = [];

  // Dados do carrossel (banner)
  heroSlides: any[] = [];
  heroIndex = 0;

  constructor(
    private perfumeService: PerfumeService // acesso ao backend
  ) { }

  // Executa quando a página abre
  ngOnInit(): void {
    this.carregarPerfumes();
    
  }

// ---------------- CARREGAR DADOS ----------------
  carregarPerfumes() {
    this.perfumeService.getPerfumes()
      .subscribe({
        next: (dados: any) => {
          // Todos os perfumes
          this.perfumes = dados;
          
          // Apenas perfumes com banner ativo (carrossel)
          this.heroSlides = dados.filter(
            (p: any) => p.banner === true
          );
          // Filtra masculinos
          this.perfumesMasculinos = dados.filter(
            (p: any) => p.categoria === 'Masculino'
          );
          // Filtra femininos
          this.perfumesFemininos = dados.filter(
            (p: any) => p.categoria === 'Feminino'
          );
        },
        error: (erro) => {
          // Se der problema na API, ele te avisa aqui!
          console.error('Falha ao carregar os perfumes:', erro);
        }
      });
  }
  
  // Próximo slide do carrossel
  heroAvancar() {
    this.heroIndex =
      (this.heroIndex + 1) % this.heroSlides.length;
  }
     
  // Slide anterior
  heroVoltar() {
    this.heroIndex =
      (this.heroIndex - 1 + this.heroSlides.length)
      % this.heroSlides.length;
  }

  // adiciona no ca
adicionarCarrinho(produto: any) {

  this.perfumeService.adicionarCarrinho(produto);

  alert('Produto adicionado ao carrinho');

}
}