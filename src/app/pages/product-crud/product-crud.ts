import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-crud.html',
  styleUrl: './product-crud.css',
})
export class ProductCrud implements OnInit {

  // Lista de produtos carregados do backend
  produtos: any[] = [];

  // Guarda o produto que está sendo editado no momento
  produtoEditando: any = null;

  constructor(
    private perfumeService: PerfumeService // Service de CRUD (API)
  ) {}

  ngOnInit(): void {
    // Executa quando a tela abre
    this.carregarProdutos();
    
  }

  // ---------------- READ ----------------
  // Busca todos os perfumes no backend
  carregarProdutos() {
    this.perfumeService.getPerfumes().subscribe((data: any) => {
      this.produtos = data;
      
    });
  }

  // ---------------- DELETE ----------------
  // Remove um produto pelo ID
  deletar(id: number) {
    this.perfumeService.deletarPerfume(id).subscribe(() => {
      // Atualiza a lista após deletar
      this.carregarProdutos();
    });
  }

  // ---------------- EDITAR ----------------
  // Abre modo de edição copiando os dados do produto
  editar(produto: any) {
    this.produtoEditando = { ...produto }; // cópia segura (não altera direto na lista)
  }

  // ---------------- SALVAR EDIÇÃO ----------------
  salvarEdicao() {
    this.perfumeService
      .atualizarPerfume(this.produtoEditando.id, this.produtoEditando)
      .subscribe(() => {

        // Limpa modo edição
        this.produtoEditando = null;

        // Recarrega lista atualizada
        this.carregarProdutos();

      });
  }

  // ---------------- CANCELAR EDIÇÃO ----------------
  cancelar() {
    this.produtoEditando = null;
  }
}