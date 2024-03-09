import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http = inject(HttpClient);
  #url = signal(environment.apitask);

  //lista
  #SetListUsuario = signal<any[] | null>(null)
  get GetListUsuario() {
    return this.#SetListUsuario.asReadonly();
  } 
  //listas
  public HttpListUsuario(): Observable<any[]> {
    
    this.#SetListUsuario.set(null)
    return this.#http.get<any[]>(`${this.#url()}/lista`).pipe(
      shareReplay(),
      tap( res => this.#SetListUsuario.set(res) )
    )
  }

  //adicionar
  public HttpListUsuarioCreat( nome: string, email:string, senha: string): Observable<any> { 
    return this.#http.post<any>(`${this.#url()}/adicionar`, { nome, email, senha }).pipe(
      shareReplay(),
    )
  }

  //update
  public HttpListUsuarioUpdate( id: number, nome:string): Observable<any> { 
    return this.#http.patch<any>(`${this.#url()}/adicionar`, { id, nome}).pipe(
      shareReplay(),
    )
  }



  //delete
  public HttpListUsuarioDelete(id: number): Observable<void> {
    return this.#http.get<void>(`${this.#url()}/remover/${id}`).pipe(
      shareReplay()
    )
  }

}
