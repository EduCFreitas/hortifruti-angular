import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../service/produtos.service';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-lista-prod',
  templateUrl: './lista-prod.component.html',
  styleUrls: ['./lista-prod.component.css']
})
export class ListaProdComponent implements OnInit {

  listaProdutos:Produto[]
  produto:Produto = new Produto

  constructor(private produtosService:ProdutosService) { }

  ngOnInit(): void {
    this.findAllProdutos()
  }

  findAllProdutos(){
    this.produtosService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }

}
