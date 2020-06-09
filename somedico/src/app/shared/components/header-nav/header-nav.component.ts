import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.treeViewNav();
    }, 0);
  }

  treeViewNav() {
    const toggler = document.getElementsByClassName('arrow');
    const activeList = document.getElementsByClassName('subnav');
    let i;

    for (i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener('click', function() {
        this.parentElement.querySelector('.nested').classList.toggle('active');
        this.classList.toggle('arrow-down');
        this.parentNode.classList.toggle('active');
      });

    }
  }
}
