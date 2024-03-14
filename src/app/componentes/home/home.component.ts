import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  #ApiService = inject(ApiService);



  
  //lista
  public GetListUsuario = this.#ApiService.GetListUsuario;

  //id
  public GetIdUsuario = this.#ApiService.GetIdUsuario;
  public getIdUsuarioErrp = this.#ApiService.getIdUsuarioErrp;

  ngOnInit(): void {
      this.#ApiService.HttpListUsuario().subscribe();
  }

  public apagar(id : number){
    return this.#ApiService
      .HttpListUsuarioDelete(id)
      .subscribe({
        next: next => this.#ApiService.HttpListUsuario().subscribe()
      })
  }

  public criar(nome: string, email: string, senha:string){
    return this.#ApiService
      .HttpListUsuarioCreat(nome, email, senha)
      .subscribe({
        next: next => this.#ApiService.HttpListUsuario().subscribe()
      })
  }



  public Editar( id: number){
    return this.#ApiService
    .HttpIdUsuario(id)
    .subscribe({
      next: next => this.#ApiService.HttpListUsuario().subscribe()
    })
  }

  public Atualizar(id: number, nome: string, email: string, senha:string){
    return this.#ApiService
    .HttpAtualizarUsuario( id, nome, email, senha)
    .subscribe({
      next: next => this.#ApiService.HttpListUsuario().subscribe()
    })
  }


}
