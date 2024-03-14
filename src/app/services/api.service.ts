import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  #http = inject(HttpClient);
  #url = signal('http://191.36.140.8/slim_api/public/v1/usuarios');

  //lista
  #SetListUsuario = signal<any[] | null>(null)
  get GetListUsuario() {
    return this.#SetListUsuario.asReadonly();
  } 
  //listas
  public HttpListUsuario(): Observable<any[]> {
    const headers = new HttpHeaders().set('headers', 'dev')
    
    this.#SetListUsuario.set(null)
    return this.#http.get<any[]>(`${this.#url()}/lista`, { headers }).pipe(
      shareReplay(),
      tap( res => this.#SetListUsuario.set(res) )
    )
  }

  //pesquisar por 1

  #SetidUsuario = signal< any | null>(null);
  get GetIdUsuario(){
    return this.#SetidUsuario.asReadonly()
  };

  #SetIdUsuarioErro = signal< any | null>(null);
  get getIdUsuarioErrp() {
    return this.#SetIdUsuarioErro.asReadonly()
  };

  public HttpIdUsuario(id: number): Observable<any> {
    this.#SetidUsuario.set(null)
    this.#SetIdUsuarioErro.set(null)
    return this.#http.get<any>(`${this.#url()}/lista/${id}`).pipe(
      shareReplay(),
      tap(res => this.#SetidUsuario.set(res)),
      catchError((error: HttpErrorResponse) => {
        this.#SetIdUsuarioErro.set(error.error.mensage);
        return throwError(() => error)
      })
    )
  }


  
  //adicionar

  //erro
  #SetUsuarioErro = signal< any | null>(null);
  get GetUsuarioErro() {
    return this.#SetUsuarioErro.asReadonly()
  };

  public HttpListUsuarioCreat( nome: string, email:string, senha: string): Observable<any> { 
    return this.#http.post<any>(`${this.#url()}/adicionar`, { nome, email, senha }).pipe(
      shareReplay(),
    )
  }

  //atualizar
  public HttpAtualizarUsuario( id: number, nome: string, email:string, senha: string): Observable<any> { 
    return this.#http.put<any>(`${this.#url()}/atualiza/${id}`, { nome, email, senha }).pipe(
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
