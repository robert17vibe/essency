import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs'; // 1. Adicione as importações do RxJS

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {

  private apiUrl = 'http://localhost:3000/perfumes';
  
  // 2. Criamos uma variável para guardar o cache da requisição
  private perfumesCache$: Observable<any> | null = null;

  constructor(private http: HttpClient) { }

  // READ
  getPerfumes(): Observable<any> {
    // 3. Se não temos cache, fazemos a chamada na API e ativamos o shareReplay
    if (!this.perfumesCache$) {
      this.perfumesCache$ = this.http.get(this.apiUrl).pipe(
        shareReplay(1) // Guarda a última resposta na memória!
      );
    }
    // 4. Retorna a requisição (seja ela nova ou já em cache)
    return this.perfumesCache$;
  }

  // CREATE
  adicionarPerfume(perfume: any) {
    this.limparCache(); // Limpa o cache para buscar a lista nova depois
    return this.http.post(this.apiUrl, perfume);
  }

  // UPDATE
  atualizarPerfume(id: number, perfume: any) {
    this.limparCache();
    return this.http.put(`${this.apiUrl}/${id}`, perfume);
  }

  // DELETE
  deletarPerfume(id: number) {
    this.limparCache();
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Função auxiliar para resetar o cache caso você modifique o JSON
  private limparCache() {
    this.perfumesCache$ = null;
  }

  adicionarCarrinho(produto: any) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    carrinho.push(produto);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }
}