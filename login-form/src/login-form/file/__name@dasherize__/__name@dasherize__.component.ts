import { classify } from '@angular-devkit/core/src/utils/strings';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name)%>',
  templateUrl: './<%= dasherize(name)%>.component.html',
  styleUrls: ['./<%= dasherize(name)%>.component.scss']
})
export class <%= classify(name)%>Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
