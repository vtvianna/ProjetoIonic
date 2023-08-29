import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular';
import { Produto } from '../model/cadastro.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  meusProdutos:Produto[] = [];
  
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

  nameButton = "Adicionar Produto";
  dados = {
    id:"",
    produto: "",
    quantidade:""
  };


  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get<Produto[]>('http://localhost:3000/produto').subscribe(resultado => this.meusProdutos = resultado );
  }

  cadastro(form:any){
    this.http.post('http://localhost:3000/produto',form.value, this.httpOptions).subscribe();
    setTimeout(this.refresh, 1000)
}
deletar(id:any){
  this.http.delete('http://localhost:3000/produto/' + id).subscribe();
  // Definir 2 segundos para atualizar a página
  setTimeout(this.refresh, 1000) 
}
  refresh() {
    location.reload();
  }
  
}