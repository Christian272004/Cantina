import { Component } from '@angular/core';
import { ProducteService } from '../../core/service/producte.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { ActivatedRoute, RouterModule } from '@angular/router';


@Component({
  selector: 'app-productes',
  imports: [CommonModule, HeaderComponent, RouterModule],
  templateUrl: './productes.component.html',
  styleUrl: './productes.component.scss'
})

export class ProductesComponent {
  productes: any[] = [];

  constructor(private producteService: ProducteService, private route: ActivatedRoute, private viewportScroller: ViewportScroller) { }

  ngOnInit() {
    this.cargarProductes();
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(fragment);
        }, 0);
      }
    })
  }

  cargarProductes() {
    this.producteService.getProductes().subscribe(
      (productes: any) => {
        this.productes = productes.data;
        // this.mostrarProductes();
        console.log('Productes carregats:', this.productes);
      },
      (error) => {
        console.error('Error al carregar els productes:', error);
      }
    );
  }

 mostrarProductes() {

  this.productes[0].forEach((producte: any) => {
    const container = document.getElementById(producte.categoria);
    if (!container) return;
    const div = document.createElement("div");
    div.classList.add("producte");

    if (!producte.disponible) div.classList.add("esgotat");

    div.innerHTML = `
      <h3>${producte.nom}</h3>
      <p class="preu">${producte.preu.toFixed(2)} €</p>
      ${producte.categoria === "menu" && producte.unitats > 0 ? `<p><small>Unitats: ${producte.unitats}</small></p>` : ""}
    `;
    container.appendChild(div);
  });
}


  carrito: { nom: string; preu: number; unitats: number }[] = [];

//  mostrarCarrito() {
//     const carritoDiv = document.getElementById('carrito');
//     carritoDiv!.classList.add('abierto');
//     const lista = document.getElementById('carrito-lista');
//     lista!.innerHTML = '';
//     let total = 0;
//     this.carrito.forEach((item: { nom: string; preu: number; unitats: number }) => {
//         lista!.innerHTML += `<li><span class="carrito-nom">${item.nom} x${item.unitats}</span><span class="carrito-preu">${(item.preu * item.unitats).toFixed(2)}€</span></li>`;
//         total += item.preu * item.unitats;
//     });
//     // document.getElementById('carrito-total').textContent = 'Total: ' + total.toFixed(2) + '€';
// }

// Cierra el carrito al hacer click fuera (opcional)
// document.addEventListener('click', function(e) {
//     const carritoDiv = document.getElementById('carrito');
//     if (carritoDiv.classList.contains('abierto') && !carritoDiv.contains(e.target) && !e.target.classList.contains('producte')) {
//         carritoDiv.classList.remove('abierto');
//     }
// });

// Llama a esta función cuando el usuario haga click en un producto
agregarAlCarrito(producte: { nom: string; preu: number; unitats: number }) {
    const existente = this.carrito.find(p => p.nom === producte.nom);
    if (existente) {
        existente.unitats += 1;
    } else {
        this.carrito.push({ ...producte, unitats: 1 });
    }
}

getTotal(): number {
  return this.carrito.reduce((acc, item) => acc + item.preu * item.unitats, 0);
}
}
