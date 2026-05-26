import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class Cart implements OnInit {

  carrinho: any[] = [];

  ngOnInit(): void {

    this.carregarCarrinho();

  }

  carregarCarrinho() {

    this.carrinho =
      JSON.parse(localStorage.getItem('carrinho') || '[]');

  }

  removerCarrinho(index: number) {

    this.carrinho.splice(index, 1);

    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinho)
    );

  }

  aumentarQuantidade(index: number) {

    if (!this.carrinho[index].quantidade) {
      this.carrinho[index].quantidade = 1;
    }

    this.carrinho[index].quantidade++;

    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinho)
    );

  }

  diminuirQuantidade(index: number) {

    if (
      this.carrinho[index].quantidade > 1
    ) {

      this.carrinho[index].quantidade--;

    }

    localStorage.setItem(
      'carrinho',
      JSON.stringify(this.carrinho)
    );

  }

  calcularTotal() {

    let total = 0;

    this.carrinho.forEach((produto: any) => {

      const qtd =
        produto.quantidade || 1;

      total += produto.precoAtual * qtd;

    });

    return total.toFixed(2);

  }

}