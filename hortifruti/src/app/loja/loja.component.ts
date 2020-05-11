import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../service/produtos.service';
import { Produto } from '../model/Produto';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
  
  listaProdutos:Produto[]
  produto:Produto = new Produto()
  alerta:boolean = false
  
  constructor(private produtosService:ProdutosService, private route:ActivatedRoute, private router:Router, private locationPage:Location) { }
  
  ngOnInit() {
    this.findAllProdutos()
    let item:string = localStorage.getItem('delOk')
    if (item === "true"){
      this.alerta = true
      localStorage.clear()
      setTimeout(()=>{
        this.refresh();
      }, 3000)
    }
    
  }
  
  findAllProdutos(){
    this.produtosService.getAllProdutos().subscribe((resp: Produto[])=>{
      this.listaProdutos = resp
    })
  }
  
  publicar(){
    this.produtosService.postProduto(this.produto).subscribe((resp:Produto)=>{
      this.produto = resp
      this.refresh();
    })
  }

  refresh(){
    this.router.navigateByUrl('/lista-prod', {skipLocationChange:true}).then(()=>{
     this.router.navigate([this.locationPage.path()])
    })
}
  
}
